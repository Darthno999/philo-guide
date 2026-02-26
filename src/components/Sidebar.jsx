import { NavLink } from 'react-router-dom'
import {
	LayoutDashboard,
	BookOpen,
	Map,
	CheckCircle2,
	FileText,
	X,
	Utensils,
} from 'lucide-react'

const navItems = [
	{ to: '/', icon: LayoutDashboard, label: 'Tableau de Bord' },
	{ to: '/learn', icon: BookOpen, label: 'Apprendre' },
	{ to: '/roadmap', icon: Map, label: 'Feuille de Route' },
	{ to: '/quiz', icon: CheckCircle2, label: 'Auto-Évaluation' },
	{ to: '/notes', icon: FileText, label: 'Notes & Debug' },
]

export default function Sidebar({ isOpen, onClose }) {
	return (
		<aside
			className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 glass flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
		>
			{/* En-tête */}
			<div className="h-16 flex items-center justify-between px-5 border-b border-dark-700/50">
				<div className="flex items-center gap-2.5">
					<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center">
						<Utensils className="w-4 h-4 text-white" />
					</div>
					<div>
						<h2 className="text-sm font-bold text-dark-100">Philo Guide</h2>
						<p className="text-[10px] text-dark-400 font-medium">Compagnon de Projet 42</p>
					</div>
				</div>
				<button
					onClick={onClose}
					className="lg:hidden p-1.5 rounded-lg hover:bg-dark-800 transition-colors"
					aria-label="Fermer le menu"
				>
					<X className="w-4 h-4" />
				</button>
			</div>

			{/* Navigation */}
			<nav className="flex-1 p-3 space-y-1" role="navigation" aria-label="Navigation principale">
				{navItems.map(({ to, icon: Icon, label }) => (
					<NavLink
						key={to}
						to={to}
						onClick={onClose}
						className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${isActive
								? 'bg-accent-600/20 text-accent-400 shadow-sm'
								: 'text-dark-300 hover:text-dark-100 hover:bg-dark-800/60'
							}
            `}
					>
						<Icon className="w-[18px] h-[18px] flex-shrink-0" />
						<span>{label}</span>
					</NavLink>
				))}
			</nav>

			{/* Pied de page */}
			<div className="p-4 border-t border-dark-700/50">
				<div className="glass-light rounded-lg p-3">
					<p className="text-[11px] text-dark-400 font-medium mb-1">Rappel</p>
					<p className="text-[11px] text-dark-300 leading-relaxed">
						Ce guide enseigne les concepts — votre implémentation doit être votre propre travail.
					</p>
				</div>
			</div>
		</aside>
	)
}
