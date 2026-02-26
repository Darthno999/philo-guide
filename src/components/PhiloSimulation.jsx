import { useState, useCallback } from 'react'
import { RotateCcw, Play, Pause, Info } from 'lucide-react'

const NUM_PHILOSOPHERS = 5

// Position helpers for circular layout
function getPosition(index, total, radius, centerX, centerY) {
	const angle = (index * 2 * Math.PI / total) - Math.PI / 2
	return {
		x: centerX + radius * Math.cos(angle),
		y: centerY + radius * Math.sin(angle),
	}
}

function getForkPosition(index, total, radius, centerX, centerY) {
	const angle = ((index + 0.5) * 2 * Math.PI / total) - Math.PI / 2
	return {
		x: centerX + radius * Math.cos(angle),
		y: centerY + radius * Math.sin(angle),
	}
}

const STATES = {
	THINKING: 'thinking',
	EATING: 'eating',
	WAITING: 'waiting',
	DEAD: 'dead',
}

const STATE_LABELS = {
	[STATES.THINKING]: '💭',
	[STATES.EATING]: '🍝',
	[STATES.WAITING]: '⏳',
	[STATES.DEAD]: '💀',
}

const STATE_NAMES = {
	[STATES.THINKING]: 'pense',
	[STATES.EATING]: 'mange',
	[STATES.WAITING]: 'attend',
	[STATES.DEAD]: 'mort',
}

