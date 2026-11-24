import { BRAND } from '../config'
import { PageHead, ProposedNote } from '../components/Layout'

const SPLIT = [
  { label: 'Community rewards', pct: 35, amount: '35,000,000', note: 'Released against verified completed work only.' },
  { label: 'Ecosystem development', pct: 20, amount: '20,000,000', note: 'Platform features, tooling, and infrastructure.' },
  { label: 'Liquidity', pct: 15, amount: '15,000,000', note: 'Disclosed wallet, transparent lock and vesting.' },
  { label: 'NFT ecosystem', pct: 10, amount: '10,000,000', note: 'Rewards and incentives tied to the Genesis NFT economy.' },
  { label: 'Partnerships', pct: 10, amount: '10,000,000', note: 'Milestone-based release only.' },
  { label: 'Treasury', pct: 10, amount: '10,000,000', note: '36-month release schedule.' },
]

export default function Tokenomics() {
  return (
    <>
      <PageHead
        eyebrow="Tokenomics"
        title={`${BRAND.token} — 100,000,000 fixed supply`}
        lede="A fixed-supply BEP-20 token on BNB Smart Chain. No further minting after launch."
      />
      <ProposedNote>
        The {BRAND.token} token has not launched. The split and vesting below are
        proposed figures from the project plan, not deployed terms. Nothing here
        promises a price, a listing, or any return.
      </ProposedNote>

      <section>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Allocation</th><th>Share</th><th>Amount</th><th>Vesting / release</th></tr>
            </thead>
            <tbody>
              {SPLIT.map((s) => (
                <tr key={s.label}>
                  <td><strong>{s.label}</strong></td>
                  <td>{s.pct}%</td>
                  <td>{s.amount} {BRAND.token}</td>
                  <td>{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="grid c2">
          {SPLIT.map((s) => (
            <div className="card" key={s.label}>
              <h3>{s.label} — {s.pct}%</h3>
              <div className="progress"><div style={{ width: `${s.pct}%` }} /></div>
              <p className="small muted" style={{ marginTop: 10 }}>{s.amount} {BRAND.token} · {s.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Vesting rules</h2>
        <ul className="clean">
          <li><strong>Treasury:</strong> 36-month release.</li>
          <li><strong>Partnerships:</strong> milestone-based release only.</li>
          <li><strong>Team allocation:</strong> only after a team is identified and terms are published. No team allocation exists today.</li>
          <li><strong>Community rewards:</strong> released against verified completed work — never for holding alone.</li>
          <li><strong>Liquidity:</strong> disclosed wallet with transparent lock and vesting.</li>
          <li><strong>Supply:</strong> fixed at 100,000,000. No further minting.</li>
        </ul>
      </section>

      <div className="callout warn">
        <p>
          <strong>No promises.</strong> {BRAND.name} does not promise a token price, an
          exchange listing, or any return. The token launches only after all approvals
          in the roadmap are met (see Roadmap, Days 46–75).
        </p>
      </div>
    </>
  )
}
