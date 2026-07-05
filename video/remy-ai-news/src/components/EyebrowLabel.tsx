import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {colors, fonts} from '../theme';

export const EyebrowLabel: React.FC<{
	text: string;
	color?: string;
	delay?: number;
}> = ({text, color = colors.gold, delay = 0}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = frame - delay;

	const enter = spring({
		frame: local,
		fps,
		config: {damping: 16, stiffness: 170, mass: 0.6},
	});
	const opacity = interpolate(enter, [0, 1], [0, 1]);
	const y = interpolate(enter, [0, 1], [10, 0]);

	const dotPulse = 0.5 + 0.5 * Math.sin(local * 0.09);

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 12,
				opacity,
				transform: `translateY(${y}px)`,
			}}
		>
			<div
				style={{
					width: 10,
					height: 10,
					borderRadius: '50%',
					backgroundColor: color,
					opacity: 0.5 + dotPulse * 0.5,
					boxShadow: `0 0 ${6 + dotPulse * 6}px ${color}`,
				}}
			/>
			<div
				style={{
					fontFamily: fonts.sans,
					fontWeight: 700,
					fontSize: 34,
					letterSpacing: 6,
					textTransform: 'uppercase',
					color,
				}}
			>
				{text}
			</div>
		</div>
	);
};
