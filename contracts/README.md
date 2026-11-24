# AURENIX — Phase 1 MVP Smart Contracts

Foundry project (Solidity 0.8.24, OpenZeppelin Contracts v5.7.0) for the
AURENIX Genesis NFT, AUNX token, mission escrow and reward distributor.
See `../PLAN.md` for the full project plan.

> **Brand note (from PLAN.md):** formerly MINT2EARN AI, renamed to AURENIX
> on 2026-11-24 after a name check found an existing crypto project using
> the old name. Do not buy any domain without the user's word. The brand
> strings live in one place per contract (name/symbol constants) so a rename
> is a small edit.

## Contracts (`src/`)

| Contract | What it does |
|---|---|
| `GenesisNFT.sol` | ERC-721 Genesis collection, max supply **2,222**: 222 free community mints (one per wallet), 1,800 public mints at exactly **0.001 BNB** (over/underpayment reverts — excess is rejected, never kept), 200 treasury-reserve mints (owner-only, to the treasury address set at deploy). Tiers on-chain via `tierOf(tokenId)`: Elite 1–22, Gold 23–222, Silver 223–1222, Bronze 1223–2222. Metadata at `baseURI/<tokenId>`. Owner-only pause. **Holding confers no guaranteed income or token allocation.** |
| `AurenixToken.sol` | ERC-20 `AUNX`, fixed supply **100,000,000** (18 decimals), minted once to the deployer. **No mint function, no burn backdoor, no transfer restrictions.** Planned allocation (plan only — the contract distributes nothing): Community rewards 35M, Ecosystem dev 20M, Liquidity 15M, NFT ecosystem 10M, Partnerships 10M, Treasury 10M. |
| `MissionEscrow.sol` | Sponsor funds a mission in BNB or one ERC20. Only the designated **arbiter** (or owner) can release funds, only to the designated **worker**, only once. Only the **sponsor** can cancel before release, and the refund goes back to the sponsor. Pause blocks funding/release but never blocks a sponsor refund. ReentrancyGuard, events for every state change. |
| `RewardDistributor.sol` | Owner approves a claim (`claimId`, worker, amount); the worker calls `claim(claimId)` to receive AUNX from the contract's funded balance. One claim per `claimId`, no double-claim. **Never mints** — it only pays out AUNX transferred to it beforehand. |

Contracts NOT in this phase (per PLAN.md, later phases): Marketplace,
Governance, Treasury (multisig).

## Build & test

```bash
export PATH="$HOME/.foundry/bin:$PATH"
forge install OpenZeppelin/openzeppelin-contracts   # first time only (lib/ is git-ignored)
forge build
forge test            # 50 tests, all passing
```

Slither (0.11.6, venv at `~/workspace/.slithervenv`):

```bash
export PATH="$HOME/.foundry/bin:$PATH"
~/workspace/.slithervenv/bin/slither src/ --exclude-dependencies \
  --exclude-informational --exclude-optimization
# Result: 0 findings. (Initial run flagged 4 low-severity
# reentrancy-events notes in GenesisNFT; fixed by adding ReentrancyGuard
# to all mint/withdraw functions.)
```

## Deployment order (testnet first)

1. Deploy `AurenixToken` — record address.
2. Deploy `GenesisNFT` with `(treasuryAddress, baseURI)` — baseURI points
   at the metadata JSON location (e.g. `ipfs://<cid>/`).
3. Deploy `MissionEscrow` (no constructor args).
4. Deploy `RewardDistributor` with the `AurenixToken` address, then fund it
   with a plain AUNX transfer from the deployer/treasury.
5. Verify all four contracts' source on the testnet explorer.
6. Exercise every flow on testnet (free mint, paid mint, treasury mint,
   fund/release/refund, approve/claim) before any mainnet discussion.

### Contract addresses

| Contract | BNB testnet | BNB mainnet |
|---|---|---|
| AurenixToken | TBD — none deployed | TBD |
| GenesisNFT | TBD — none deployed | TBD |
| MissionEscrow | TBD — none deployed | TBD |
| RewardDistributor | TBD — none deployed | TBD |

## Guardrails

- **NO mainnet deploy without the user's explicit approval for that exact
  action.** Testnet first; mainnet only after testing, legal review and
  security approval (per PLAN.md).
- **NO public funds, NO public liquidity, NO token distribution** without
  explicit user approval.
- **NO spending, NO signing, NO new accounts** in this build step.
- Never promise a price, listing, or return for AUNX or the NFTs.
