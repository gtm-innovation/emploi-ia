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

	const glowAlpha = (0.3 + idlePulse * 0.22) * opacity;
	const haloBlur = 22 + idlePulse * 16;

	return (
		<div style={{position: 'relative', display: 'inline-block'}}>
			{/* A real blurred light source behind the digits, not just a text-shadow approximation. */}
			<div
				style={{
					position: 'absolute',
					inset: '-25% -6%',
					background: `radial-gradient(ellipse at center, rgba(217,179,108,${glowAlpha}) 0%, rgba(217,179,108,0) 70%)`,
					filter: `blur(${haloBlur}px)`,
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					position: 'relative',
					fontFamily: fonts.sans,
					fontWeight: 800,
					fontSize,
					color: colors.white,
					opacity,
					transform: `scale(${scale})`,
					transformOrigin: 'left center',
					lineHeight: 1,
					fontVariantNumeric: 'tabular-nums',
					textShadow: `0 0 ${haloBlur * 0.5}px rgba(217,179,108,${glowAlpha * 0.6})`,
				}}
			>
				{format(value)}
			</div>
		</div>
	);
};
