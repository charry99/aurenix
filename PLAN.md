# AURENIX — Build Plan (from ChatGPT detailed blueprint, checked 2026-11-24)

Source: ChatGPT conversation "NFT token project idea" https://chatgpt.com/c/6b053173-3cb0-83ec-b0b5-9faa50b7a4cb
User decision 2026-11-24 ~17:20 IST: "i want this plan. Please implement the same plan and image graphics."
Parent verdict (delivered): park as a new project was advised, but the user overruled — build Phase 1 MVP now.

## RENAME — formerly MINT2EARN AI, renamed to AURENIX 2026-11-24
- **Why:** brand check 2026-11-24 found an existing crypto project called "MINT 2 EARN" (token MTE, 1,000B supply, listed on Crypto.com, rank ~#21144) already using the name. The plan itself says to check trademark clearance first.
- **Domain note:** the VM's DNS returns synthetic answers for any domain, so mint2earn.ai / aurenix.ai registration status is UNVERIFIED from here — check at a real registrar before buying or announcing a domain. Do NOT buy any domain without the user's word.
- **AURENIX check 2026-11-24 ~17:31 IST:** no crypto project or token called exactly "AURENIX" found (closest: Auronex/ANX, Aurexion/ARX, AurionXI, Aurelis/AUR, Aurix/AURX). Token symbol **AUNX** checked 2026-11-24 ~17:35 IST: no major collision found.
- User gave the plain-words go-ahead 2026-11-24 ~17:33 IST: "Rename to AURENIX, then push and deploy."

## BRAND STRUCTURE — final, user decision 2026-11-24 ~17:48 IST
- Main brand: **AURENIX**. Platform: **AURENIX AI**. NFT collection: **AURENIX Genesis**. AI network: **AURENIX Agents**. Marketplace: **AURENIX Market**. Competition: **AURENIX Arena**. Token: **AUNX** (name "Aurenix", fixed 100,000,000).
- **Token stays AUNX — do NOT switch to AURX.** The user proposed AURX in his 17:48 IST message, but AURX is already used by AURIX (found in web search 2026-11-24); the user was told and the symbol stays AUNX unless he explicitly confirms otherwise later.
- aurenix.pages.dev belongs to Aurenix Biosciences (biotech) and is NOT obtainable; the live site is https://aurenixai.pages.dev (Pages project `aurenixai`).

## Identity
- Project: AURENIX, tagline "Work. Build. Earn." — "The AI-powered NFT membership and digital work economy."
- Token: AUNX (BEP-20). Chain: BNB Smart Chain, chain ID 56. NFT: ERC-721.
- Stack: Cloudflare Pages + Workers (frontend + APIs), Cloudflare D1, IPFS, GitHub, WalletConnect/MetaMask, pluggable AI providers. Zero-cost-first.
- Style: premium black-and-gold hacker interface, futuristic robotic artwork, responsive.
- Live site: https://aurenixai.pages.dev (Cloudflare Pages project `aurenixai`). Repo: https://github.com/charry99/aurenix.

## NFT Genesis collection (2,222 total)
- Community Genesis 222 (free) / Public mint 1,800 / Treasury reserve 200. Mint price 0.001 BNB.
- Tiers: Bronze (Genesis, standard missions), Silver (Advanced, additional tools), Gold (Professional, advanced competitions), Elite (Legendary, exclusive missions + governance).
- Rules: unique token ID, on-chain ownership check, non-transferable reputation stays with the user, transferable NFT does NOT transfer earned rewards, no guaranteed income or token allocation from holding, published verifiable rarity traits, distinct artwork + verifiable metadata.

## AUNX tokenomics (100,000,000 fixed, no further minting)
- Community rewards 35M (35%) / Ecosystem dev 20M (20%) / Liquidity 15M (15%) / NFT ecosystem 10M (10%) / Partnerships 10M (10%) / Treasury 10M (10%).
- Vesting: Treasury 36-month release; Partnerships milestone-based; Team allocation only after team identified + terms published; Community rewards released against verified completed work; Liquidity disclosed wallet, transparent lock/vesting.
- Never promise a price, listing, or return.

## AI Mission economy (most important part)
- Categories: Web3 research (verify docs), Content (educational article), Development (smart contract feature), Security (review test contract), Marketing (campaign), Design (NFT artwork), Community (verified answers), Testing (reproducible bugs).
- Workflow: sponsor creates mission → AI validates details + budget → users/agents submit → evaluation + human dispute review → approved rewards released.
- Reward types: cash (USDC/sponsor-funded), AUNX (published rules), reputation points (non-transferable).
- Rule: AI must not approve its own financial payouts. Evidence checks, independent review, dispute process.

## Agent Arena
- Competitions: best Web3 research agent, smart contract testing agent, coding assistant, marketing content agent, data analysis agent, autonomous workflow agent.
- Each needs: published rules, fixed criteria, deadline, submission requirements, anti-cheating checks, human appeal, public leaderboard, sponsor-funded prize pool. Never rank by token holdings.

## Autonomous business system (10 agents)
- CEO (planning), Research (opportunities/sponsors), Development (features), Security (scans), Mission (create/manage), Content (articles/social), Growth (community/partnerships), NFT (metadata), Analytics (revenue/costs), Support (questions/disputes).
- Financial restrictions: Research/Coding/Testing/Content drafts Automatic; Routine social posts pre-approved rules; Smart contract deployment / Treasury transfers / NFT pricing changes / Token minting (disabled after fixed supply) = HUMAN APPROVAL; Private key access NEVER. Separate wallets (treasury/ops/rewards); treasury keys in hardware wallets + multisig.

## Marketplace
- Genesis NFTs, AI agent licenses, templates, smart contract tools, research reports, design packs, developer services, mission products.
- Fees: NFT marketplace 2%, digital product 5%, sponsor mission 5%, premium service fixed published price. Proposed settings, not deployed terms.
- V1: integrate with an established NFT marketplace where practical; proprietary marketplace after demand is validated.

## Revenue (priority order)
1. Sponsored missions (businesses pay for contributors/deliverables). 2. AI subscriptions. 3. Digital marketplace. 4. NFT minting. 5. Enterprise services.
- Hypothetical monthly scenario (NOT a forecast): 5 missions × $100 = $500; 50 subs × $5 = $250; marketplace fees $100; 2 enterprise × $150 = $300; total $1,150 gross, before hosting, AI API, fees, rewards, ops, taxes. First commercial milestone: ONE paying sponsor.

## Website (14 public pages + dashboards)
- Public: Home, About, How It Works, NFT Collection, Tokenomics, Mission Hub, Agent Arena, Marketplace, Leaderboard, Roadmap, Documentation, Security, Community, Terms and Privacy.
- User dashboard: wallet balance, NFT collection, available/submitted missions, reward history, reputation, agent registrations, competition rankings, marketplace activity, referral tracking.
- Admin dashboard: user management, NFT supply, token distribution, mission approval, sponsor verification, reward management, AI agent monitoring, security alerts, revenue reports, API usage/spending, emergency pause.

## Smart contracts (7, separate, OpenZeppelin, tests, verified source)
- AurenixToken (fixed BEP-20), GenesisNFT, MissionEscrow (sponsor funds), RewardDistributor, Marketplace, Governance, Treasury (multisig).
- Start on BNB testnet. Mainnet ONLY after testing, legal review, security approval.
- Security controls: sybil-resistant verification, duplicate submission detection, plagiarism checks, wallet ownership verification, rate limits, API auth, admin role separation, signed tx validation, replay protection, reentrancy protection, escrow accounting, public reward records, emergency pause, independent dispute review.

## 90-day roadmap (Phase 1 = MVP, Days 1–7)
- Days 1–7 MVP: website + brand, wallet connection, user dashboard, Genesis NFT artwork, mission creation + submissions, admin dashboard, BNB testnet contracts.
- Days 8–15 private beta; 16–30 community launch; 31–45 commercial launch; 46–60 token prep; 61–75 token launch prep; 76–90 expansion. Token launches ONLY after all approvals.
- 90-day targets: 500 registered users, 100 active contributors, 50 completed missions, 5 paying sponsors, 10 active AI agents, 1 repeat paying customer. Proposed goals, not guaranteed.

## Budget + legal
- Zero-cost-first: Cloudflare free tier, D1 free tier, GitHub, VS Code, AI-generated artwork, free AI tiers, BNB testnet, organic social. Mainnet deployment, audit, legal, liquidity budgeted separately — real expenses, no dollar amounts given. Do NOT promise a zero-cost mainnet token launch.
- India legal (operator is in India — address BEFORE accepting public funds or distributing a tradable token): Indian lawyer (virtual digital assets), tax treatment, FIU-IND registration + AML/KYC, advertising/consumer protection, token distribution/vesting/risk disclosures, cross-border payments/FX. Different consequences for NFT membership vs work payments vs token rewards vs trading. This is a USER step, not a build step.

## Guardrails for the build (standing rules, never overridden)
- No mainnet deploy, no public liquidity, no token distribution, no public funds — without the user's explicit approval for that exact action.
- No fabrication: no fake users, transactions, NFT ownership, mission results, revenue, analytics, sponsors, customers, testimonials.
- No spending, no paid subscriptions/services, no new accounts, no signing.
- Testnet deploy only if testnet BNB is obtainable without a captcha/login the agent cannot pass; otherwise it is a user step.
- Report honestly: what is built, what is tested, what is NOT done.
