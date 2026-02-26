import { useLocalStorage } from '../hooks/useLocalStorage'
import { Bug, ClipboardCheck, FileText, Save, Trash2, Plus, HelpCircle } from 'lucide-react'

const defaultNotes = {
	debugEntries: [
		{
			id: Date.now(),
			observed: '',
			hypothesis: '',
			instrumentation: '',
			expected: '',
			outcome: '',
		}
	],
	freeNotes: '',
	checklist: [
		{ id: 'c1', text: 'Je peux reproduire le bug de manière cohérente ?', done: false },
		{ id: 'c2', text: 'J\'ai réduit le cas de test au minimum ?', done: false },
		{ id: 'c3', text: 'J\'ai testé avec -fsanitize=thread ?', done: false },
		{ id: 'c4', text: 'J\'ai testé avec valgrind --tool=helgrind ?', done: false },
		{ id: 'c5', text: 'J\'ai vérifié les fuites mémoire (valgrind) ?', done: false },
		{ id: 'c6', text: 'Ça fonctionne avec 1 philosophe ?', done: false },
		{ id: 'c7', text: 'Ça fonctionne avec 2 philosophes ?', done: false },
		{ id: 'c8', text: 'Le format de sortie des logs est correct ?', done: false },
		{ id: 'c9', text: 'Aucun message affiché après la mort ?', done: false },
		{ id: 'c10', text: 'Mort détectée dans les 10ms ?', done: false },
		{ id: 'c11', text: 'Tous les mutex correctement détruits ?', done: false },
		{ id: 'c12', text: 'Tous les threads correctement joints ?', done: false },
		{ id: 'c13', text: 'La norminette passe sans erreur ?', done: false },
		{ id: 'c14', text: 'Makefile : all, clean, fclean, re, pas de re-link ?', done: false },
		{ id: 'c15', text: 'Testé avec 200 philosophes ?', done: false },
		{ id: 'c16', text: 'Stress test : 100 exécutions consécutives sans blocage ?', done: false },
	],
}

