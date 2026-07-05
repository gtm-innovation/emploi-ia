import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring, Easing} from 'remotion';
import {colors, fonts} from '../theme';

export const Headline: React.FC<{
	lines: {text: string; color?: string}[];
	delay?: number;
	fontSize?: number;
}> = ({lines, delay = 0, fontSize = 88}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = frame - delay;

	const enter = spring({
		frame: local,
		fps,
		config: {damping: 13, stiffness: 160, mass: 0.7},
	});
	const opacity = interpolate(local, [0, 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const scale = interpolate(enter, [0, 1], [0.9, 1]);
	const y = interpolate(enter, [0, 1], [26, 0]);
	const blur = interpolate(local, [0, 11], [16, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});

	const settled = interpolate(local, [14, 22], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const idleFloat = settled * Math.sin(local * 0.035) * 3;

	return (
		<div
			style={{
				fontFamily: fonts.sans,
				fontWeight: 800,
				fontSize,
				lineHeight: 1.05,
				opacity,
				transform: `translateY(${y + idleFloat}px) scale(${scale})`,
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
