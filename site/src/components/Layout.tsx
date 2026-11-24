import { useState, type ReactNode } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { ASSETS, BRAND } from '../config'
import BackgroundFX from './BackgroundFX'

/** Top-bar links: only the useful product pages, so the desktop bar stays
 * on one line. Everything else lives in the footer (and the mobile menu
 * below). */
const NAV: { to: string; label: string }[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/nft-collection', label: 'NFT Collection' },
  { to: '/tokenomics', label: 'Tokenomics' },
  { to: '/missions', label: 'Mission Hub' },
  { to: '/arena', label: 'AURENIX Arena' },
  { to: '/marketplace', label: 'AURENIX Market' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

/** Secondary pages: reachable from the footer and the mobile menu. */
const NAV_MORE: { to: string; label: string }[] = [
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/docs', label: 'Documentation' },
  { to: '/security', label: 'Security' },
  { to: '/community', label: 'Community' },
  { to: '/terms', label: 'Terms & Privacy' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/admin', label: 'Admin' },
]

export function Layout() {
  const [open, setOpen] = useState(false)
  return (
    <>
      {/* Site-wide animated background: still photo + live gold-dust canvas,
          with gradient veils for readability. Fixed behind all content. */}
      <div className="bg-fx" aria-hidden="true">
        <div className="bg-fx-img" />
        <BackgroundFX />
        <div className="bg-fx-veil" />
      </div>
      <header className="site">
        <div className="nav-inner">
          <Link className="brand" to="/" onClick={() => setOpen(false)}>
            <img src={ASSETS.logo} alt={`${BRAND.name} logo`} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <span>
              AURENIX <span className="gold">AI</span>
            </span>
          </Link>
          <button className="nav-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle navigation">
            {open ? 'Close menu' : 'Menu'}
          </button>
          <nav className={`nav-links${open ? ' open' : ''}`}>
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} onClick={() => setOpen(false)}>
                {n.label}
              </NavLink>
            ))}
            {NAV_MORE.map((n) => (
              <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)} className="nav-more">
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main>
        <div className="wrap">
          <Outlet />
        </div>
      </main>
      <footer className="site">
        <div className="wrap">
          <div className="cols">
            <div>
              <h4>{BRAND.name}</h4>
              <p>{BRAND.tagline}</p>
              <p className="small">{BRAND.subtitle}</p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><Link to="/missions">Mission Hub</Link></li>
                <li><Link to="/nft-collection">NFT Collection</Link></li>
                <li><Link to="/tokenomics">Tokenomics</Link></li>
                <li><Link to="/arena">AURENIX Arena</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4>Project</h4>
              <ul>
                <li><Link to="/roadmap">Roadmap</Link></li>
                <li><Link to="/docs">Documentation</Link></li>
                <li><Link to="/security">Security</Link></li>
                <li><Link to="/community">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li><Link to="/terms">Terms and Privacy</Link></li>
                <li><Link to="/about">About</Link></li>
                <li>
                  <a href={BRAND.marketplaceExternal} target="_blank" rel="noreferrer">
                    {BRAND.marketplaceName} (external)
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="disclaimer">
            <p>
              {BRAND.identityNote} This is a Phase 1 MVP demo site. No token has been
              launched, no NFT has been minted, and no funds are accepted here. Nothing on
              this site is financial advice, and no return, price, or listing is promised.
            </p>
            <p className="small">
              Chain: {BRAND.chain}. Token: {BRAND.token} (proposed). NFT supply:{' '}
              {BRAND.nftSupply.toLocaleString()} (proposed). Mint price:{' '}
              {BRAND.mintPriceBnb} BNB (proposed).
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export function PageHead({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <section className="page-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
    </section>
  )
}

export function DemoNote({ children }: { children?: ReactNode }) {
  return (
    <div className="callout demo">
      <p>
        <strong>Demo data — stored locally in your browser.</strong>{' '}
        {children ??
          'Nothing on this page is a real user, transaction, sponsor, or payout. Data you create here never leaves your device.'}
      </p>
    </div>
  )
}

export function ProposedNote({ children }: { children?: ReactNode }) {
  return (
    <div className="callout">
      <p>
        <strong>PROPOSED — not deployed terms.</strong>{' '}
        {children ??
          'These figures come from the project plan and describe what is proposed, not what exists today.'}
      </p>
    </div>
  )
}
