import { BRAND } from '../config'
import { PageHead } from '../components/Layout'

export default function Terms() {
  return (
    <>
      <PageHead
        eyebrow="Terms and Privacy"
        title="Terms of use and privacy"
        lede="Plain-language terms for this Phase 1 MVP demo site. A full legal review is still required before any public launch."
      />
      <section>
        <h2>1. What this site is</h2>
        <p>
          {BRAND.name} is a project in Phase 1 (MVP). This website is a
          demonstration. No token has launched, no NFT has been minted, no mission
          has a real sponsor, and no funds are accepted here.
        </p>
      </section>
      <section>
        <h2>2. No financial advice, no promises</h2>
        <p>
          Nothing on this site is financial advice, investment advice, or a promise of
          income, price, listing, or return. Figures labelled “proposed” describe a
          plan, not a commitment. The hypothetical revenue scenario in the project plan
          is an illustration, not a forecast.
        </p>
      </section>
      <section>
        <h2>3. Demo data</h2>
        <p>
          Missions, submissions, and reputation shown in the Mission Hub, Dashboard,
          Leaderboard, and Admin Dashboard are demo data stored locally in your browser
          (localStorage). They are not real users, transactions, sponsors, or payouts,
          and they never leave your device. Clearing your browser data removes them.
        </p>
      </section>
      <section>
        <h2>4. No wallet, no signing</h2>
        <p>
          This MVP does not connect to any wallet and does not ask you to sign anything.
          Any future wallet connection will be clearly disclosed before it is offered.
        </p>
      </section>
      <section>
        <h2>5. NFT and token terms (proposed)</h2>
        <p>
          The Genesis NFT (2,222 supply, 0.001 BNB public mint price, proposed) is a
          membership pass. Holding it guarantees no income and no token allocation.
          Reputation is non-transferable; transferring an NFT does not transfer earned
          rewards. The {BRAND.token} token (100,000,000 fixed supply, proposed) has not
          launched and is subject to legal review, audit, and approvals before any
          distribution.
        </p>
      </section>
      <section>
        <h2>6. Acceptable use</h2>
        <p>
          Do not submit plagiarised work, false evidence, or someone else’s content as
          your own. Do not attempt to manipulate rankings, impersonate others, or abuse
          the demo forms. Submissions in this demo are stored only in your own browser.
        </p>
      </section>
      <section>
        <h2>7. Privacy</h2>
        <p>
          This demo site collects no personal data, sets no tracking cookies, and sends
          nothing to a server — there is no server. Data you enter in the Mission Hub
          forms stays in your browser’s localStorage. If community channels or accounts
          are added later, this policy will be updated before they collect anything.
        </p>
      </section>
      <section>
        <h2>8. Legal</h2>
        <p>
          The operator is based in India. Before accepting public funds or distributing
          a tradable token, the project must complete legal review covering virtual
          digital assets, tax, FIU-IND registration and AML/KYC, advertising and
          consumer protection, and cross-border payments. These terms are not a
          substitute for that review.
        </p>
      </section>
      <section>
        <h2>9. Changes</h2>
        <p>
          These terms will change as the project moves from MVP to beta to launch. The
          version on this page is the one that applies to the demo.
        </p>
      </section>
    </>
  )
}
