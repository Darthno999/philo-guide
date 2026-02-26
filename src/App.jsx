import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Learn from './pages/Learn'
import Roadmap from './pages/Roadmap'
import Quiz from './pages/Quiz'
import Notes from './pages/Notes'

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/learn" element={<Learn />} />
					<Route path="/roadmap" element={<Roadmap />} />
					<Route path="/quiz" element={<Quiz />} />
					<Route path="/notes" element={<Notes />} />
				</Routes>
			</Layout>
		</Router>
	)
}

export default App
