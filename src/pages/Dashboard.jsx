import { Link } from 'react-router-dom'
import {
	BookOpen, Map, CheckCircle2, TrendingUp,
	AlertTriangle, Target, ArrowRight, Zap, Shield
} from 'lucide-react'
import CountdownTimer from '../components/CountdownTimer'
import ProgressRing from '../components/ProgressRing'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { defaultMilestones } from '../data/milestones'

export default function Dashboard() {
	const [milestones] = useLocalStorage('philo-milestones', defaultMilestones)
	const [quizResults] = useLocalStorage('philo-quiz', {})

	const totalTasks = milestones.reduce((sum, m) => sum + m.tasks.length, 0)
	const completedTasks = milestones.reduce(
		(sum, m) => sum + m.tasks.filter(t => t.done).length, 0
	)
	const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

	// Déterminer le focus actuel (premier jalon incomplet)
	const currentMilestone = milestones.find(
		m => m.tasks.some(t => !t.done)
	)

	// Calcul du risque basé sur la progression attendue vs réelle
	const now = new Date()
	const start = new Date('2026-02-26')
	const end = new Date('2026-03-12') // Objectif : 2 semaines
	const totalDays = (end - start) / (1000 * 60 * 60 * 24)
	const elapsed = Math.max(0, (now - start) / (1000 * 60 * 60 * 24))
	const expectedProgress = (elapsed / totalDays) * 100
	const progressDelta = progressPercent - expectedProgress

	let riskLevel, riskColor, riskIcon, riskMessage
	if (progressDelta >= 0) {
		riskLevel = 'En Bonne Voie'
		riskColor = 'text-success-400'
		riskIcon = <Shield className="w-5 h-5 text-success-400" />
		riskMessage = "Vous êtes en avance. Gardez le rythme !"
	} else if (progressDelta >= -15) {
		riskLevel = 'Risque Léger'
		riskColor = 'text-warning-400'
		riskIcon = <AlertTriangle className="w-5 h-5 text-warning-400" />
		riskMessage = "Légèrement en retard. Il est temps de rattraper !"
	} else {
		riskLevel = 'Risque Élevé'
		riskColor = 'text-danger-400'
		riskIcon = <AlertTriangle className="w-5 h-5 text-danger-400" />
		riskMessage = "Très en retard. Concentrez-vous sur l'essentiel !"
	}

	const statCards = [
		{
			label: 'Jalons',
			value: `${milestones.filter(m => m.tasks.every(t => t.done)).length}/${milestones.length}`,
			sublabel: 'complétés',
			icon: <Target className="w-5 h-5" />,
			color: 'text-accent-400',
			bgColor: 'bg-accent-600/15',
		},
		{
			label: 'Tâches Faites',
			value: `${completedTasks}/${totalTasks}`,
			sublabel: 'tâches',
			icon: <CheckCircle2 className="w-5 h-5" />,
			color: 'text-success-400',
			bgColor: 'bg-success-500/15',
		},
		{
			label: 'Niveau de Risque',
			value: riskLevel,
			sublabel: riskMessage,
			icon: riskIcon,
			color: riskColor,
			bgColor: progressDelta >= 0 ? 'bg-success-500/15' : progressDelta >= -15 ? 'bg-warning-400/15' : 'bg-danger-400/15',
		},
	]

	const ctaCards = [
		{
			to: '/learn',
			icon: <BookOpen className="w-6 h-6" />,
			title: 'Apprendre les Concepts',
			description: 'Comprendre l\'interblocage, la famine, les mutex, les sémaphores et le timing.',
			color: 'from-accent-600/20 to-accent-700/10',
			borderColor: 'border-accent-600/30',
			iconBg: 'bg-accent-600/20',
			iconColor: 'text-accent-400',
		},
		{
			to: '/roadmap',
			icon: <Map className="w-6 h-6" />,
			title: 'Feuille de Route',
			description: 'Suivez le plan en 2 semaines. Jalons, tâches et pièges à éviter.',
			color: 'from-success-500/20 to-success-600/10',
			borderColor: 'border-success-500/30',
			iconBg: 'bg-success-500/20',
			iconColor: 'text-success-400',
		},
		{
			to: '/quiz',
			icon: <Zap className="w-6 h-6" />,
			title: 'Auto-Évaluation',
			description: 'Testez votre compréhension avec des quiz sur les concepts clés.',
			color: 'from-warning-400/20 to-warning-500/10',
			borderColor: 'border-warning-400/30',
			iconBg: 'bg-warning-400/20',
			iconColor: 'text-warning-400',
		},
	]

	return (
		<div className="space-y-6">
			{/* Compte à rebours */}
			<section className="glass rounded-2xl p-6 glow-blue">
				<CountdownTimer />
			</section>

			{/* Statistiques */}
			<section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				{statCards.map((card, i) => (
					<div key={i} className="glass rounded-xl p-4 card-hover" style={{ animationDelay: `${i * 100}ms` }}>
						<div className="flex items-center gap-3 mb-3">
							<div className={`w-10 h-10 rounded-xl ${card.bgColor} flex items-center justify-center ${card.color}`}>
								{card.icon}
							</div>
							<span className="text-xs text-dark-400 font-medium uppercase tracking-wider">{card.label}</span>
						</div>
						<p className={`text-2xl font-bold ${card.color} mb-1`}>{card.value}</p>
						<p className="text-xs text-dark-400">{card.sublabel}</p>
					</div>
				))}
			</section>

			{/* Progression + Focus */}
			<section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{/* Anneau de progression */}
				<div className="glass rounded-xl p-6 flex items-center justify-center">
					<ProgressRing
						progress={progressPercent}
						size={140}
						strokeWidth={10}
						color={progressPercent < 30 ? '#ef4444' : progressPercent < 70 ? '#eab308' : '#22c55e'}
						label="Progression Globale"
						sublabel={`${completedTasks} tâches`}
					/>
				</div>

				{/* Focus du jour */}
				<div className="glass rounded-xl p-6">
					<div className="flex items-center gap-2 mb-4">
						<TrendingUp className="w-5 h-5 text-accent-400" />
						<h2 className="text-sm font-semibold text-dark-100">Focus Actuel</h2>
					</div>
					{currentMilestone ? (
						<div>
							<p className="text-lg font-semibold text-dark-100 mb-1">{currentMilestone.title}</p>
							<p className="text-sm text-dark-400 mb-3">{currentMilestone.days}</p>
							<div className="space-y-1.5">
								{currentMilestone.tasks.filter(t => !t.done).slice(0, 3).map(task => (
									<div key={task.id} className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-1.5 flex-shrink-0" />
										<span className="text-sm text-dark-300">{task.text}</span>
									</div>
								))}
								{currentMilestone.tasks.filter(t => !t.done).length > 3 && (
									<p className="text-xs text-dark-500 ml-3.5">
										+{currentMilestone.tasks.filter(t => !t.done).length - 3} tâches restantes
									</p>
								)}
							</div>
							<Link
								to="/roadmap"
								className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-accent-400 hover:text-accent-300 transition-colors"
							>
								Voir la feuille de route <ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</div>
					) : (
						<div className="text-center py-6">
							<CheckCircle2 className="w-12 h-12 text-success-400 mx-auto mb-2" />
							<p className="text-sm font-semibold text-success-400">Tous les jalons sont terminés !</p>
							<p className="text-xs text-dark-400 mt-1">Il est temps de pousser et de préparer la correction.</p>
						</div>
					)}
				</div>
			</section>

			{/* Cartes CTA */}
			<section className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{ctaCards.map((card, i) => (
					<Link
						key={i}
						to={card.to}
						className={`glass rounded-xl p-5 card-hover group bg-gradient-to-br ${card.color} border ${card.borderColor}`}
					>
						<div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center ${card.iconColor} mb-4
              group-hover:scale-110 transition-transform duration-300`}>
							{card.icon}
						</div>
						<h3 className="text-base font-semibold text-dark-100 mb-1 group-hover:text-white transition-colors">
							{card.title}
						</h3>
						<p className="text-xs text-dark-400 leading-relaxed">{card.description}</p>
						<div className="flex items-center gap-1 mt-3 text-xs font-medium text-dark-400 group-hover:text-dark-200 transition-colors">
							Ouvrir <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
						</div>
					</Link>
				))}
			</section>
		</div>
	)
}
