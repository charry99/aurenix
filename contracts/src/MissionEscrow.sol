// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title Mission Escrow
/// @author AURENIX
/// @notice Sponsor-funded escrow for AI missions: a sponsor locks BNB or a
/// single ERC20 token for a mission; the designated arbiter releases the
/// funds to the designated worker once the work is approved; if the mission
/// is cancelled before release, the sponsor gets a full refund.
/// @dev Security model — no admin can steal funds:
///   - Only the designated arbiter (or the contract owner as a fallback)
///     can release, and only to the designated worker, and only once.
///   - Only the sponsor can cancel, and only before release; the refund
///     goes back to the sponsor and nowhere else.
///   - Funds are held per-mission; release/refund use checks-effects-
///     interactions plus ReentrancyGuard. ERC20 moves use SafeERC20.
///   - Pausing blocks new funding and releases; a sponsor can still
///     cancel/refund while paused, so a pause can never trap sponsor funds.
contract MissionEscrow is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    /// @notice token == address(0) means the mission is funded in BNB.
    struct Mission {
        address sponsor;
        address worker;
        address arbiter;
        address token;
        uint256 amount;
        Status status;
    }

    enum Status {
        Funded,
        Released,
        Refunded
    }

    mapping(uint256 => Mission) public missions;

    event MissionFunded(
        uint256 indexed missionId,
        address indexed sponsor,
        address indexed worker,
        address arbiter,
        address token,
        uint256 amount
    );
    event MissionReleased(uint256 indexed missionId, address indexed worker, uint256 amount);
    event MissionRefunded(uint256 indexed missionId, address indexed sponsor, uint256 amount);

    error MissionAlreadyExists();
    error MissionNotFound();
    error MissionNotFunded();
    error NotSponsor();
    error NotArbiter();
    error InvalidAddress();
    error InvalidAmount();
    error IncorrectBnbValue(uint256 expected, uint256 received);
    error TokenTransferFailed();

    constructor() Ownable(msg.sender) {}

    /// @notice Fund a mission in BNB. `missionId` must be unused.
    /// @param missionId Unique id chosen by the sponsor.
    /// @param worker Address that will receive the funds on release.
    /// @param arbiter Address allowed to release the funds (or the owner).
    function fundMissionBNB(uint256 missionId, address worker, address arbiter) external payable nonReentrant whenNotPaused {
        if (missions[missionId].sponsor != address(0)) revert MissionAlreadyExists();
        if (worker == address(0) || arbiter == address(0)) revert InvalidAddress();
        if (msg.value == 0) revert InvalidAmount();
        missions[missionId] = Mission({
            sponsor: msg.sender,
            worker: worker,
            arbiter: arbiter,
            token: address(0),
            amount: msg.value,
            status: Status.Funded
        });
        emit MissionFunded(missionId, msg.sender, worker, arbiter, address(0), msg.value);
    }

    /// @notice Fund a mission in an ERC20 token. The sponsor must have
    /// approved this contract for `amount` of `token` first.
    /// @param missionId Unique id chosen by the sponsor.
    /// @param worker Address that will receive the funds on release.
    /// @param arbiter Address allowed to release the funds (or the owner).
    /// @param token ERC20 token address funding this mission.
    /// @param amount Amount of `token` to lock in escrow.
    function fundMissionToken(uint256 missionId, address worker, address arbiter, address token, uint256 amount)
        external
        nonReentrant
        whenNotPaused
    {
        if (missions[missionId].sponsor != address(0)) revert MissionAlreadyExists();
        if (worker == address(0) || arbiter == address(0) || token == address(0)) revert InvalidAddress();
        if (amount == 0) revert InvalidAmount();
        missions[missionId] = Mission({
            sponsor: msg.sender,
            worker: worker,
            arbiter: arbiter,
            token: token,
            amount: amount,
            status: Status.Funded
        });
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        emit MissionFunded(missionId, msg.sender, worker, arbiter, token, amount);
    }

    /// @notice Release escrowed funds to the designated worker.
    /// Callable ONLY by the mission's arbiter or the contract owner.
    function release(uint256 missionId) external nonReentrant whenNotPaused {
        Mission storage m = missions[missionId];
        if (m.sponsor == address(0)) revert MissionNotFound();
        if (m.status != Status.Funded) revert MissionNotFunded();
        if (msg.sender != m.arbiter && msg.sender != owner()) revert NotArbiter();
        m.status = Status.Released;
        _pay(m);
        emit MissionReleased(missionId, m.worker, m.amount);
    }

    /// @notice Cancel a funded mission and refund the sponsor in full.
    /// Callable ONLY by the sponsor, and only before release. Works even
    /// while the contract is paused, so funds are never trapped by a pause.
    function cancel(uint256 missionId) external nonReentrant {
        Mission storage m = missions[missionId];
        if (m.sponsor == address(0)) revert MissionNotFound();
        if (m.status != Status.Funded) revert MissionNotFunded();
        if (msg.sender != m.sponsor) revert NotSponsor();
        m.status = Status.Refunded;
        _refund(m);
        emit MissionRefunded(missionId, m.sponsor, m.amount);
    }

    /// @notice Owner-only pause: blocks new funding and releases.
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Owner-only unpause.
    function unpause() external onlyOwner {
        _unpause();
    }

    /// @notice Read a mission's full state.
    function getMission(uint256 missionId) external view returns (Mission memory) {
        return missions[missionId];
    }

    function _pay(Mission storage m) internal {
        if (m.token == address(0)) {
            (bool ok, ) = payable(m.worker).call{value: m.amount}("");
            if (!ok) revert TokenTransferFailed();
        } else {
            IERC20(m.token).safeTransfer(m.worker, m.amount);
        }
    }

    function _refund(Mission storage m) internal {
        if (m.token == address(0)) {
            (bool ok, ) = payable(m.sponsor).call{value: m.amount}("");
            if (!ok) revert TokenTransferFailed();
        } else {
            IERC20(m.token).safeTransfer(m.sponsor, m.amount);
        }
    }
}
