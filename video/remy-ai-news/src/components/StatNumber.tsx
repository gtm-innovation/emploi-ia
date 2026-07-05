import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
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
	const scale = interpolate(local, [0, 10], [0.9, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

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
			}}
		>
			{format(value)}
		</div>
	);
};
