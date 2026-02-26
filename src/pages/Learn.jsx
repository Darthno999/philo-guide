import { useState } from 'react'
import { ChevronDown, ChevronUp, Lightbulb, AlertTriangle, Shield, ArrowLeftRight } from 'lucide-react'
import PhiloSimulation from '../components/PhiloSimulation'
import { learnSections } from '../data/learnContent'

function ContentBlock({ block }) {
	if (block.type === 'intro') {
		return (
			<p className="text-sm text-dark-200 leading-relaxed"
				dangerouslySetInnerHTML={{ __html: block.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-dark-100 font-semibold">$1</strong>') }}
			/>
		)
	}

	if (block.type === 'keypoint') {
		return (
			<div className="flex items-start gap-3 p-3 rounded-lg bg-accent-600/10 border border-accent-600/20">
				<Lightbulb className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" />
				<div>
					<p className="text-xs font-semibold text-accent-400 mb-1">{block.title}</p>
					<p className="text-sm text-dark-300 leading-relaxed"
						dangerouslySetInnerHTML={{ __html: block.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-dark-100 font-semibold">$1</strong>') }}
					/>
				</div>
			</div>
		)
	}

	if (block.type === 'list') {
		return (
			<div>
				{block.title && <p className="text-xs font-semibold text-dark-300 mb-2">{block.title}</p>}
				<ul className="space-y-2">
					{block.items.map((item, i) => (
						<li key={i} className="flex items-start gap-2 text-sm text-dark-300 leading-relaxed">
							<span className="text-accent-400 mt-[3px] flex-shrink-0">•</span>
							<span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-dark-100 font-semibold">$1</strong>') }} />
						</li>
					))}
				</ul>
			</div>
		)
	}

	if (block.type === 'invariant') {
		return (
			<div className="p-3 rounded-lg bg-warning-400/10 border border-warning-400/20">
				<div className="flex items-center gap-2 mb-2">
					<Shield className="w-4 h-4 text-warning-400" />
					<p className="text-xs font-semibold text-warning-400">{block.title}</p>
				</div>
				<ul className="space-y-1.5">
					{block.items.map((item, i) => (
						<li key={i} className="flex items-start gap-2 text-xs text-dark-300 leading-relaxed">
							<span className="text-warning-400 mt-[2px]">✓</span>
							{item}
						</li>
					))}
				</ul>
			</div>
		)
	}

	if (block.type === 'strategy') {
		return (
			<div className="p-3 rounded-lg bg-success-500/10 border border-success-500/20">
				<p className="text-xs font-semibold text-success-400 mb-2">{block.title}</p>
				<ul className="space-y-2">
					{block.items.map((item, i) => (
						<li key={i} className="text-xs text-dark-300 leading-relaxed"
							dangerouslySetInnerHTML={{ __html: `<span class="text-success-400 mr-1">${i + 1}.</span> ${item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-dark-100 font-semibold">$1</strong>')}` }}
						/>
					))}
				</ul>
			</div>
		)
	}

	if (block.type === 'comparison') {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{[block.left, block.right].map((side, idx) => (
					<div key={idx} className={`p-3 rounded-lg border ${idx === 0
							? 'bg-accent-600/10 border-accent-600/20'
							: 'bg-success-500/10 border-success-500/20'
						}`}>
						<div className="flex items-center gap-2 mb-2">
							<ArrowLeftRight className={`w-3.5 h-3.5 ${idx === 0 ? 'text-accent-400' : 'text-success-400'}`} />
							<p className={`text-xs font-semibold ${idx === 0 ? 'text-accent-400' : 'text-success-400'}`}>
								{side.title}
							</p>
						</div>
						<ul className="space-y-1">
							{side.items.map((item, i) => (
								<li key={i} className="text-xs text-dark-300 flex items-start gap-1.5">
									<span className={`mt-[3px] ${idx === 0 ? 'text-accent-500' : 'text-success-500'}`}>•</span>
									{item}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		)
	}

	return null
}

function LearnSection({ section }) {
	const [expanded, setExpanded] = useState(false)

	const colorMap = {
		accent: {
			border: 'border-accent-600/30',
			bg: 'bg-accent-600/10',
			text: 'text-accent-400',
		},
		danger: {
			border: 'border-danger-500/30',
			bg: 'bg-danger-500/10',
			text: 'text-danger-400',
		},
		warning: {
			border: 'border-warning-400/30',
			bg: 'bg-warning-400/10',
			text: 'text-warning-400',
		},
		success: {
			border: 'border-success-500/30',
			bg: 'bg-success-500/10',
			text: 'text-success-400',
		},
	}

	const colors = colorMap[section.color] || colorMap.accent

	return (
		<div className={`glass rounded-xl overflow-hidden border ${colors.border} card-hover`}>
			<button
				onClick={() => setExpanded(!expanded)}
				className="w-full flex items-center justify-between p-4 text-left hover:bg-dark-800/20 transition-colors"
				aria-expanded={expanded}
			>
				<div className="flex items-center gap-3">
					<div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center text-lg`}>
						{section.icon}
					</div>
					<h3 className="text-sm font-semibold text-dark-100">{section.title}</h3>
				</div>
				{expanded
					? <ChevronUp className="w-4 h-4 text-dark-400" />
					: <ChevronDown className="w-4 h-4 text-dark-400" />}
			</button>
			{expanded && (
				<div className="px-4 pb-4 space-y-3 animate-fade-in">
					{section.content.map((block, i) => (
						<ContentBlock key={i} block={block} />
					))}
				</div>
			)}
		</div>
	)
}

export default function Learn() {
	return (
		<div className="space-y-6">
			{/* En-tête */}
			<div>
				<h2 className="text-2xl font-bold gradient-text mb-2">Apprendre les Concepts</h2>
				<p className="text-sm text-dark-400 leading-relaxed max-w-2xl">
					Maîtrisez les principes du problème des Philosophes. Chaque section couvre un concept clé
					avec des invariants, des modes de défaillance et des stratégies. Pas de code — juste la compréhension.
				</p>
			</div>

			{/* Sections */}
			<div className="space-y-3">
				{learnSections.map(section => (
					<LearnSection key={section.id} section={section} />
				))}
			</div>

			{/* Simulation interactive */}
			<section className="glass rounded-xl p-6 border border-accent-600/30">
				<PhiloSimulation />
			</section>

			{/* Comparaison des stratégies de verrouillage */}
			<section className="glass rounded-xl p-6">
				<h3 className="text-lg font-semibold text-dark-100 mb-4">Comparaison des Stratégies de Verrouillage</h3>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-dark-700">
								<th className="text-left py-3 px-3 text-xs font-semibold text-dark-400 uppercase tracking-wider">Stratégie</th>
								<th className="text-left py-3 px-3 text-xs font-semibold text-dark-400 uppercase tracking-wider">Sans Interblocage</th>
								<th className="text-left py-3 px-3 text-xs font-semibold text-dark-400 uppercase tracking-wider">Sans Famine</th>
								<th className="text-left py-3 px-3 text-xs font-semibold text-dark-400 uppercase tracking-wider">Complexité</th>
								<th className="text-left py-3 px-3 text-xs font-semibold text-dark-400 uppercase tracking-wider">Idée</th>
							</tr>
						</thead>
						<tbody>
							{[
								{
									name: 'Ordre des Ressources',
									deadlock: true,
									starvation: false,
									complexity: 'Faible',
									idea: 'Numéroter les fourchettes, toujours prendre la plus petite ID d\'abord',
								},
								{
									name: 'Asymétrie Pair/Impair',
									deadlock: true,
									starvation: false,
									complexity: 'Faible',
									idea: 'Les pairs prennent la gauche d\'abord, les impairs la droite',
								},
								{
									name: 'Limiter la Concurrence',
									deadlock: true,
									starvation: true,
									complexity: 'Moyen',
									idea: 'Max N-1 philosophes tentent de manger',
								},
								{
									name: 'Chandy/Misra',
									deadlock: true,
									starvation: true,
									complexity: 'Élevé',
									idea: 'Les fourchettes ont un état "propre/sale" + messages de requête',
								},
							].map((row, i) => (
								<tr key={i} className="border-b border-dark-800/50 hover:bg-dark-800/30 transition-colors">
									<td className="py-3 px-3 font-medium text-dark-200">{row.name}</td>
									<td className="py-3 px-3">
										{row.deadlock ? <span className="text-success-400">✓</span> : <span className="text-danger-400">✗</span>}
									</td>
									<td className="py-3 px-3">
										{row.starvation ? <span className="text-success-400">✓</span> : <span className="text-warning-400">~</span>}
									</td>
									<td className="py-3 px-3">
										<span className={`text-xs font-medium px-2 py-0.5 rounded-full ${row.complexity === 'Faible' ? 'bg-success-500/20 text-success-400'
												: row.complexity === 'Moyen' ? 'bg-warning-400/20 text-warning-400'
													: 'bg-danger-400/20 text-danger-400'
											}`}>
											{row.complexity}
										</span>
									</td>
									<td className="py-3 px-3 text-dark-400 text-xs">{row.idea}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	)
}
