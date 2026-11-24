import { useState } from 'react'
import { BRAND } from '../config'
import { DemoNote, PageHead, ProposedNote } from '../components/Layout'
import {
  getSubmissions,
  isPaused,
  setPaused,
  setSubmissionStatus,
  type Submission,
} from '../lib/store'

const AGENTS = [
  { name: 'CEO', role: 'Planning and strategy' },
  { name: 'Research', role: 'Opportunities and sponsors' },
  { name: 'Development', role: 'Features and fixes' },
  { name: 'Security', role: 'Scans and audits' },
  { name: 'Mission', role: 'Create and manage missions' },
  { name: 'Content', role: 'Articles and social' },
  { name: 'Growth', role: 'Community and partnerships' },
  { name: 'NFT', role: 'Metadata and artwork' },
  { name: 'Analytics', role: 'Revenue and costs' },
  { name: 'Support', role: 'Questions and disputes' },
]

const DISTRIBUTION = [
  { label: 'Community rewards', pct: '35%', amount: '35,000,000' },
  { label: 'Ecosystem development', pct: '20%', amount: '20,000,000' },
  { label: 'Liquidity', pct: '15%', amount: '15,000,000' },
  { label: 'NFT ecosystem', pct: '10%', amount: '10,000,000' },
  { label: 'Partnerships', pct: '10%', amount: '10,000,000' },
  { label: 'Treasury', pct: '10%', amount: '10,000,000' },
]

export default function Admin() {
  const [submissions, setSubmissions] = useState<Submission[]>(() => getSubmissions())
  const [paused, setPausedState] = useState<boolean>(() => isPaused())
  const [notice, setNotice] = useState('')

  function decide(id: string, status: 'Approved' | 'Rejected') {
    setSubmissions(setSubmissionStatus(id, status))
    setNotice(`Submission ${status.toLowerCase()} (demo — local only).`)
  }

  function togglePause() {
    const next = !paused
    setPaused(next)
    setPausedState(next)
    setNotice(
      next
        ? 'Emergency pause ON (demo toggle — local only, pauses nothing on-chain because nothing is deployed).'
        : 'Emergency pause OFF (demo toggle).',
    )
  }

  const pending = submissions.filter((s) => s.status === 'Pending')
  const decided = submissions.filter((s) => s.status !== 'Pending')

  return (
    <>
      <PageHead
        eyebrow="Admin Dashboard"
        title="Admin — demo console"
        lede="Mission approvals, supply counters, token distribution, agents, and security — all demo data, all local."
      />
      <DemoNote>
        Demo data — stored locally in your browser. This is not a real admin panel:
        there are no real users, no contracts, and no funds. Approvals here only change
        local demo state.
      </DemoNote>
      {notice ? (
        <div className="callout"><p>{notice}</p></div>
      ) : null}

      <section>
        <h2>Mission approvals</h2>
        {pending.length === 0 ? (
          <div className="empty">No submissions pending review. New submissions from the Mission Hub appear here.</div>
        ) : (
          pending.map((s) => (
            <div className="card" key={s.id} style={{ marginBottom: 12 }}>
              <p>
                <strong>{s.missionTitle}</strong> — {s.name} {s.handle ? `(${s.handle})` : ''}
              </p>
              <p>{s.text}</p>
              {s.url ? <p className="small"><a href={s.url} target="_blank" rel="noreferrer">{s.url}</a></p> : null}
              {s.evidence ? <p className="small muted">Evidence: {s.evidence}</p> : null}
              <div className="btn-row">
                <button className="btn" onClick={() => decide(s.id, 'Approved')}>Approve</button>
                <button className="btn danger" onClick={() => decide(s.id, 'Rejected')}>Reject</button>
              </div>
            </div>
          ))
        )}
        {decided.length > 0 ? (
          <>
            <h3>Decided submissions</h3>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Mission</th><th>Contributor</th><th>Status</th></tr></thead>
                <tbody>
                  {decided.map((s) => (
                    <tr key={s.id}>
                      <td>{s.missionTitle}</td>
                      <td>{s.name}</td>
                      <td>{s.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </section>

      <section>
        <h2>NFT supply counters</h2>
        <ProposedNote>
          Counters show the plan’s stated figures. Nothing has been minted — actual
          minted counts are zero across all tiers.
        </ProposedNote>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Bucket</th><th>Planned supply</th><th>Actually minted</th></tr></thead>
            <tbody>
              <tr><td>Community Genesis (free)</td><td>{BRAND.nftCommunityGenesis}</td><td>0</td></tr>
              <tr><td>Public mint</td><td>{BRAND.nftPublicMint}</td><td>0</td></tr>
              <tr><td>Treasury reserve</td><td>{BRAND.nftTreasuryReserve}</td><td>0</td></tr>
              <tr><td><strong>Total</strong></td><td><strong>{BRAND.nftSupply.toLocaleString()}</strong></td><td><strong>0</strong></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Token distribution</h2>
        <ProposedNote>
          Proposed distribution from the project plan. The token has not launched; no
          tokens exist or have been distributed.
        </ProposedNote>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Allocation</th><th>Share</th><th>Amount ({BRAND.token})</th></tr></thead>
            <tbody>
              {DISTRIBUTION.map((d) => (
                <tr key={d.label}><td>{d.label}</td><td>{d.pct}</td><td>{d.amount}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>{BRAND.agentsNetwork}</h2>
        <div className="grid c2">
          {AGENTS.map((a) => (
            <div className="card" key={a.name}>
              <span className="badge dim">Planned — not yet operational</span>
              <h3>{a.name} agent</h3>
              <p className="small muted">{a.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Security alerts</h2>
        <div className="empty">
          No security alerts. There is nothing to monitor yet — no live contracts, no
          escrow, no users, no transactions. Alerts will appear here when monitoring
          goes live; an empty board is the honest state, not a claim of safety.
        </div>
      </section>

      <section>
        <h2>Emergency pause (demo)</h2>
        <p>
          Status: <strong>{paused ? 'PAUSED (demo)' : 'Not paused'}</strong>. This toggle
          is local-only: it sets a flag in this browser’s localStorage and pauses
          nothing on-chain, because nothing is deployed.
        </p>
        <button className={`btn ${paused ? '' : 'danger'}`} onClick={togglePause}>
          {paused ? 'Resume (demo toggle)' : 'Pause platform (demo toggle)'}
        </button>
        <p className="small muted" style={{ marginTop: 12 }}>
          Not shown here because they do not exist yet: user management, sponsor
          verification, reward management, revenue reports, API usage and spending.
          Those sections appear when the backend exists — they are not faked with
          placeholder numbers.
        </p>
      </section>
    </>
  )
}
