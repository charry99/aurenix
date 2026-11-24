import { PageHead } from '../components/Layout'

export default function Security() {
  return (
    <>
      <PageHead
        eyebrow="Security"
        title="Security by design — and by honesty"
        lede="The controls the platform is designed with, and the limits of what exists today."
      />
      <div className="callout warn">
        <p>
          <strong>Honest status:</strong> this MVP is a static demo site. There are no
          live contracts, no escrow, no wallets connected, and no audit. The controls
          below are the design the platform must meet before mainnet — not claims about
          what exists now.
        </p>
      </div>

      <section>
        <h2>Platform controls (planned)</h2>
        <div className="grid c2">
          <div className="card"><h3>Sybil resistance</h3><p>Verification steps that make fake accounts expensive, so one person cannot farm missions as many identities.</p></div>
          <div className="card"><h3>Duplicate &amp; plagiarism checks</h3><p>Submissions are checked against each other and against public sources before approval.</p></div>
          <div className="card"><h3>Wallet ownership verification</h3><p>Rewards go only to wallets proven to belong to the contributor.</p></div>
          <div className="card"><h3>Rate limits &amp; API auth</h3><p>Abuse is throttled at the API layer; admin actions are authenticated and role-separated.</p></div>
          <div className="card"><h3>Contract protections</h3><p>Reentrancy protection, signed-transaction validation, replay protection, and escrow accounting in every money-moving contract.</p></div>
          <div className="card"><h3>Emergency pause</h3><p>Admins can pause the platform in an emergency. The Admin Dashboard in this demo has a local-only pause toggle.</p></div>
        </div>
      </section>

      <section>
        <h2>Money rules</h2>
        <ul className="clean">
          <li>AI must not approve its own financial payouts — humans approve releases and resolve disputes.</li>
          <li>Sponsor funds sit in escrow until work is verified; nothing is paid on a promise.</li>
          <li>Separate wallets for treasury, operations, and rewards. Treasury keys in hardware wallets with multisig.</li>
          <li>Token minting is disabled after the fixed supply is set.</li>
          <li>Public reward records: who was paid, for what, and how much — published, not hidden.</li>
          <li>Admin role separation: no single account can create a mission, approve it, and release its funds.</li>
        </ul>
      </section>

      <section>
        <h2>Legal — India (operator is in India)</h2>
        <p>
          Before accepting public funds or distributing a tradable token, the project
          must address: advice from an Indian lawyer on virtual digital assets, tax
          treatment, FIU-IND registration and AML/KYC, advertising and consumer
          protection, token distribution and vesting risk disclosures, and cross-border
          payments/FX rules. NFT membership, work payments, token rewards, and trading
          each carry different consequences. This is a user step, not a build step — and
          it is a blocker, not a formality.
        </p>
      </section>

      <section>
        <h2>Reporting a problem</h2>
        <p>
          Found a bug in this demo? Use the Testing mission in the Mission Hub to file
          it, or raise it in the Community channels. No bug bounty exists yet.
        </p>
      </section>
    </>
  )
}
