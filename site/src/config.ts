// Brand config — single source of truth for the brand.
// Renamed from MINT2EARN AI to AURENIX on 2026-11-24 (name check found an
// existing crypto project using the old name). Rename here and the whole
// site follows.
export const BRAND = {
  name: 'AURENIX',
  identityNote:
    'AURENIX is the AI-powered NFT membership and digital work economy on BNB Smart Chain.',
  tagline: 'Work. Build. Earn.',
  subtitle: 'The AI-powered NFT membership and digital work economy.',
  token: 'AUNX',
  tokenName: 'Aurenix Token',
  chain: 'BNB Smart Chain (56)',
  chainId: 56,
  nftSupply: 2222,
  nftCommunityGenesis: 222,
  nftPublicMint: 1800,
  nftTreasuryReserve: 200,
  mintPriceBnb: '0.001',
  tokenSupply: 100_000_000,
  tokenSupplyDisplay: '100,000,000',
  marketplaceExternal: 'https://element.market',
  marketplaceName: 'Element Market',
} as const

export const asset = (p: string) => `${import.meta.env.BASE_URL}assets/${p}`

export const ASSETS = {
  logo: asset('logo.png'),
  hero: asset('hero.png'),
  nftBronze: asset('nft-bronze.png'),
  nftSilver: asset('nft-silver.png'),
  nftGold: asset('nft-gold.png'),
  nftElite: asset('nft-elite.png'),
  ogBanner: asset('og-banner.png'),
} as const
