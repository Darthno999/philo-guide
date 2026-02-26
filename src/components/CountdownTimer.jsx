import { useState, useEffect } from 'react'

const BLACKHOLE_DATE = new Date('2026-04-09T23:42:00+02:00')

export default function CountdownTimer({ compact = false }) {
	const [timeLeft, setTimeLeft] = useState(getTimeLeft())

	function getTimeLeft() {
		const now = new Date()
		const diff = BLACKHOLE_DATE - now
		if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
		return {
			days: Math.floor(diff / (1000 * 60 * 60 * 24)),
			hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((diff / (1000 * 60)) % 60),
			seconds: Math.floor((diff / 1000) % 60),
			total: diff,
		}
	}

	useEffect(() => {
		const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
		return () => clearInterval(timer)
	}, [])

	const urgency = timeLeft.days <= 7 ? 'danger' : timeLeft.days <= 21 ? 'warning' : 'normal'

	if (compact) {
		return (
			<div className="flex items-center gap-1.5">
				<div className={`w-2 h-2 rounded-full ${urgency === 'danger' ? 'bg-danger-400 animate-pulse' :
						urgency === 'warning' ? 'bg-warning-400' : 'bg-accent-400'
					}`} />
				<span className="text-sm font-mono font-semibold text-dark-100">
					{timeLeft.days}j {timeLeft.hours}h
				</span>
			</div>
		)
	}

	const TimeBlock = ({ value, label }) => (
		<div className="flex flex-col items-center">
			<div className={`
        glass rounded-xl px-4 py-3 min-w-[72px]
        ${urgency === 'danger' ? 'glow-red border-danger-500/30' :
					urgency === 'warning' ? 'glow-blue border-warning-500/20' : 'glow-blue'}
      `}>
				<span className={`text-3xl font-bold font-mono animate-count block text-center ${urgency === 'danger' ? 'text-danger-400' :
						urgency === 'warning' ? 'text-warning-400' : 'gradient-text'
					}`}>
					{String(value).padStart(2, '0')}
				</span>
			</div>
			<span className="text-[11px] text-dark-400 font-medium mt-2 uppercase tracking-wider">
				{label}
			</span>
		</div>
	)

	return (
		<div className="text-center">
			<div className="flex items-center justify-center gap-2 mb-4">
				<div className={`w-2.5 h-2.5 rounded-full ${urgency === 'danger' ? 'bg-danger-400 animate-pulse' :
						urgency === 'warning' ? 'bg-warning-400 animate-pulse-slow' : 'bg-accent-400'
					}`} />
				<span className="text-sm font-medium text-dark-300">
					{urgency === 'danger' ? '⚠️ Critique — Le Blackhole approche !' :
						urgency === 'warning' ? 'Le temps presse — restez concentré !' :
							'Temps avant le Blackhole'}
				</span>
			</div>
			<div className="flex items-center justify-center gap-3">
				<TimeBlock value={timeLeft.days} label="Jours" />
				<span className="text-2xl font-bold text-dark-500 mt-[-20px]">:</span>
				<TimeBlock value={timeLeft.hours} label="Heures" />
				<span className="text-2xl font-bold text-dark-500 mt-[-20px]">:</span>
				<TimeBlock value={timeLeft.minutes} label="Min" />
				<span className="text-2xl font-bold text-dark-500 mt-[-20px]">:</span>
				<TimeBlock value={timeLeft.seconds} label="Sec" />
			</div>
		</div>
	)
}
