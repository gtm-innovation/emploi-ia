import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring, Easing} from 'remotion';
import {colors, fonts} from '../theme';

export const StatNumber: React.FC<{
	from?: number;
	to: number;
	durationInFrames: number;
	delay?: number;
	format: (n: number) => string;
	fontSize?: number;
}> = ({from = 0, to, durationInFrames, delay = 0, format, fontSize = 180}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = frame - delay;

	const progress = interpolate(local, [0, durationInFrames], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const value = from + (to - from) * progress;

	const opacity = interpolate(local, [0, 8], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const bounce = spring({
		frame: local,
		fps,
		config: {damping: 11, stiffness: 120, mass: 0.7},
	});
	const settleWobble = interpolate(local, [durationInFrames, durationInFrames + 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const idlePulse = 0.5 + 0.5 * Math.sin(local * 0.07);
	const scale =
		interpolate(bounce, [0, 1], [0.75, 1]) +
		settleWobble * idlePulse * 0.012;

	const glowRadius = 22 + idlePulse * 16;
	const glowAlpha = (0.3 + idlePulse * 0.22) * opacity;

	return (
		<div
			style={{
				fontFamily: fonts.sans,
				fontWeight: 800,
				fontSize,
				color: colors.white,
				opacity,
				transform: `scale(${scale})`,
				transformOrigin: 'left center',
				lineHeight: 1,
				fontVariantNumeric: 'tabular-nums',
				textShadow: `0 0 ${glowRadius}px rgba(217,179,108,${glowAlpha})`,
			}}
		>
			{format(value)}
		</div>
	);
};
