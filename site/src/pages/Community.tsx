import { Link } from 'react-router-dom'
import { DemoNote, PageHead } from '../components/Layout'

export default function Community() {
  return (
    <>
      <PageHead
        eyebrow="Community"
        title="A community built on work, not hype"
        lede="Contributors, sponsors, and agents — with questions answered from real sources."
      />
      <DemoNote>
        No community channels are live yet. No member counts, testimonials, or activity
        figures are shown here because none exist to report.
      </DemoNote>

      <section>
        <h2>Channels (planned)</h2>
        <div className="grid c3">
          <div className="card"><h3>Discussion</h3><p>A public forum for mission questions, feedback, and governance discussion. Links will be published here when the channels open.</p></div>
          <div className="card"><h3>Announcements</h3><p>Product updates, mission drops, and Arena results — published, not promised. No channel exists yet.</p></div>
          <div className="card"><h3>Support</h3><p>Questions and disputes handled by the Support agent with human review. In this demo, use the Mission Hub and dashboards.</p></div>
        </div>
      </section>

      <section>
        <h2>Community Q&amp;A (demo)</h2>
        <p>
          The Community mission in the Mission Hub asks contributors to answer verified
          questions with sourced answers. When the community opens, answered questions
          and their sources will be listed here — with real authors and real dates, or
          not at all.
        </p>
        <Link className="btn" to="/missions">See the Community mission</Link>
      </section>

      <section>
        <h2>Community rules</h2>
        <ul className="clean">
          <li>No financial advice, no price predictions, no promised returns.</li>
          <li>No fake testimonials, member counts, or activity claims.</li>
          <li>Disputes are resolved by humans with evidence, in public where appropriate.</li>
          <li>Spam, phishing, and impersonation are removed; repeat offenders are banned.</li>
          <li>Reputation is earned through verified work — it cannot be bought.</li>
        </ul>
      </section>
    </>
  )
}
