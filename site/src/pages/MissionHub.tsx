import { useMemo, useState, type FormEvent } from 'react'
import { BRAND } from '../config'
import { DemoNote, PageHead } from '../components/Layout'
import {
  addLocalMission,
  addSubmission,
  getMissions,
  getSubmissions,
  uid,
  type Mission,
  type MissionCategory,
  type RewardType,
  type Submission,
} from '../lib/store'

const CATEGORIES: ('All' | MissionCategory)[] = [
  'All',
  'Web3 research',
  'Content',
  'Development',
  'Security',
  'Marketing',
  'Design',
  'Community',
  'Testing',
]

const REWARD_TYPES: RewardType[] = ['USDC sponsor-funded', 'AUNX', 'Reputation points']

export default function MissionHub() {
  const [missions, setMissions] = useState<Mission[]>(() => getMissions())
  const [submissions, setSubmissions] = useState<Submission[]>(() => getSubmissions())
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All')
  const [selected, setSelected] = useState<Mission | null>(null)
  const [notice, setNotice] = useState('')

  const visible = useMemo(
    () => (filter === 'All' ? missions : missions.filter((m) => m.category === filter)),
    [missions, filter],
  )

  function submitWork(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selected) return
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const handle = String(data.get('handle') ?? '').trim()
    const text = String(data.get('text') ?? '').trim()
    const url = String(data.get('url') ?? '').trim()
    const evidence = String(data.get('evidence') ?? '').trim()
    if (!name || !text) {
      setNotice('Name and submission text are required.')
      return
    }
    setSubmissions(
      addSubmission({
        missionId: selected.id,
        missionTitle: selected.title,
        name,
        handle,
        text,
        url,
        evidence,
      }),
    )
    e.currentTarget.reset()
    setNotice('Submission saved locally. Status: Pending review (demo — no real reviewer).')
  }

  function createMission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const title = String(data.get('title') ?? '').trim()
    const category = String(data.get('category') ?? 'Web3 research') as MissionCategory
    const description = String(data.get('description') ?? '').trim()
    const rewardType = String(data.get('rewardType') ?? 'Reputation points') as RewardType
    const rewardAmount = String(data.get('rewardAmount') ?? '').trim()
    const deadline = String(data.get('deadline') ?? '').trim()
    if (!title || !description || !rewardAmount || !deadline) {
      setNotice('Please fill in every field of the mission form.')
      return
    }
    setMissions(
      addLocalMission({
        id: uid(),
        title,
        category,
        description,
        rewardType,
        rewardAmount: `${rewardAmount} (PROPOSED)`,
        sponsor: 'Demo sponsor — no real sponsor',
        status: 'Open',
        deadline,
      }),
    )
    e.currentTarget.reset()
    setNotice('Demo mission added — it exists only in this browser (localStorage).')
  }

  const missionSubs = (id: string) => submissions.filter((s) => s.missionId === id)

  return (
    <>
      <PageHead
        eyebrow="Mission Hub"
        title="Open missions"
        lede="Real work, verified evidence, sponsor-funded rewards. Every reward below is a proposed amount — no live sponsor, no payout obligation yet."
      />
      <DemoNote>
        The 8 seeded missions are demo
        listings with a demo sponsor. Your submissions and any missions you create are
        saved in localStorage on this device only.
      </DemoNote>

      {notice ? (
        <div className="callout">
          <p>{notice}</p>
        </div>
      ) : null}

      <section>
        <h2>Filter by category</h2>
        <div className="btn-row" style={{ marginTop: 0 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`btn ${filter === c ? '' : 'ghost'}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="grid c2">
          {visible.map((m) => (
            <article className="card" key={m.id}>
              <span className="badge">{m.category}</span>{' '}
              <span className="badge green">{m.status}</span>{' '}
              {m.local ? <span className="badge dim">Demo / local mission</span> : null}
              <h3>{m.title}</h3>
              <p>{m.description}</p>
              <p className="small">
                <strong>Reward:</strong> {m.rewardAmount} — {m.rewardType}
                <br />
                <strong>Sponsor:</strong> {m.sponsor}
                <br />
                <strong>Deadline:</strong> {m.deadline}
                <br />
                <strong>Submissions (local):</strong> {missionSubs(m.id).length}
              </p>
              <button className="btn ghost" onClick={() => { setSelected(m); setNotice('') }}>
                View mission &amp; submit
              </button>
            </article>
          ))}
        </div>
        {visible.length === 0 ? (
          <div className="empty">No missions in this category yet.</div>
        ) : null}
      </section>

      {selected ? (
        <section className="card" id="mission-detail">
          <span className="badge">{selected.category}</span>{' '}
          <span className="badge green">{selected.status}</span>
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          <p>
            <strong>Reward:</strong> {selected.rewardAmount} — {selected.rewardType}
            <br />
            <strong>Sponsor:</strong> {selected.sponsor}
            <br />
            <strong>Deadline:</strong> {selected.deadline}
          </p>

          <h3>Submit your work</h3>
          <p className="small muted">
            Saved locally in your browser only. No wallet, no transaction, no real
            reviewer — the Admin Dashboard can approve or reject it as a demo.
          </p>
          <form onSubmit={submitWork}>
            <div className="form-grid">
              <div>
                <label htmlFor="sub-name">Your name</label>
                <input id="sub-name" name="name" required />
              </div>
              <div>
                <label htmlFor="sub-handle">Handle / username (optional)</label>
                <input id="sub-handle" name="handle" placeholder="@handle" />
              </div>
            </div>
            <label htmlFor="sub-text">Submission text</label>
            <textarea id="sub-text" name="text" required placeholder="Describe the work you completed and how it meets the mission." />
            <label htmlFor="sub-url">Submission URL (optional)</label>
            <input id="sub-url" name="url" type="url" placeholder="https://…" />
            <label htmlFor="sub-evidence">Evidence / links (optional)</label>
            <textarea id="sub-evidence" name="evidence" placeholder="Links to the repo, document, screenshots, or other proof." />
            <div className="btn-row">
              <button className="btn" type="submit">Save submission locally</button>
              <button className="btn ghost" type="button" onClick={() => setSelected(null)}>Close detail</button>
            </div>
          </form>

          <h3 style={{ marginTop: 24 }}>Local submissions for this mission</h3>
          {missionSubs(selected.id).length === 0 ? (
            <div className="empty">No submissions yet for this mission.</div>
          ) : (
            missionSubs(selected.id).map((s) => (
              <div className="card" key={s.id} style={{ marginBottom: 12 }}>
                <p>
                  <strong>{s.name}</strong> {s.handle ? `(${s.handle})` : ''} —{' '}
                  <span className="badge dim">{s.status}</span>
                </p>
                <p>{s.text}</p>
                {s.url ? <p className="small"><a href={s.url} target="_blank" rel="noreferrer">{s.url}</a></p> : null}
                {s.evidence ? <p className="small muted">Evidence: {s.evidence}</p> : null}
                <p className="small muted">Submitted {new Date(s.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </section>
      ) : null}

      <section className="card">
        <h2>Create a mission (sponsor demo)</h2>
        <p className="small muted">
          This form adds a mission to the local list in this browser only. It is labelled
          as a demo/local mission, has no real sponsor, and creates no escrow, contract,
          or payout obligation.
        </p>
        <form onSubmit={createMission}>
          <label htmlFor="m-title">Mission title</label>
          <input id="m-title" name="title" required />
          <div className="form-grid">
            <div>
              <label htmlFor="m-category">Category</label>
              <select id="m-category" name="category">
                {CATEGORIES.slice(1).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="m-reward-type">Reward type</label>
              <select id="m-reward-type" name="rewardType">
                {REWARD_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <label htmlFor="m-description">Description</label>
          <textarea id="m-description" name="description" required />
          <div className="form-grid">
            <div>
              <label htmlFor="m-amount">Proposed reward amount</label>
              <input id="m-amount" name="rewardAmount" required placeholder="e.g. 250 AUNX" />
            </div>
            <div>
              <label htmlFor="m-deadline">Deadline</label>
              <input id="m-deadline" name="deadline" type="date" required />
            </div>
          </div>
          <div className="btn-row">
            <button className="btn" type="submit">Add demo mission locally</button>
          </div>
        </form>
      </section>

      <section>
        <h2>How missions are verified</h2>
        <p>
          Sponsor creates a mission → AI validates details and budget → contributors
          submit evidence → evaluation and human dispute review → approved rewards are
          released from escrow. AI never approves its own financial payouts. In this
          demo, the Admin Dashboard stands in for the review step.
        </p>
        <p className="small muted">
          Token rewards shown here are proposed {BRAND.token} amounts. The token has not
          launched and no reward is owed.
        </p>
      </section>
    </>
  )
}
