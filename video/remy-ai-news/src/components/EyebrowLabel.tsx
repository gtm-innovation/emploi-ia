import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {colors, fonts} from '../theme';

export const EyebrowLabel: React.FC<{
	text: string;
	color?: string;
	delay?: number;
}> = ({text, color = colors.gold, delay = 0}) => {
	const frame = useCurrentFrame();
	const local = frame - delay;
	const opacity = interpolate(local, [0, 12], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const y = interpolate(local, [0, 12], [10, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				fontFamily: fonts.sans,
				fontWeight: 700,
				fontSize: 28,
				letterSpacing: 6,
				textTransform: 'uppercase',
				color,
				opacity,
				transform: `translateY(${y}px)`,
			}}
		>
			{text}
		</div>
	);
};
