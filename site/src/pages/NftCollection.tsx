import { ASSETS, BRAND } from '../config'
import { PageHead, ProposedNote } from '../components/Layout'

const TIERS = [
  { img: ASSETS.nftBronze, name: 'Bronze', tag: 'Genesis', desc: 'Standard missions and community access. The entry tier for contributors.', perks: ['Standard missions', 'Community access', 'Reputation tracking'] },
  { img: ASSETS.nftSilver, name: 'Silver', tag: 'Advanced', desc: 'Advanced missions plus additional tools for serious contributors.', perks: ['Advanced missions', 'Additional tools', 'Priority mission alerts'] },
  { img: ASSETS.nftGold, name: 'Gold', tag: 'Professional', desc: 'Professional tier with advanced competitions and higher-reward missions.', perks: ['Advanced competitions', 'Higher-reward missions', 'Sponsor introductions'] },
  { img: ASSETS.nftElite, name: 'Elite', tag: 'Legendary', desc: 'Exclusive missions and governance participation. The rarest tier.', perks: ['Exclusive missions', 'Governance participation', 'Rarest traits'] },
]

export default function NftCollection() {
  return (
    <>
      <PageHead
        eyebrow="NFT Collection"
        title={`${BRAND.nftCollection} — 2,222 NFTs`}
        lede="Four tiers. One membership. Work earns the rewards — holding does not."
      />
      <ProposedNote>
        The {BRAND.nftCollection} collection has not been deployed or minted. Supply split, tiers,
        and price below are the proposed figures from the project plan.
      </ProposedNote>

      <div className="stat-row">
        <div className="stat"><div className="num">222</div><div className="lbl">Community Genesis (free, proposed)</div></div>
        <div className="stat"><div className="num">1,800</div><div className="lbl">Public mint (proposed)</div></div>
        <div className="stat"><div className="num">200</div><div className="lbl">Treasury reserve (proposed)</div></div>
        <div className="stat"><div className="num">0.001 BNB</div><div className="lbl">Public mint price (proposed)</div></div>
      </div>

      <section>
        <div className="grid c4">
          {TIERS.map((t) => (
            <div className="card" key={t.name}>
              <img className="tier-img" src={t.img} alt={`${t.name} tier NFT artwork`} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <span className="badge">{t.tag}</span>
              <h3>{t.name}</h3>
              <p>{t.desc}</p>
              <ul className="clean small">
                {t.perks.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Rules of the collection</h2>
        <ul className="clean">
          <li>Each NFT has a unique token ID and verifiable metadata with published rarity traits.</li>
          <li>Ownership is checked on-chain; the NFT is the membership pass.</li>
          <li>Reputation earned through work is non-transferable and stays with the contributor — transferring the NFT does not transfer earned rewards.</li>
          <li>Holding an NFT guarantees no income and no token allocation.</li>
          <li>Artwork is distinct per tier with verifiable metadata (artwork files are referenced from <code>/assets/</code> in this demo).</li>
        </ul>
      </section>

      <section>
        <h2>Trading</h2>
        <p>
          Version 1 integrates with established NFT marketplaces rather than building a
          proprietary one. See the <a href="#/marketplace">AURENIX Market</a> page for the
          proposed fee schedule and the external marketplace link.
        </p>
      </section>
    </>
  )
}