export default function PhiloSimulation() {
	const [philosophers, setPhilosophers] = useState(
		Array.from({ length: NUM_PHILOSOPHERS }, (_, i) => ({
			id: i,
			state: STATES.THINKING,
			leftFork: false,
			rightFork: false,
		}))
	)
	const [forks, setForks] = useState(
		Array.from({ length: NUM_PHILOSOPHERS }, (_, i) => ({
			id: i,
			heldBy: null,
		}))
	)
	const [message, setMessage] = useState('Cliquez sur un philosophe pour essayer de prendre des fourchettes !')
	const [deadlockDetected, setDeadlockDetected] = useState(false)

	const reset = useCallback(() => {
		setPhilosophers(Array.from({ length: NUM_PHILOSOPHERS }, (_, i) => ({
			id: i,
			state: STATES.THINKING,
			leftFork: false,
			rightFork: false,
		})))
		setForks(Array.from({ length: NUM_PHILOSOPHERS }, (_, i) => ({
			id: i,
			heldBy: null,
		})))
		setMessage('Cliquez sur un philosophe pour essayer de prendre des fourchettes !')
		setDeadlockDetected(false)
	}, [])

	const checkDeadlock = useCallback((newPhilos, newForks) => {
		const allWaiting = newPhilos.every(
			p => p.state === STATES.WAITING || p.state === STATES.DEAD
		)
		const anyWaiting = newPhilos.some(p => p.state === STATES.WAITING)
		if (allWaiting && anyWaiting) {
			setDeadlockDetected(true)
			setMessage('🔒 INTERBLOCAGE ! Tous les philosophes attendent — aucun ne peut avancer. Cliquez sur Réinitialiser pour essayer une autre stratégie.')
			return true
		}
		return false
	}, [])

	const handlePhilosopherClick = useCallback((philoId) => {
		if (deadlockDetected) return

		setPhilosophers(prev => {
			const newPhilos = prev.map(p => ({ ...p }))
			const philo = newPhilos[philoId]
			const leftForkId = philoId
			const rightForkId = (philoId + 1) % NUM_PHILOSOPHERS

			setForks(prevForks => {
				const newForks = prevForks.map(f => ({ ...f }))

				if (philo.state === STATES.EATING) {
					philo.state = STATES.THINKING
					philo.leftFork = false
					philo.rightFork = false
					newForks[leftForkId].heldBy = null
					newForks[rightForkId].heldBy = null
					setMessage(`Le Philosophe ${philoId} a fini de manger et a relâché les deux fourchettes.`)
				} else if (philo.state === STATES.THINKING) {
					if (newForks[leftForkId].heldBy === null) {
						newForks[leftForkId].heldBy = philoId
						philo.leftFork = true
						if (newForks[rightForkId].heldBy === null) {
							newForks[rightForkId].heldBy = philoId
							philo.rightFork = true
							philo.state = STATES.EATING
							setMessage(`Le Philosophe ${philoId} a obtenu les deux fourchettes et mange ! 🍝`)
						} else {
							philo.state = STATES.WAITING
							setMessage(`Le Philosophe ${philoId} a pris la fourchette gauche mais la droite est prise par le Philosophe ${newForks[rightForkId].heldBy}. En attente... ⏳`)
							setTimeout(() => checkDeadlock(newPhilos, newForks), 100)
						}
					} else {
						setMessage(`Le Philosophe ${philoId} ne peut pas prendre la fourchette gauche — tenue par le Philosophe ${newForks[leftForkId].heldBy}.`)
					}
				} else if (philo.state === STATES.WAITING) {
					if (newForks[rightForkId].heldBy === null) {
						newForks[rightForkId].heldBy = philoId
						philo.rightFork = true
						philo.state = STATES.EATING
						setMessage(`Le Philosophe ${philoId} a obtenu la fourchette droite et mange ! 🍝`)
					} else {
						setMessage(`Le Philosophe ${philoId} attend toujours la fourchette droite (tenue par le Philosophe ${newForks[rightForkId].heldBy}).`)
					}
				}

				return newForks
			})

			return newPhilos
		})
	}, [deadlockDetected, checkDeadlock])

	const simulateDeadlock = useCallback(() => {
		const newPhilos = Array.from({ length: NUM_PHILOSOPHERS }, (_, i) => ({
			id: i,
			state: STATES.WAITING,
			leftFork: true,
			rightFork: false,
		}))
		const newForks = Array.from({ length: NUM_PHILOSOPHERS }, (_, i) => ({
			id: i,
			heldBy: i,
		}))
		setPhilosophers(newPhilos)
		setForks(newForks)
		setDeadlockDetected(true)
		setMessage('🔒 INTERBLOCAGE ! Chaque philosophe a pris sa fourchette gauche simultanément. Chacun attend la fourchette droite — tenue par son voisin. Personne ne peut manger !')
	}, [])

	const center = 150
	const philoRadius = 110
	const forkRadius = 70

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between flex-wrap gap-2">
				<h3 className="text-lg font-semibold text-dark-100">Simulation Interactive des Fourchettes</h3>
				<div className="flex gap-2">
					<button
						onClick={simulateDeadlock}
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              bg-danger-500/20 text-danger-400 hover:bg-danger-500/30 transition-colors"
					>
						<Play className="w-3.5 h-3.5" />
						Déclencher l'Interblocage
					</button>
					<button
						onClick={reset}
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              bg-dark-700 text-dark-200 hover:bg-dark-600 transition-colors"
					>
						<RotateCcw className="w-3.5 h-3.5" />
						Réinitialiser
					</button>
				</div>
			</div>

			{/* Zone de simulation */}
			<div className="flex flex-col lg:flex-row items-center gap-6">
				<div className="relative flex-shrink-0" style={{ width: 300, height: 300 }}>
					{/* Table */}
					<div className="absolute inset-[60px] rounded-full bg-dark-800/60 border border-dark-700/50" />

					{/* Fourchettes */}
					{forks.map((fork, i) => {
						const pos = getForkPosition(i, NUM_PHILOSOPHERS, forkRadius, center, center)
						return (
							<div
								key={`fork-${i}`}
								className={`fork ${fork.heldBy !== null ? 'taken' : 'available'}`}
								style={{
									left: pos.x - 14,
									top: pos.y - 14,
								}}
								title={fork.heldBy !== null ? `Tenue par P${fork.heldBy}` : `Fourchette ${i} (disponible)`}
							>
								🍴
							</div>
						)
					})}

					{/* Philosophes */}
					{philosophers.map((philo, i) => {
						const pos = getPosition(i, NUM_PHILOSOPHERS, philoRadius, center, center)
						return (
							<button
								key={`philo-${i}`}
								className={`philosopher ${philo.state}`}
								style={{
									left: pos.x - 24,
									top: pos.y - 24,
								}}
								onClick={() => handlePhilosopherClick(i)}
								title={`Philosophe ${i} : ${STATE_NAMES[philo.state]}`}
								aria-label={`Le Philosophe ${i} ${STATE_NAMES[philo.state]}. Cliquez pour interagir.`}
							>
								<span className="text-lg">{STATE_LABELS[philo.state]}</span>
							</button>
						)
					})}
				</div>

				{/* Panneau d'info */}
				<div className="flex-1 min-w-0 space-y-3">
					{/* Message de statut */}
					<div className={`glass rounded-xl p-4 ${deadlockDetected ? 'border-danger-500/50 glow-red' : ''}`}>
						<p className="text-sm text-dark-200 leading-relaxed">{message}</p>
					</div>

					{/* Légende */}
					<div className="glass-light rounded-xl p-4">
						<p className="text-xs font-semibold text-dark-300 mb-2 uppercase tracking-wider">États</p>
						<div className="grid grid-cols-2 gap-2">
							{Object.entries(STATES).map(([key, value]) => (
								<div key={key} className="flex items-center gap-2">
									<div className={`philosopher ${value} !relative !w-7 !h-7 !cursor-default`}>
										<span className="text-sm">{STATE_LABELS[value]}</span>
									</div>
									<span className="text-xs text-dark-300 capitalize">{STATE_NAMES[value]}</span>
								</div>
							))}
						</div>
					</div>

					{/* Astuce */}
					<div className="flex items-start gap-2 p-3 rounded-lg bg-accent-600/10 border border-accent-600/20">
						<Info className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" />
						<p className="text-xs text-dark-300 leading-relaxed">
							Cliquez sur les philosophes pour prendre les fourchettes. Essayez de tous les cliquer pour voir l'interblocage en action !
							Chaque philosophe essaie d'abord sa fourchette gauche, puis la droite.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
