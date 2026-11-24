// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Aurenix Token
/// @author AURENIX
/// @notice Fixed-supply BEP-20 / ERC-20 token for the AURENIX economy.
/// @dev Total supply is fixed at 100,000,000 AUNX (18 decimals), minted ONCE
/// to the deployer in the constructor. There is deliberately:
///   - NO mint function (supply can never grow),
///   - NO burn function / NO owner burn backdoor,
///   - NO transfer restrictions, NO blacklist, NO honeypot mechanics
///     (plain OpenZeppelin ERC20 transfers; anyone can transfer freely).
///
/// Planned allocation split (PLAN ONLY — this contract mints the full
/// supply to the deployer and distributes NOTHING itself; any distribution
/// is a separate, off-chain / multisig-governed operation, disclosed
/// publicly when it happens):
///   Community rewards  35,000,000 AUNX (35%)
///   Ecosystem dev      20,000,000 AUNX (20%)
///   Liquidity          15,000,000 AUNX (15%)
///   NFT ecosystem      10,000,000 AUNX (10%)
///   Partnerships       10,000,000 AUNX (10%)
///   Treasury           10,000,000 AUNX (10%)
///   Total             100,000,000 AUNX (100%)
///
/// Vesting / release rules from the plan (also NOT enforced by this
/// contract — they are governance commitments, not code): Treasury
/// 36-month release; Partnerships milestone-based; Community rewards only
/// against verified completed work; Liquidity via a disclosed wallet with
/// transparent lock/vesting. No price, listing or return is promised.
contract AurenixToken is ERC20 {
    /// @notice Fixed total supply: 100,000,000 AUNX (18 decimals).
    uint256 public constant TOTAL_SUPPLY = 100_000_000 * 10 ** 18;

    /// @notice Mints the entire fixed supply once to the deployer.
    constructor() ERC20("Aurenix", "AUNX") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }
}
