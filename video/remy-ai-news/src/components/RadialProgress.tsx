import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {colors, fonts} from '../theme';

export const RadialProgress: React.FC<{
	to: number;
	durationInFrames: number;
	delay?: number;
	captionLines: string[];
}> = ({to, durationInFrames, delay = 0, captionLines}) => {
	const frame = useCurrentFrame();
	const local = frame - delay;

	const opacity = interpolate(local, [0, 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const progress = interpolate(local, [0, durationInFrames], [0, to], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const glowPulse = interpolate(
		local,
		[durationInFrames, durationInFrames + 10, durationInFrames + 24],
		[1, 1, 0.3],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	const size = 380;
	const r = 160;
	const stroke = 24;
	const center = size / 2;

	return (
		<div style={{opacity, display: 'flex', justifyContent: 'center'}}>
			<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
				<circle
					cx={center}
					cy={center}
					r={r}
					fill="none"
					stroke="rgba(255,255,255,0.07)"
					strokeWidth={stroke}
				/>
				<circle
					cx={center}
					cy={center}
					r={r}
					fill="none"
					stroke={colors.gold}
					strokeWidth={stroke}
					strokeLinecap="round"
					pathLength={100}
					strokeDasharray={100}
					strokeDashoffset={100 - progress}
					transform={`rotate(-90 ${center} ${center})`}
					style={{
						filter: `drop-shadow(0 0 ${8 + glowPulse * 10}px rgba(217,179,108,${
							0.4 + glowPulse * 0.3
						}))`,
					}}
				/>
				<text
					x={center}
					textAnchor="middle"
					fontFamily={fonts.sans}
					fontWeight={700}
					fontSize={24}
					fill={colors.gray}
					style={{textTransform: 'uppercase', letterSpacing: 1.5}}
				>
					{captionLines.map((line, i) => (
						<tspan
							key={i}
							x={center}
							y={center - ((captionLines.length - 1) * 16) + i * 32}
						>
							{line}
						</tspan>
					))}
				</text>
			</svg>
		</div>
	);
};
