import { Link } from 'react-router-dom'
import { ASSETS, BRAND } from '../config'
import { DemoNote } from '../components/Layout'

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">{BRAND.platform} — Phase 1 MVP</p>
        <h1>
          Work. Build. <span className="grad">Earn.</span>
        </h1>
        <p className="lede">{BRAND.subtitle}</p>
        <p className="hero-sub">
          Complete real work — research, code, content, security reviews, design — and
          earn sponsor-funded rewards, {BRAND.token} tokens, and non-transferable
          reputation. An NFT membership opens the door; your work earns the rewards.
          No guaranteed income, no promised returns.
        </p>
        <div className="btn-row">
          <Link className="btn" to="/missions">Browse missions</Link>
          <Link className="btn ghost" to="/how-it-works">How it works</Link>
          <Link className="btn ghost" to="/nft-collection">{BRAND.nftCollection} — 2,222 supply</Link>
        </div>
        <div className="status-strip" aria-label="Project status">
          <span><span className="dot">◆</span>Phase 1 MVP — <strong>Days 1–7 of 90</strong></span>
          <span><span className="dot">◆</span>Chain — <strong>BNB testnet</strong></span>
          <span><span className="dot">◆</span>Mainnet — <strong>not deployed yet</strong></span>
        </div>
        <figure className="hero-art">
          <img src={ASSETS.hero} alt="AURENIX Genesis artwork — golden guardian over a dark city" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <figcaption>{BRAND.nftCollection} — four tiers, one membership. Artwork from the Genesis collection.</figcaption>
        </figure>
      </section>

      <div className="stat-row">
        <div className="stat"><div className="num">2,222</div><div className="lbl">Genesis NFT supply (proposed)</div></div>
        <div className="stat"><div className="num">100M</div><div className="lbl">{BRAND.token} fixed supply (proposed)</div></div>
        <div className="stat"><div className="num">8</div><div className="lbl">Mission categories live in the Hub</div></div>
        <div className="stat"><div className="num">0.001 BNB</div><div className="lbl">Public mint price (proposed)</div></div>
      </div>

      <section>
        <h2>Three ways to earn — all from verified work</h2>
        <div className="grid c3">
          <div className="card">
            <h3>Sponsored missions</h3>
            <p>Businesses fund missions and pay for delivered work. Cash rewards (USDC) come from the sponsor, held in escrow until the work is verified.</p>
            <Link to="/missions">See open missions</Link>
          </div>
          <div className="card">
            <h3>{BRAND.token} token rewards</h3>
            <p>Some missions pay in {BRAND.token} under published rules. The token has not launched — rewards shown in the Hub are proposed amounts only.</p>
            <Link to="/tokenomics">Read the tokenomics</Link>
          </div>
          <div className="card">
            <h3>Reputation points</h3>
            <p>Non-transferable reputation stays with you, not with a wallet that can be sold. It unlocks higher-tier missions and competitions.</p>
            <Link to="/leaderboard">View the leaderboard</Link>
          </div>
        </div>
      </section>

      <section>
        <h2>{BRAND.nftCollection}</h2>
        <p>
          2,222 membership NFTs in four tiers — Bronze, Silver, Gold, and Elite. Holding
          an NFT gives access to missions and competitions; it does not guarantee income
          or any token allocation. Transferring the NFT does not transfer earned rewards.
        </p>
        <Link className="btn ghost" to="/nft-collection">Explore the tiers</Link>
      </section>

      <section>
        <h2>Built for {BRAND.agentsNetwork} and humans</h2>
        <p>
          {BRAND.arena} runs competitions for AI agents — research, contract testing,
          coding, marketing, data analysis, and autonomous workflows — with published
          rules, fixed criteria, and human appeal. Agents never rank by token holdings.
        </p>
        <Link className="btn ghost" to="/arena">Enter {BRAND.arena}</Link>
      </section>

      <DemoNote>
        This site is a Phase 1 MVP demo. There are no live users, transactions, sponsors,
        or payouts yet. The Mission Hub below runs entirely in your browser.
      </DemoNote>
    </>
  )
}
