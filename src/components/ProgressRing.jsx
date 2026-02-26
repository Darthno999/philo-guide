import { useEffect, useRef } from 'react'

export default function ProgressRing({
	progress = 0,
	size = 120,
	strokeWidth = 8,
	color = '#2d7cf7',
	bgColor = '#262944',
	label = '',
	sublabel = '',
}) {
	const circleRef = useRef(null)
	const radius = (size - strokeWidth) / 2
	const circumference = radius * 2 * Math.PI
	const offset = circumference - (progress / 100) * circumference

	useEffect(() => {
		if (circleRef.current) {
			circleRef.current.style.setProperty('--circumference', circumference)
			circleRef.current.style.setProperty('--offset', offset)
		}
	}, [circumference, offset])

	return (
		<div className="flex flex-col items-center gap-2">
			<div className="relative" style={{ width: size, height: size }}>
				<svg
					width={size}
					height={size}
					className="transform -rotate-90"
					role="img"
					aria-label={`Progression : ${Math.round(progress)}%`}
				>
					{/* Background circle */}
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						stroke={bgColor}
						strokeWidth={strokeWidth}
					/>
					{/* Progress circle */}
					<circle
						ref={circleRef}
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						stroke={color}
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={circumference}
						className="progress-ring-circle"
						style={{
							filter: `drop-shadow(0 0 6px ${color}40)`,
						}}
					/>
				</svg>
				{/* Center text */}
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-2xl font-bold text-dark-100 font-mono">
						{Math.round(progress)}%
					</span>
					{sublabel && (
						<span className="text-[10px] text-dark-400 font-medium">{sublabel}</span>
					)}
				</div>
			</div>
			{label && (
				<span className="text-xs text-dark-300 font-medium">{label}</span>
			)}
		</div>
	)
}
