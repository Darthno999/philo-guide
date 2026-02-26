import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Menu, X } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { defaultMilestones } from '../data/milestones'

export default function Layout({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const location = useLocation()
	const [milestones] = useLocalStorage('philo-milestones', defaultMilestones)

	// Calculer la progression globale
	const totalTasks = milestones.reduce((sum, m) => sum + m.tasks.length, 0)
	const completedTasks = milestones.reduce(
		(sum, m) => sum + m.tasks.filter(t => t.done).length, 0
	)
	const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

	const getPageTitle = () => {
		switch (location.pathname) {
			case '/': return 'Tableau de Bord'
			case '/learn': return 'Apprendre'
			case '/roadmap': return 'Feuille de Route'
			case '/quiz': return 'Auto-Évaluation'
			case '/notes': return 'Notes & Debug'
			default: return 'Philo Guide'
		}
	}

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Overlay mobile */}
			{sidebarOpen && (
				<div
					className="sidebar-overlay lg:hidden"
					onClick={() => setSidebarOpen(false)}
					aria-hidden="true"
				/>
			)}

			{/* Barre latérale */}
			<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

			{/* Contenu principal */}
			<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
				{/* Barre supérieure */}
				<header className="h-16 glass flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-30">
					<div className="flex items-center gap-3">
						<button
							onClick={() => setSidebarOpen(true)}
							className="lg:hidden p-2 rounded-lg hover:bg-dark-800 transition-colors"
							aria-label="Ouvrir le menu"
						>
							<Menu className="w-5 h-5" />
						</button>
						<h1 className="text-lg font-semibold text-dark-100">{getPageTitle()}</h1>
					</div>

					{/* Barre de progression */}
					<div className="hidden sm:flex items-center gap-3">
						<span className="text-xs text-dark-400 font-medium">Progression Globale</span>
						<div className="w-32 h-2 bg-dark-800 rounded-full overflow-hidden">
							<div
								className="h-full rounded-full transition-all duration-700 ease-out"
								style={{
									width: `${progressPercent}%`,
									background: progressPercent < 30
										? 'linear-gradient(90deg, #ef4444, #f87171)'
										: progressPercent < 70
											? 'linear-gradient(90deg, #eab308, #facc15)'
											: 'linear-gradient(90deg, #22c55e, #4ade80)'
								}}
							/>
						</div>
						<span className="text-xs font-mono text-dark-300">{progressPercent}%</span>
					</div>
				</header>

				{/* Contenu de la page */}
				<main className="flex-1 overflow-y-auto p-4 lg:p-6">
					<div className="max-w-6xl mx-auto animate-fade-in">
						{children}
					</div>
				</main>
			</div>
		</div>
	)
}
