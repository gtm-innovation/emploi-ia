import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {colors, fonts} from '../theme';

export const Headline: React.FC<{
	lines: {text: string; color?: string}[];
	delay?: number;
	fontSize?: number;
}> = ({lines, delay = 0, fontSize = 88}) => {
	const frame = useCurrentFrame();
	const local = frame - delay;

	const opacity = interpolate(local, [0, 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const scale = interpolate(local, [0, 20], [0.92, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const y = interpolate(local, [0, 20], [22, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const blur = interpolate(local, [0, 18], [16, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});

	return (
		<div
			style={{
				fontFamily: fonts.sans,
				fontWeight: 800,
				fontSize,
				lineHeight: 1.05,
				opacity,
				transform: `translateY(${y}px) scale(${scale})`,
				transformOrigin: 'left center',
				filter: `blur(${blur}px)`,
			}}
		>
			{lines.map((l, i) => (
				<div key={i} style={{color: l.color ?? colors.white}}>
					{l.text}
				</div>
			))}
		</div>
	);
};
