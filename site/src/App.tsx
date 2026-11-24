import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import NftCollection from './pages/NftCollection'
import Tokenomics from './pages/Tokenomics'
import MissionHub from './pages/MissionHub'
import Arena from './pages/Arena'
import Marketplace from './pages/Marketplace'
import Leaderboard from './pages/Leaderboard'
import Roadmap from './pages/Roadmap'
import Docs from './pages/Docs'
import Security from './pages/Security'
import Community from './pages/Community'
import Terms from './pages/Terms'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/nft-collection" element={<NftCollection />} />
          <Route path="/tokenomics" element={<Tokenomics />} />
          <Route path="/missions" element={<MissionHub />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/security" element={<Security />} />
          <Route path="/community" element={<Community />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
