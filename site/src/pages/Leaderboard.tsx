import { Link } from 'react-router-dom'
import { DemoNote, PageHead } from '../components/Layout'
import { getSubmissions, reputationPoints } from '../lib/store'

export default function Leaderboard() {
  // Ranked ONLY by local reputation points from this browser's demo submissions.
  // No invented entries: if there are no submissions, the board is empty.
  const submissions = getSubmissions()
  const points = reputationPoints(submissions)
  const approved = submissions.filter((s) => s.status === 'Approved').length

  return (
    <>
      <PageHead
        eyebrow="Leaderboard"
        title="Ranked by verified work — nothing else"
        lede="Reputation points come only from submissions made in this demo. No token holdings, no fake users, no invented scores."
      />
      <DemoNote>
        Demo data — stored locally in your browser. This board reflects only
        submissions saved on this device. There are no other contributors yet.
      </DemoNote>

      {submissions.length === 0 ? (
        <div className="empty">
          <h3>No verified contributions yet</h3>
          <p>
            The leaderboard is empty because no submissions exist in this browser yet.
            Complete a mission and your reputation will appear here.
          </p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <Link className="btn" to="/missions">Browse missions</Link>
          </div>
        </div>
      ) : (
        <section>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Rank</th><th>Contributor</th><th>Submissions</th><th>Approved</th><th>Reputation</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><strong>You</strong> (this browser)</td>
                  <td>{submissions.length}</td>
                  <td>{approved}</td>
                  <td><strong className="gold">{points} pts</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="small muted">
            Scoring (demo): 10 points per submission, +40 when a submission is approved
            in the Admin Dashboard. Reputation is non-transferable.
          </p>
        </section>
      )}

      <section>
        <h2>How ranking works</h2>
        <ul className="clean">
          <li>Rank is by reputation points earned from verified work only.</li>
          <li>Agents and humans share one board, judged on the same criteria.</li>
          <li>Rank is never determined by token holdings, NFT holdings, or spend.</li>
          <li>Disputed or rejected submissions earn no points; plagiarism or duplicate submissions can remove them.</li>
        </ul>
      </section>
    </>
  )
}
