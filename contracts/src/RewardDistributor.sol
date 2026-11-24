// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title AUNX Reward Distributor
/// @author AURENIX
/// @notice Distributes AUNX rewards for approved work. The owner/admin
/// approves a claim (worker, amount, claimId); the worker then calls
/// `claim(claimId)` to receive AUNX from this contract's funded balance.
/// @dev This contract NEVER mints AUNX. It can only pay out AUNX that was
/// transferred to it beforehand (fund it with a plain ERC20 transfer of
/// AUNX from the deployer/treasury). One claim per claimId — a claimId can
/// never be approved twice and a claim can never be paid twice. Only the
/// designated worker can collect their own claim.
contract RewardDistributor is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    /// @notice The AUNX token paid out by this contract. Set once at deploy.
    IERC20 public immutable rewardToken;

    struct Claim {
        address worker;
        uint256 amount;
        bool approved;
        bool claimed;
    }

    mapping(uint256 => Claim) public claims;

    event ClaimApproved(uint256 indexed claimId, address indexed worker, uint256 amount);
    event ClaimPaid(uint256 indexed claimId, address indexed worker, uint256 amount);

    error ClaimAlreadyApproved();
    error ClaimNotApproved();
    error ClaimAlreadyPaid();
    error NotWorker();
    error InvalidAmount();
    error InvalidAddress();
    error InsufficientFunding(uint256 available, uint256 required);

    /// @param rewardToken_ Address of the AUNX token contract.
    constructor(address rewardToken_) Ownable(msg.sender) {
        if (rewardToken_ == address(0)) revert InvalidAddress();
        rewardToken = IERC20(rewardToken_);
    }

    /// @notice Owner/admin approves a reward claim. Each claimId usable once.
    /// @param claimId Unique id for this claim (e.g. mission + worker hash).
    /// @param worker Address entitled to collect the reward.
    /// @param amount AUNX amount (in wei, 18 decimals) to pay on claim.
    function approveClaim(uint256 claimId, address worker, uint256 amount) external onlyOwner whenNotPaused {
        if (claims[claimId].approved) revert ClaimAlreadyApproved();
        if (worker == address(0)) revert InvalidAddress();
        if (amount == 0) revert InvalidAmount();
        claims[claimId] = Claim({worker: worker, amount: amount, approved: true, claimed: false});
        emit ClaimApproved(claimId, worker, amount);
    }

    /// @notice The designated worker collects their approved reward.
    /// Reverts if the claim was never approved, was already paid, or the
    /// contract holds too little AUNX to cover it.
    function claim(uint256 claimId) external nonReentrant whenNotPaused {
        Claim storage c = claims[claimId];
        if (!c.approved) revert ClaimNotApproved();
        if (c.claimed) revert ClaimAlreadyPaid();
        if (msg.sender != c.worker) revert NotWorker();
        uint256 available = rewardToken.balanceOf(address(this));
        if (available < c.amount) revert InsufficientFunding(available, c.amount);
        c.claimed = true;
        rewardToken.safeTransfer(c.worker, c.amount);
        emit ClaimPaid(claimId, c.worker, c.amount);
    }

    /// @notice AUNX balance currently available for claims.
    function availableRewards() external view returns (uint256) {
        return rewardToken.balanceOf(address(this));
    }

    /// @notice Owner-only pause: blocks new approvals and claims.
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Owner-only unpause.
    function unpause() external onlyOwner {
        _unpause();
    }
}
