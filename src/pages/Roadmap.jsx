import { useLocalStorage } from '../hooks/useLocalStorage'
import { defaultMilestones } from '../data/milestones'
import MilestoneCard from '../components/MilestoneCard'
import ProgressRing from '../components/ProgressRing'
import { RotateCcw, Calendar } from 'lucide-react'

export default function Roadmap() {
	const [milestones, setMilestones] = useLocalStorage('philo-milestones', defaultMilestones)

	const totalTasks = milestones.reduce((sum, m) => sum + m.tasks.length, 0)
	const completedTasks = milestones.reduce(
		(sum, m) => sum + m.tasks.filter(t => t.done).length, 0
	)
	const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

	const handleToggleTask = (milestoneId, taskId) => {
		setMilestones(prev =>
			prev.map(m =>
				m.id === milestoneId
					? {
						...m,
						tasks: m.tasks.map(t =>
							t.id === taskId ? { ...t, done: !t.done } : t
						),
					}
					: m
			)
		)
	}

	const handleReset = () => {
		if (window.confirm('Réinitialiser toute la progression ? Cette action est irréversible.')) {
			setMilestones(defaultMilestones)
		}
	}

	// Calcul de la semaine actuelle (plan de 2 semaines)
	const now = new Date()
	const start = new Date('2026-02-26')
	const elapsed = Math.max(0, (now - start) / (1000 * 60 * 60 * 24))
	const currentDay = Math.floor(elapsed)

	// Déterminer quel jalon est actuel basé sur les jours
	let currentMilestoneIndex = 0
	if (currentDay >= 11) currentMilestoneIndex = 5
	else if (currentDay >= 8) currentMilestoneIndex = 4
	else if (currentDay >= 6) currentMilestoneIndex = 3
	else if (currentDay >= 4) currentMilestoneIndex = 2
	else if (currentDay >= 3) currentMilestoneIndex = 1
	else currentMilestoneIndex = 0

	return (
		<div className="space-y-6">
			{/* En-tête */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold gradient-text mb-2">Feuille de Route</h2>
					<p className="text-sm text-dark-400">
						Plan intensif de 2 semaines. Cochez les tâches au fur et à mesure. Objectif : finir en 14 jours max !
					</p>
				</div>
				<button
					onClick={handleReset}
					className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium
            bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-dark-100 transition-colors self-start"
				>
					<RotateCcw className="w-3.5 h-3.5" />
					Réinitialiser
				</button>
			</div>

			{/* Barre d'aperçu */}
			<div className="glass rounded-xl p-5 flex flex-col sm:flex-row items-center gap-6">
				<ProgressRing
					progress={progressPercent}
					size={100}
					strokeWidth={8}
					color={progressPercent < 30 ? '#ef4444' : progressPercent < 70 ? '#eab308' : '#22c55e'}
					sublabel={`${completedTasks}/${totalTasks}`}
				/>
				<div className="flex-1 grid grid-cols-3 gap-4 text-center sm:text-left">
					<div>
						<p className="text-2xl font-bold text-dark-100">{milestones.filter(m => m.tasks.every(t => t.done)).length}</p>
						<p className="text-xs text-dark-400">Étapes Faites</p>
					</div>
					<div>
						<p className="text-2xl font-bold text-dark-100">{completedTasks}</p>
						<p className="text-xs text-dark-400">Tâches Faites</p>
					</div>
					<div>
						<p className="text-2xl font-bold text-dark-100">{totalTasks - completedTasks}</p>
						<p className="text-xs text-dark-400">Restantes</p>
					</div>
				</div>
			</div>

			{/* Timeline */}
			<div className="relative space-y-4 pl-8">
				<div className="timeline-line" />
				{milestones.map((milestone, index) => (
					<div key={milestone.id} className="relative animate-slide-up" style={{ animationDelay: `${index * 80}ms` }}>
						<div className={`timeline-dot ${milestone.tasks.every(t => t.done)
								? 'completed'
								: index === currentMilestoneIndex
									? 'border-warning-400 bg-warning-400/30'
									: ''
							}`}
							style={{ top: '20px' }}
						/>
						<div className="ml-8">
							{index === currentMilestoneIndex && (
								<div className="flex items-center gap-1.5 mb-2">
									<Calendar className="w-3.5 h-3.5 text-warning-400" />
									<span className="text-xs font-semibold text-warning-400 uppercase tracking-wider">Étape Actuelle</span>
								</div>
							)}
							<MilestoneCard
								milestone={milestone}
								onToggleTask={handleToggleTask}
								weekIndex={index}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
