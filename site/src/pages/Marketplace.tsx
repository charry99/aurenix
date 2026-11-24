import { BRAND } from '../config'
import { PageHead, ProposedNote } from '../components/Layout'

const FEES = [
  { item: 'NFT marketplace', fee: '2%', note: 'Applies to Genesis NFT sales on the integrated marketplace.' },
  { item: 'Digital product', fee: '5%', note: 'Templates, tools, research reports, design packs.' },
  { item: 'Sponsor mission', fee: '5%', note: 'Platform fee on sponsor-funded mission budgets.' },
  { item: 'Premium service', fee: 'Fixed published price', note: 'Developer services and enterprise work, priced per engagement.' },
]

const LISTINGS = [
  'Genesis NFTs',
  'AI agent licenses',
  'Templates',
  'Smart contract tools',
  'Research reports',
  'Design packs',
  'Developer services',
  'Mission products',
]

export default function Marketplace() {
  return (
    <>
      <PageHead
        eyebrow="Marketplace"
        title="Trade where the liquidity already is"
        lede="Version 1 integrates with established NFT marketplaces instead of building a proprietary one before demand is proven."
      />
      <ProposedNote>
        The fee schedule below is a proposed setting from the project plan — not
        deployed terms. No marketplace of ours exists yet, and no items are listed.
      </ProposedNote>

      <section>
        <h2>Buy and sell NFTs on {BRAND.marketplaceName}</h2>
        <p>
          Genesis NFTs will trade on {BRAND.marketplaceName}, an established NFT
          marketplace supporting BNB Smart Chain. We integrate where the buyers already
          are, rather than asking users to trust a brand-new marketplace with no
          liquidity. A proprietary marketplace comes only after demand is validated.
        </p>
        <div className="btn-row">
          <a className="btn" href={BRAND.marketplaceExternal} target="_blank" rel="noreferrer">
            Open {BRAND.marketplaceName} (external site)
          </a>
          <a className="btn ghost" href={`${BRAND.marketplaceExternal}/`} target="_blank" rel="noreferrer">
            Browse BSC NFTs on {BRAND.marketplaceName}
          </a>
        </div>
        <p className="small muted" style={{ marginTop: 12 }}>
          External link — {BRAND.marketplaceName} is a third-party service. Check the
          contract address and collection details there before any purchase. The Genesis
          collection has not launched, so no official collection exists there yet.
        </p>
      </section>

      <section>
        <h2>Proposed fee schedule</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Item</th><th>Fee</th><th>Note</th></tr>
            </thead>
            <tbody>
              {FEES.map((f) => (
                <tr key={f.item}>
                  <td><strong>{f.item}</strong></td>
                  <td>{f.fee}</td>
                  <td>{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small muted">All fees labelled PROPOSED. Final fees are published before any marketplace activity begins.</p>
      </section>

      <section>
        <h2>What the marketplace will carry (planned)</h2>
        <div className="grid c4">
          {LISTINGS.map((l) => (
            <div className="card" key={l}>
              <span className="badge dim">Planned</span>
              <h3>{l}</h3>
            </div>
          ))}
        </div>
        <p className="small muted">No items are listed today. This is the planned catalogue, not an inventory.</p>
      </section>
    </>
  )
}
