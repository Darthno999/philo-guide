import { useState, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { quizQuestions } from '../data/quizQuestions'
import {
	CheckCircle2, XCircle, RotateCcw, ArrowRight,
	Trophy, Target, BookOpen, ChevronRight
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Quiz() {
	const [quizState, setQuizState] = useLocalStorage('philo-quiz', {
		answers: {},
		submitted: false,
		score: 0,
		total: 0,
	})

	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [selectedAnswer, setSelectedAnswer] = useState(null)
	const [showExplanation, setShowExplanation] = useState(false)

	const question = quizQuestions[currentQuestion]
	const isAnswered = quizState.answers[question.id] !== undefined
	const previousAnswer = quizState.answers[question.id]

	const categories = useMemo(() => {
		const cats = {}
		quizQuestions.forEach(q => {
			if (!cats[q.category]) cats[q.category] = { total: 0, correct: 0 }
			cats[q.category].total++
			if (quizState.answers[q.id] === q.correct) cats[q.category].correct++
		})
		return cats
	}, [quizState.answers])

	const totalAnswered = Object.keys(quizState.answers).length
	const totalCorrect = quizQuestions.filter(
		q => quizState.answers[q.id] === q.correct
	).length

	const handleAnswer = (answerIndex) => {
		if (isAnswered) return
		setSelectedAnswer(answerIndex)
		setShowExplanation(true)

		const newAnswers = { ...quizState.answers, [question.id]: answerIndex }
		const newCorrect = quizQuestions.filter(
			q => newAnswers[q.id] === q.correct
		).length

		setQuizState({
			...quizState,
			answers: newAnswers,
			score: newCorrect,
			total: Object.keys(newAnswers).length,
		})
	}

	const handleNext = () => {
		if (currentQuestion < quizQuestions.length - 1) {
			setCurrentQuestion(currentQuestion + 1)
			setSelectedAnswer(null)
			setShowExplanation(false)
		}
	}

	const handlePrev = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion(currentQuestion - 1)
			setSelectedAnswer(null)
			setShowExplanation(false)
		}
	}

	const handleReset = () => {
		if (window.confirm('Réinitialiser toutes les réponses du quiz ?')) {
			setQuizState({ answers: {}, submitted: false, score: 0, total: 0 })
			setCurrentQuestion(0)
			setSelectedAnswer(null)
			setShowExplanation(false)
		}
	}

	const allDone = totalAnswered === quizQuestions.length
	const scorePercent = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0

	// Catégories faibles pour recommandations
	const weakCategories = Object.entries(categories)
		.filter(([_, data]) => data.total > 0 && data.correct / data.total < 0.7)
		.map(([name]) => name)

	return (
		<div className="space-y-6">
			{/* En-tête */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold gradient-text mb-2">Quiz d'Auto-Évaluation</h2>
					<p className="text-sm text-dark-400">
						Testez votre compréhension des concepts clés de la concurrence. {quizQuestions.length} questions.
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

			{/* Aperçu du score */}
			<div className="glass rounded-xl p-5 flex flex-col sm:flex-row items-center gap-6">
				<div className="flex items-center gap-4">
					<div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${allDone
							? scorePercent >= 80 ? 'bg-success-500/20' : scorePercent >= 50 ? 'bg-warning-400/20' : 'bg-danger-400/20'
							: 'bg-accent-600/20'
						}`}>
						<Trophy className={`w-7 h-7 ${allDone
								? scorePercent >= 80 ? 'text-success-400' : scorePercent >= 50 ? 'text-warning-400' : 'text-danger-400'
								: 'text-accent-400'
							}`} />
					</div>
					<div>
						<p className="text-3xl font-bold text-dark-100">{totalCorrect}/{totalAnswered}</p>
						<p className="text-xs text-dark-400">
							{allDone ? `${scorePercent}% — ${scorePercent >= 80 ? 'Excellent !' : scorePercent >= 50 ? 'Pas mal, révisez les points faibles.' : 'Continuez à étudier !'}` : `${totalAnswered}/${quizQuestions.length} répondues`}
						</p>
					</div>
				</div>

				{/* Détail par catégorie */}
				<div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
					{Object.entries(categories).map(([name, data]) => (
						<div key={name} className="text-center">
							<p className="text-xs text-dark-400 mb-1">{name}</p>
							<p className={`text-sm font-bold ${data.total === 0 ? 'text-dark-500' :
									data.correct / data.total >= 0.7 ? 'text-success-400' :
										data.correct / data.total >= 0.4 ? 'text-warning-400' : 'text-danger-400'
								}`}>
								{data.correct}/{data.total}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Points de progression */}
			<div className="flex items-center justify-center gap-1.5 flex-wrap">
				{quizQuestions.map((q, i) => {
					const answered = quizState.answers[q.id] !== undefined
					const correct = quizState.answers[q.id] === q.correct
					return (
						<button
							key={q.id}
							onClick={() => {
								setCurrentQuestion(i)
								setSelectedAnswer(null)
								setShowExplanation(false)
							}}
							className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${i === currentQuestion
									? 'bg-accent-600 text-white scale-110'
									: answered
										? correct
											? 'bg-success-500/20 text-success-400'
											: 'bg-danger-400/20 text-danger-400'
										: 'bg-dark-800 text-dark-400 hover:bg-dark-700'
								}`}
							aria-label={`Question ${i + 1}`}
						>
							{i + 1}
						</button>
					)
				})}
			</div>

			{/* Carte de question */}
			<div className="glass rounded-xl p-6 animate-fade-in" key={currentQuestion}>
				<div className="flex items-center gap-2 mb-4">
					<span className="text-xs font-medium text-dark-400 bg-dark-800 px-2 py-1 rounded">
						{question.category}
					</span>
					<span className="text-xs text-dark-500">
						Question {currentQuestion + 1} sur {quizQuestions.length}
					</span>
				</div>

				<h3 className="text-lg font-semibold text-dark-100 mb-5">{question.question}</h3>

				<div className="space-y-2.5 mb-6">
					{question.options.map((option, i) => {
						const isSelected = isAnswered ? previousAnswer === i : selectedAnswer === i
						const isCorrect = i === question.correct
						const showResult = isAnswered || showExplanation

						let optionClass = 'quiz-option glass-light rounded-xl p-4 border border-dark-700/50'
						if (showResult && isCorrect) optionClass += ' correct'
						else if (showResult && isSelected && !isCorrect) optionClass += ' incorrect'
						else if (isSelected) optionClass += ' selected'

						return (
							<button
								key={i}
								onClick={() => handleAnswer(i)}
								disabled={isAnswered}
								className={`${optionClass} w-full text-left flex items-center gap-3`}
							>
								<div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${showResult && isCorrect ? 'bg-success-500/30 text-success-400' :
										showResult && isSelected && !isCorrect ? 'bg-danger-400/30 text-danger-400' :
											'bg-dark-700 text-dark-400'
									}`}>
									{showResult && isCorrect ? <CheckCircle2 className="w-4 h-4" /> :
										showResult && isSelected ? <XCircle className="w-4 h-4" /> :
											String.fromCharCode(65 + i)}
								</div>
								<span className={`text-sm ${showResult && isCorrect ? 'text-success-400 font-medium' :
										showResult && isSelected && !isCorrect ? 'text-danger-400' :
											'text-dark-200'
									}`}>
									{option}
								</span>
							</button>
						)
					})}
				</div>

				{/* Explication */}
				{(isAnswered || showExplanation) && (
					<div className="p-4 rounded-lg bg-accent-600/10 border border-accent-600/20 animate-slide-up mb-4">
						<p className="text-xs font-semibold text-accent-400 mb-1">Explication</p>
						<p className="text-sm text-dark-300 leading-relaxed">{question.explanation}</p>
					</div>
				)}

				{/* Navigation */}
				<div className="flex items-center justify-between">
					<button
						onClick={handlePrev}
						disabled={currentQuestion === 0}
						className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
              bg-dark-800 text-dark-300 hover:bg-dark-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
					>
						Précédent
					</button>
					<button
						onClick={handleNext}
						disabled={currentQuestion === quizQuestions.length - 1}
						className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
              bg-accent-600 text-white hover:bg-accent-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
					>
						Suivant <ArrowRight className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* Recommandations */}
			{allDone && weakCategories.length > 0 && (
				<div className="glass rounded-xl p-5 border border-warning-400/30">
					<div className="flex items-center gap-2 mb-3">
						<BookOpen className="w-5 h-5 text-warning-400" />
						<h3 className="text-sm font-semibold text-warning-400">Révision Recommandée</h3>
					</div>
					<p className="text-sm text-dark-300 mb-3">
						Vous avez scoré en dessous de 70% dans ces domaines. Révisez les sections concernées :
					</p>
					<div className="flex flex-wrap gap-2">
						{weakCategories.map(cat => (
							<Link
								key={cat}
								to="/learn"
								className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium
                  bg-warning-400/20 text-warning-400 hover:bg-warning-400/30 transition-colors"
							>
								{cat} <ChevronRight className="w-3 h-3" />
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
