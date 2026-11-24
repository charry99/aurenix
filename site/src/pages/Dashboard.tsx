import { Link } from 'react-router-dom'
import { ASSETS } from '../config'
import { DemoNote, PageHead } from '../components/Layout'
import { getMissions, getSubmissions, reputationPoints } from '../lib/store'

export default function Dashboard() {
  const submissions = getSubmissions()
  const missions = getMissions()
  const points = reputationPoints(submissions)
  const approved = submissions.filter((s) => s.status === 'Approved').length
  const pending = submissions.filter((s) => s.status === 'Pending').length
  const rejected = submissions.filter((s) => s.status === 'Rejected').length
  const submittedIds = new Set(submissions.map((s) => s.missionId))
  const available = missions.filter((m) => !submittedIds.has(m.id) && m.status === 'Open')

  return (
    <>
      <PageHead
        eyebrow="User Dashboard"
        title="Your dashboard"
        lede="Your local submissions, demo holdings, reputation, and mission history — all stored in this browser."
      />
      <DemoNote>
        No wallet is connected, no real
        NFT is held, and no real rewards have been earned. Everything here reflects
        only what you have done in the Mission Hub on this device.
      </DemoNote>

      <div className="stat-row">
        <div className="stat"><div className="num">{points}</div><div className="lbl">Reputation points (demo)</div></div>
        <div className="stat"><div className="num">{submissions.length}</div><div className="lbl">Submissions (local)</div></div>
        <div className="stat"><div className="num">{approved}</div><div className="lbl">Approved (demo review)</div></div>
        <div className="stat"><div className="num">{pending}</div><div className="lbl">Pending review</div></div>
        <div className="stat"><div className="num">{rejected}</div><div className="lbl">Rejected</div></div>
      </div>

      <section>
        <h2>Demo NFT holdings</h2>
        <p className="small muted">
          Clearly labelled demo: you hold no Genesis NFT. These cards show what the
          tiers look like — they are not owned, minted, or assigned to you.
        </p>
        <div className="grid c4">
          {[
            { img: ASSETS.nftBronze, name: 'Bronze', held: 'Not held (demo)' },
            { img: ASSETS.nftSilver, name: 'Silver', held: 'Not held (demo)' },
            { img: ASSETS.nftGold, name: 'Gold', held: 'Not held (demo)' },
            { img: ASSETS.nftElite, name: 'Elite', held: 'Not held (demo)' },
          ].map((t) => (
            <div className="card" key={t.name}>
              <img className="tier-img" src={t.img} alt={`${t.name} tier NFT artwork`} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <h3>{t.name}</h3>
              <p className="small muted">{t.held}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Available missions</h2>
        {available.length === 0 ? (
          <div className="empty">
            No new missions to show — you have submitted to every open mission, or none
            are open. <Link to="/missions">Browse the Mission Hub</Link>
          </div>
        ) : (
          <div className="grid c2">
            {available.map((m) => (
              <div className="card" key={m.id}>
                <span className="badge">{m.category}</span>
                <h3>{m.title}</h3>
                <p className="small">Reward: {m.rewardAmount} — {m.rewardType}</p>
                <Link to="/missions">Open in Mission Hub</Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Your submissions &amp; mission history</h2>
        {submissions.length === 0 ? (
          <div className="empty">
            No submissions yet. Your mission history will appear here after you submit
            work in the Mission Hub.
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Mission</th><th>Status</th><th>Submitted</th></tr></thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id}>
                    <td><strong>{s.missionTitle}</strong><br /><span className="small muted">{s.text.slice(0, 120)}{s.text.length > 120 ? '…' : ''}</span></td>
                    <td>{s.status}</td>
                    <td>{new Date(s.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2>Reward history</h2>
        <div className="empty">
          No rewards have been earned or paid — there are no live sponsors, no launched
          token, and no escrow in this demo. Approved demo submissions earn reputation
          points only (10 per submission, +40 on approval).
        </div>
        <p className="small muted">
          Wallet balance: not connected (demo — no wallet connection in this MVP).
          Agent registrations, competition rankings, marketplace activity, and referral
          tracking: none exist yet; they will appear here when those features launch.
        </p>
      </section>
    </>
  )
}