export default function Notes() {
	const [notes, setNotes] = useLocalStorage('philo-notes', defaultNotes)

	const updateDebugEntry = (entryId, field, value) => {
		setNotes(prev => ({
			...prev,
			debugEntries: prev.debugEntries.map(e =>
				e.id === entryId ? { ...e, [field]: value } : e
			),
		}))
	}

	const addDebugEntry = () => {
		setNotes(prev => ({
			...prev,
			debugEntries: [
				...prev.debugEntries,
				{
					id: Date.now(),
					observed: '',
					hypothesis: '',
					instrumentation: '',
					expected: '',
					outcome: '',
				},
			],
		}))
	}

	const removeDebugEntry = (entryId) => {
		setNotes(prev => ({
			...prev,
			debugEntries: prev.debugEntries.filter(e => e.id !== entryId),
		}))
	}

	const toggleChecklist = (itemId) => {
		setNotes(prev => ({
			...prev,
			checklist: prev.checklist.map(c =>
				c.id === itemId ? { ...c, done: !c.done } : c
			),
		}))
	}

	const updateFreeNotes = (text) => {
		setNotes(prev => ({ ...prev, freeNotes: text }))
	}

	const resetNotes = () => {
		if (window.confirm('Réinitialiser toutes les notes, entrées de debug et la checklist ?')) {
			setNotes(defaultNotes)
		}
	}

	const checklistDone = notes.checklist.filter(c => c.done).length
	const checklistTotal = notes.checklist.length

	return (
		<div className="space-y-6">
			{/* En-tête */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold gradient-text mb-2">Notes & Boîte à Outils Debug</h2>
					<p className="text-sm text-dark-400">
						Suivez vos bugs, hypothèses, et préparez la correction. Tout est sauvegardé localement.
					</p>
				</div>
				<button
					onClick={resetNotes}
					className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium
            bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-dark-100 transition-colors self-start"
				>
					<Trash2 className="w-3.5 h-3.5" />
					Tout Réinitialiser
				</button>
			</div>

			{/* Entrées de debug */}
			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Bug className="w-5 h-5 text-danger-400" />
						<h3 className="text-base font-semibold text-dark-100">Journal de Debug</h3>
					</div>
					<button
						onClick={addDebugEntry}
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              bg-accent-600/20 text-accent-400 hover:bg-accent-600/30 transition-colors"
					>
						<Plus className="w-3.5 h-3.5" />
						Nouvelle Entrée
					</button>
				</div>

				{notes.debugEntries.map((entry, index) => (
					<div key={entry.id} className="glass rounded-xl p-5 space-y-3 animate-fade-in">
						<div className="flex items-center justify-between">
							<span className="text-xs font-semibold text-dark-400">Bug #{index + 1}</span>
							{notes.debugEntries.length > 1 && (
								<button
									onClick={() => removeDebugEntry(entry.id)}
									className="p-1 rounded hover:bg-dark-700 transition-colors"
									aria-label="Supprimer l'entrée"
								>
									<Trash2 className="w-3.5 h-3.5 text-dark-500 hover:text-danger-400" />
								</button>
							)}
						</div>

						{[
							{ key: 'observed', label: 'Comportement Observé', placeholder: "Que s'est-il passé ? (ex : 'Le philosophe 3 meurt après 210ms avec time_to_die=200')" },
							{ key: 'hypothesis', label: 'Hypothèse', placeholder: "Quelle est votre théorie sur la cause ?" },
							{ key: 'instrumentation', label: 'Plan d\'Instrumentation', placeholder: "Comment allez-vous vérifier ? (ex : ajouter des timestamps, utiliser helgrind, ajouter des prints de debug)" },
							{ key: 'expected', label: 'Résultat Attendu', placeholder: "Que devrait-il se passer si votre hypothèse est correcte ?" },
							{ key: 'outcome', label: 'Résultat Réel', placeholder: "Que s'est-il passé après le test ?" },
						].map(({ key, label, placeholder }) => (
							<div key={key}>
								<label className="text-xs font-medium text-dark-300 block mb-1">{label}</label>
								<textarea
									value={entry[key]}
									onChange={(e) => updateDebugEntry(entry.id, key, e.target.value)}
									placeholder={placeholder}
									rows={2}
									className="w-full bg-dark-900/50 border border-dark-700/50 rounded-lg px-3 py-2 text-sm text-dark-200
                    placeholder:text-dark-600 focus:outline-none focus:border-accent-500/50 resize-y transition-colors"
								/>
							</div>
						))}
					</div>
				))}

				{/* Conseil méthodologique */}
				<div className="flex items-start gap-2 p-3 rounded-lg bg-accent-600/10 border border-accent-600/20">
					<HelpCircle className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" />
					<div>
						<p className="text-xs font-semibold text-accent-400 mb-0.5">Méthode de Debug Scientifique</p>
						<p className="text-xs text-dark-400 leading-relaxed">
							1. Observer → 2. Formuler une hypothèse → 3. Instrumenter → 4. Prédire → 5. Tester → 6. Conclure.
							Ne changez jamais deux choses à la fois. Toujours réduire à la plus petite entrée qui échoue.
						</p>
					</div>
				</div>
			</section>

			{/* Checklist avant correction */}
			<section className="glass rounded-xl p-5">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<ClipboardCheck className="w-5 h-5 text-success-400" />
						<h3 className="text-base font-semibold text-dark-100">Checklist Pré-Correction</h3>
					</div>
					<span className="text-xs font-mono text-dark-400">{checklistDone}/{checklistTotal}</span>
				</div>

				{/* Barre de progression */}
				<div className="w-full h-1.5 bg-dark-800 rounded-full mb-4 overflow-hidden">
					<div
						className="h-full rounded-full transition-all duration-500"
						style={{
							width: `${(checklistDone / checklistTotal) * 100}%`,
							background: 'linear-gradient(90deg, #22c55e, #4ade80)',
						}}
					/>
				</div>

				<div className="space-y-1.5">
					{notes.checklist.map(item => (
						<label
							key={item.id}
							className="flex items-start gap-3 p-2 rounded-lg hover:bg-dark-800/30 transition-colors cursor-pointer group"
						>
							<input
								type="checkbox"
								checked={item.done}
								onChange={() => toggleChecklist(item.id)}
								className="custom-checkbox mt-0.5"
							/>
							<span className={`text-sm leading-relaxed transition-colors ${item.done ? 'text-dark-500 line-through' : 'text-dark-200 group-hover:text-dark-100'
								}`}>
								{item.text}
							</span>
						</label>
					))}
				</div>
			</section>

			{/* Notes libres */}
			<section className="glass rounded-xl p-5">
				<div className="flex items-center gap-2 mb-4">
					<FileText className="w-5 h-5 text-accent-400" />
					<h3 className="text-base font-semibold text-dark-100">Notes Libres</h3>
				</div>
				<textarea
					value={notes.freeNotes}
					onChange={(e) => updateFreeNotes(e.target.value)}
					placeholder="Écrivez vos notes, idées, questions ici... Tout est sauvegardé automatiquement."
					rows={8}
					className="w-full bg-dark-900/50 border border-dark-700/50 rounded-lg px-4 py-3 text-sm text-dark-200
            placeholder:text-dark-600 focus:outline-none focus:border-accent-500/50 resize-y transition-colors font-mono leading-relaxed"
				/>
				<div className="flex items-center gap-1.5 mt-2">
					<Save className="w-3 h-3 text-dark-500" />
					<span className="text-[11px] text-dark-500">Sauvegarde auto dans localStorage</span>
				</div>
			</section>
		</div>
	)
}
