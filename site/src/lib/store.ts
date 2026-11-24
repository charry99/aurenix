// Local demo data store. Nothing here touches a chain, a server, or a wallet.
// Missions and submissions live only in this browser's localStorage.

export type RewardType = 'USDC sponsor-funded' | 'AUNX' | 'Reputation points'

export type MissionCategory =
  | 'Web3 research'
  | 'Content'
  | 'Development'
  | 'Security'
  | 'Marketing'
  | 'Design'
  | 'Community'
  | 'Testing'

export interface Mission {
  id: string
  title: string
  category: MissionCategory
  description: string
  rewardType: RewardType
  /** All rewards are PROPOSED amounts — no live sponsor, no payout obligation. */
  rewardAmount: string
  sponsor: string
  status: 'Open' | 'Closed'
  deadline: string
  local?: boolean
}

export interface Submission {
  id: string
  missionId: string
  missionTitle: string
  name: string
  handle: string
  text: string
  url: string
  evidence: string
  status: 'Pending' | 'Approved' | 'Rejected'
  createdAt: string
}

const SEED_MISSIONS: Mission[] = [
  {
    id: 'm-research-01',
    title: 'Verify a Web3 project\u2019s documentation',
    category: 'Web3 research',
    description:
      'Pick a live Web3 project, read its docs end to end, and produce a structured verification report: what the docs claim, what the on-chain contracts and links actually show, and every mismatch or dead link you found — with sources.',
    rewardType: 'USDC sponsor-funded',
    rewardAmount: '50 USDC (PROPOSED)',
    sponsor: 'Demo sponsor — no real sponsor',
    status: 'Open',
    deadline: '2026-12-31',
  },
  {
    id: 'm-content-01',
    title: 'Write an educational article on how NFT memberships work',
    category: 'Content',
    description:
      'Write a clear, beginner-friendly article (800–1,200 words) explaining NFT membership models: what holders get, what they do not get, and the risks to check before minting. Original work only — no AI-generated copy pasted without disclosure.',
    rewardType: 'AUNX',
    rewardAmount: '500 AUNX (PROPOSED)',
    sponsor: 'Demo sponsor — no real sponsor',
    status: 'Open',
    deadline: '2026-12-31',
  },
  {
    id: 'm-dev-01',
    title: 'Build a smart contract feature: escrow release function',
    category: 'Development',
    description:
      'Implement and test a simple escrow release function (Solidity, OpenZeppelin): funds release only after two approvals, with events and a full test suite. Submit the repo link and test output.',
    rewardType: 'AUNX',
    rewardAmount: '1,000 AUNX (PROPOSED)',
    sponsor: 'Demo sponsor — no real sponsor',
    status: 'Open',
    deadline: '2027-01-15',
  },
  {
    id: 'm-security-01',
    title: 'Review a test contract for common vulnerabilities',
    category: 'Security',
    description:
      'Audit the provided test ERC-20 contract for reentrancy, access-control, and integer issues. Submit a written findings report with severity ratings and suggested fixes. No live contract is involved.',
    rewardType: 'USDC sponsor-funded',
    rewardAmount: '100 USDC (PROPOSED)',
    sponsor: 'Demo sponsor — no real sponsor',
    status: 'Open',
    deadline: '2027-01-15',
  },
  {
    id: 'm-marketing-01',
    title: 'Create a launch campaign for a fictional NFT drop',
    category: 'Marketing',
    description:
      'Design a one-week launch campaign for a fictional NFT collection: audience, channels, a 7-day content calendar, and three finished posts. No real project, no real spend, no paid ads.',
    rewardType: 'AUNX',
    rewardAmount: '400 AUNX (PROPOSED)',
    sponsor: 'Demo sponsor — no real sponsor',
    status: 'Open',
    deadline: '2026-12-31',
  },
  {
    id: 'm-design-01',
    title: 'Produce NFT artwork: one Bronze-tier concept set',
    category: 'Design',
    description:
      'Produce three original Bronze-tier NFT artwork concepts (square, 1024×1024) in a consistent black-and-gold style, with a short note on traits and rarity thinking. Original work only.',
    rewardType: 'AUNX',
    rewardAmount: '600 AUNX (PROPOSED)',
    sponsor: 'Demo sponsor — no real sponsor',
    status: 'Open',
    deadline: '2027-01-15',
  },
  {
    id: 'm-community-01',
    title: 'Answer verified community questions',
    category: 'Community',
    description:
      'Answer five open community questions in the Community page Q&A with accurate, sourced answers (docs or on-chain links). Quality beats speed — wrong answers earn no reputation.',
    rewardType: 'Reputation points',
    rewardAmount: '50 reputation points (PROPOSED)',
    sponsor: 'Demo sponsor — no real sponsor',
    status: 'Open',
    deadline: '2026-12-31',
  },
  {
    id: 'm-testing-01',
    title: 'Find reproducible software bugs in the demo site',
    category: 'Testing',
    description:
      'Test this demo site on desktop and mobile and file reproducible bug reports: steps, expected vs actual behaviour, browser, and a screenshot link. Each confirmed, distinct bug counts.',
    rewardType: 'Reputation points',
    rewardAmount: '25 reputation points per confirmed bug (PROPOSED)',
    sponsor: 'Demo sponsor — no real sponsor',
    status: 'Open',
    deadline: '2027-01-15',
  },
]

const KEYS = {
  customMissions: 'aunx_custom_missions',
  submissions: 'aunx_submissions',
  paused: 'aunx_emergency_paused',
} as const

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or unavailable — demo data is best-effort.
  }
}

export function getMissions(): Mission[] {
  return [...SEED_MISSIONS, ...read<Mission[]>(KEYS.customMissions, [])]
}

export function addLocalMission(m: Mission): Mission[] {
  const custom = read<Mission[]>(KEYS.customMissions, [])
  const next = [...custom, { ...m, local: true }]
  write(KEYS.customMissions, next)
  return [...SEED_MISSIONS, ...next]
}

export function getSubmissions(): Submission[] {
  return read<Submission[]>(KEYS.submissions, [])
}

export function addSubmission(s: Omit<Submission, 'id' | 'status' | 'createdAt'>): Submission[] {
  const next: Submission = {
    ...s,
    id: `sub-${Date.now().toString(36)}`,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  }
  const all = [next, ...getSubmissions()]
  write(KEYS.submissions, all)
  return all
}

export function setSubmissionStatus(id: string, status: 'Approved' | 'Rejected'): Submission[] {
  const all = getSubmissions().map((s) => (s.id === id ? { ...s, status } : s))
  write(KEYS.submissions, all)
  return all
}

/** Reputation is demo-only: 10 pts per submission, +40 more when approved. */
export function reputationPoints(submissions: Submission[]): number {
  return submissions.reduce(
    (sum, s) => sum + 10 + (s.status === 'Approved' ? 40 : 0),
    0,
  )
}

export function isPaused(): boolean {
  return read<boolean>(KEYS.paused, false)
}

export function setPaused(v: boolean) {
  write(KEYS.paused, v)
}

export function uid(): string {
  return `m-local-${Date.now().toString(36)}`
}
