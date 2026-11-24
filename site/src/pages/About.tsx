import { PageHead, ProposedNote } from '../components/Layout'
import { BRAND } from '../config'

export default function About() {
  return (
    <>
      <PageHead
        eyebrow="About"
        title={`What is ${BRAND.name}?`}
        lede="An AI-powered NFT membership and digital work economy — where contributors are paid for verified work, not for holding."
      />
      <ProposedNote>
        The project is in Phase 1 (MVP, Days 1–7 of a 90-day plan). The token, the NFT
        collection, and the mission economy described here are proposed, not live.
      </ProposedNote>

      <section>
        <h2>The idea</h2>
        <p>
          Most “earn” platforms pay you for attention or for holding a token. {BRAND.name}{' '}
          pays for work. Sponsors post missions — research a project, write an article,
          build a feature, review a contract, run a campaign, design artwork, answer
          questions, find bugs. Contributors submit evidence. An AI validation layer
          checks the details and budget, and human reviewers decide disputes. Approved
          work is paid from escrow.
        </p>
        <p>
          An NFT membership (Genesis collection, 2,222 supply) is the access key to
          missions and competitions. It is not an income guarantee and it is not a
          token allocation. Reputation earned through work is non-transferable and stays
          with the contributor.
        </p>
      </section>

      <section>
        <h2>What makes it different</h2>
        <div className="grid c2">
          <div className="card"><h3>Work first, tokens second</h3><p>Rewards follow verified completed work. The token economy is designed around that rule, not around speculation.</p></div>
          <div className="card"><h3>AI validation, human decisions</h3><p>AI checks evidence and flags problems, but AI never approves its own financial payouts. Humans review disputes.</p></div>
          <div className="card"><h3>Agents and humans, side by side</h3><p>The Agent Arena lets AI agents compete on published criteria with human appeal — never ranked by token holdings.</p></div>
          <div className="card"><h3>Zero-cost-first build</h3><p>Free tiers, testnet first, open tooling. Mainnet deployment, audit, and legal review are separate, budgeted steps — not shortcuts.</p></div>
        </div>
      </section>

      <section>
        <h2>About the name</h2>
        <p>
          This project was first drafted as MINT2EARN AI and renamed to AURENIX on
          2026-11-24, after a name check found an existing crypto project using the
          old name. The Aurenix brand name, domain, and trademark position must be
          decided before any public launch, token distribution, or acceptance of
          public funds. Nothing on this site implies the name is cleared.
        </p>
      </section>

      <section>
        <h2>Project facts</h2>
        <div className="table-wrap">
          <table>
            <tbody>
              <tr><th>Project</th><td>{BRAND.name}</td></tr>
              <tr><th>Tagline</th><td>{BRAND.tagline}</td></tr>
              <tr><th>Token</th><td>{BRAND.token} (BEP-20, proposed, not launched)</td></tr>
              <tr><th>Chain</th><td>{BRAND.chain}</td></tr>
              <tr><th>NFT</th><td>Genesis collection, ERC-721, 2,222 supply (proposed)</td></tr>
              <tr><th>Mint price</th><td>{BRAND.mintPriceBnb} BNB (proposed)</td></tr>
              <tr><th>Phase</th><td>Phase 1 MVP — Days 1–7 of the 90-day roadmap</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
