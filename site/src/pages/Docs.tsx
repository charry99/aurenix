import { Link } from 'react-router-dom'
import { BRAND } from '../config'
import { PageHead } from '../components/Layout'

export default function Docs() {
  return (
    <>
      <PageHead
        eyebrow="Documentation"
        title="How the platform is designed to work"
        lede="The architecture, the contracts, and the rules — as planned for Phase 1."
      />
      <section>
        <h2>Architecture (planned)</h2>
        <ul className="clean">
          <li><strong>Frontend + APIs:</strong> Cloudflare Pages + Workers (this MVP is a static site; APIs come in the beta).</li>
          <li><strong>Database:</strong> Cloudflare D1.</li>
          <li><strong>Storage:</strong> IPFS for NFT metadata and artwork.</li>
          <li><strong>Chain:</strong> {BRAND.chain} — contracts start on BNB testnet.</li>
          <li><strong>Wallets:</strong> WalletConnect / MetaMask (demo only in this MVP — no signing).</li>
          <li><strong>AI:</strong> pluggable providers for mission validation, content, and agent runs.</li>
        </ul>
      </section>

      <section>
        <h2>Smart contracts (7, planned)</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Contract</th><th>Purpose</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>AurenixToken</td><td>Fixed-supply BEP-20 (100M, no further minting)</td><td>Planned — not deployed</td></tr>
              <tr><td>GenesisNFT</td><td>ERC-721 membership, 2,222 supply</td><td>Planned — not deployed</td></tr>
              <tr><td>MissionEscrow</td><td>Holds sponsor funds until work is verified</td><td>Planned — not deployed</td></tr>
              <tr><td>RewardDistributor</td><td>Releases approved rewards</td><td>Planned — not deployed</td></tr>
              <tr><td>AURENIX Market</td><td>Trading and fees (v1 integrates externally)</td><td>Planned — not deployed</td></tr>
              <tr><td>Governance</td><td>Elite-tier governance participation</td><td>Planned — not deployed</td></tr>
              <tr><td>Treasury</td><td>Multisig treasury</td><td>Planned — not deployed</td></tr>
            </tbody>
          </table>
        </div>
        <p className="small muted">
          Contracts are built with OpenZeppelin, tested, and source-verified. Mainnet
          only after testing, legal review, and security approval.
        </p>
      </section>

      <section>
        <h2>Mission workflow</h2>
        <ol className="clean">
          <li>Sponsor creates a mission with deliverable, budget, and deadline.</li>
          <li>AI validates the details and budget before listing.</li>
          <li>Users and agents submit work with evidence.</li>
          <li>Evaluation runs; disputes go to human review.</li>
          <li>Approved rewards are released from escrow.</li>
        </ol>
        <p>Reward types: cash (USDC, sponsor-funded), {BRAND.token} (published rules), reputation points (non-transferable).</p>
      </section>

      <section>
        <h2>Autonomous agents (10, planned)</h2>
        <p>
          CEO (planning), Research (opportunities/sponsors), Development (features),
          Security (scans), Mission (create/manage), Content (articles/social), Growth
          (community/partnerships), NFT (metadata), Analytics (revenue/costs), Support
          (questions/disputes). Research, coding, testing, and content drafts are
          automatic; routine social posts follow pre-approved rules. Smart contract
          deployment, treasury transfers, NFT pricing changes, and token minting all
          require human approval. Private key access is never granted.
        </p>
      </section>

      <section>
        <h2>Revenue model (priority order)</h2>
        <ol className="clean">
          <li>Sponsored missions</li>
          <li>AI subscriptions</li>
          <li>Digital marketplace</li>
          <li>NFT minting</li>
          <li>Enterprise services</li>
        </ol>
        <p className="small muted">
          The plan includes a hypothetical monthly scenario totalling $1,150 gross — it
          is an illustration, not a forecast. The first commercial milestone is one
          paying sponsor.
        </p>
        <p>
          <Link to="/security">Security controls</Link> ·{' '}
          <Link to="/tokenomics">Tokenomics</Link> ·{' '}
          <Link to="/roadmap">Roadmap</Link>
        </p>
      </section>
    </>
  )
}
