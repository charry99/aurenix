import { PageHead } from '../components/Layout'

const PHASES = [
  { days: 'Days 1–7 — MVP', status: 'in progress — MVP', current: true, items: ['Website + brand', 'Wallet connection (demo)', 'User dashboard', 'Genesis NFT artwork', 'Mission creation + submissions', 'Admin dashboard', 'BNB testnet contracts'] },
  { days: 'Days 8–15 — Private beta', status: 'Planned', current: false, items: ['Invite-only testers', 'First real missions with demo sponsors', 'Feedback loop and fixes', 'Testnet contract testing'] },
  { days: 'Days 16–30 — Community launch', status: 'Planned', current: false, items: ['Public community opening', 'Genesis NFT mint (testnet first)', 'First Agent Arena pilot', 'Community governance draft'] },
  { days: 'Days 31–45 — Commercial launch', status: 'Planned', current: false, items: ['First paying sponsor — the key milestone', 'Sponsored missions live', 'Marketplace integration live', 'Revenue reporting (real numbers only)'] },
  { days: 'Days 46–60 — Token prep', status: 'Planned', current: false, items: ['Tokenomics finalisation', 'Legal review (India: VDA, tax, FIU-IND)', 'Audit planning', 'Vesting and lock design'] },
  { days: 'Days 61–75 — Token launch prep', status: 'Planned', current: false, items: ['Audit complete', 'Liquidity planning and disclosure', 'Launch communications', 'No launch without all approvals'] },
  { days: 'Days 76–90 — Expansion', status: 'Planned', current: false, items: ['New mission categories', 'More sponsors and partnerships', 'Agent ecosystem growth', '90-day review against targets'] },
]

const TARGETS = [
  { label: 'Registered users', value: '500' },
  { label: 'Active contributors', value: '100' },
  { label: 'Completed missions', value: '50' },
  { label: 'Paying sponsors', value: '5' },
  { label: 'Active AI agents', value: '10' },
  { label: 'Repeat paying customers', value: '1' },
]

export default function Roadmap() {
  return (
    <>
      <PageHead
        eyebrow="Roadmap"
        title="90 days, seven stages"
        lede="Phase 1 is the MVP — this website, the Mission Hub, and the dashboards. The token launches only after all approvals are met."
      />
      <div className="callout">
        <p>
          <strong>Now: Days 1–7 — in progress (MVP).</strong> This site is the MVP
          deliverable. Everything after Day 7 is planned, not done.
        </p>
      </div>

      <section>
        <div className="timeline">
          {PHASES.map((p) => (
            <div className={`phase${p.current ? ' done' : ''}`} key={p.days}>
              <span className={`badge${p.current ? ' green' : ' dim'}`}>{p.status}</span>
              <h3>{p.days}</h3>
              <ul className="clean">
                {p.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>90-day targets — proposed goals, not guarantees</h2>
        <div className="stat-row">
          {TARGETS.map((t) => (
            <div className="stat" key={t.label}>
              <div className="num">{t.value}</div>
              <div className="lbl">{t.label} (proposed target)</div>
            </div>
          ))}
        </div>
        <p className="small muted">
          These are targets from the project plan. They are goals to aim at, not
          forecasts and not promises.
        </p>
      </section>
    </>
  )
}
