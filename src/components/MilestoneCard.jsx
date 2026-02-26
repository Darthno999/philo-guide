import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Target } from 'lucide-react'
import { useState } from 'react'

export default function MilestoneCard({ milestone, onToggleTask, weekIndex }) {
	const [expanded, setExpanded] = useState(false)
	const completedCount = milestone.tasks.filter(t => t.done).length
	const totalCount = milestone.tasks.length
	const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
	const isComplete = completedCount === totalCount

	return (
		<div className={`glass rounded-xl overflow-hidden transition-all duration-300 ${isComplete ? 'border-success-500/30' : ''
			}`}>
			{/* En-tête */}
			<button
				onClick={() => setExpanded(!expanded)}
				className="w-full flex items-center justify-between p-4 hover:bg-dark-800/30 transition-colors text-left"
				aria-expanded={expanded}
			>
				<div className="flex items-center gap-3 min-w-0">
					<div className={`
            w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0
            ${isComplete
							? 'bg-success-500/20 text-success-400'
							: 'bg-accent-600/20 text-accent-400'
						}
          `}>
						{weekIndex < 4 ? 'S1' : 'S2'}
					</div>
					<div className="min-w-0">
						<h3 className="text-sm font-semibold text-dark-100 truncate">{milestone.title}</h3>
						<p className="text-xs text-dark-400">{milestone.days} · {completedCount}/{totalCount} tâches</p>
					</div>
				</div>
				<div className="flex items-center gap-3 flex-shrink-0">
					{/* Mini barre de progression */}
					<div className="hidden sm:block w-20 h-1.5 bg-dark-800 rounded-full overflow-hidden">
						<div
							className="h-full rounded-full transition-all duration-500"
							style={{
								width: `${progress}%`,
								background: isComplete
									? 'linear-gradient(90deg, #22c55e, #4ade80)'
									: 'linear-gradient(90deg, #2d7cf7, #54a0ff)',
							}}
						/>
					</div>
					{expanded ? <ChevronUp className="w-4 h-4 text-dark-400" /> : <ChevronDown className="w-4 h-4 text-dark-400" />}
				</div>
			</button>

			{/* Contenu développé */}
			{expanded && (
				<div className="px-4 pb-4 space-y-4 animate-fade-in">
					{/* Tâches */}
					<div className="space-y-2">
						{milestone.tasks.map((task) => (
							<label
								key={task.id}
								className="flex items-start gap-3 p-2 rounded-lg hover:bg-dark-800/30 transition-colors cursor-pointer group"
							>
								<input
									type="checkbox"
									checked={task.done}
									onChange={() => onToggleTask(milestone.id, task.id)}
									className="custom-checkbox mt-0.5"
								/>
								<span className={`text-sm leading-relaxed transition-colors ${task.done ? 'text-dark-500 line-through' : 'text-dark-200 group-hover:text-dark-100'
									}`}>
									{task.text}
								</span>
							</label>
						))}
					</div>

					{/* Critère d'achèvement */}
					<div className="flex items-start gap-2 p-3 rounded-lg bg-success-500/10 border border-success-500/20">
						<Target className="w-4 h-4 text-success-400 flex-shrink-0 mt-0.5" />
						<div>
							<p className="text-xs font-semibold text-success-400 mb-0.5">Critère d'Achèvement</p>
							<p className="text-xs text-dark-300 leading-relaxed">{milestone.definitionOfDone}</p>
						</div>
					</div>

					{/* Pièges */}
					<div className="flex items-start gap-2 p-3 rounded-lg bg-warning-400/10 border border-warning-400/20">
						<AlertTriangle className="w-4 h-4 text-warning-400 flex-shrink-0 mt-0.5" />
						<div>
							<p className="text-xs font-semibold text-warning-400 mb-1">Pièges Courants</p>
							<ul className="space-y-1">
								{milestone.pitfalls.map((pitfall, i) => (
									<li key={i} className="text-xs text-dark-300 leading-relaxed flex items-start gap-1.5">
										<span className="text-warning-500 mt-[3px]">•</span>
										{pitfall}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
