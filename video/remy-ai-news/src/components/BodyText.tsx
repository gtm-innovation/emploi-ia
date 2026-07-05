import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {colors, fonts} from '../theme';

type Segment = {text: string; emphasis?: boolean};

export const BodyText: React.FC<{
	segments: Segment[];
	delay?: number;
	staggerFrames?: number;
	fontSize?: number;
	maxWidth?: number;
}> = ({segments, delay = 0, staggerFrames = 2, fontSize = 40, maxWidth = 880}) => {
	const frame = useCurrentFrame();

	const words: {word: string; emphasis: boolean}[] = [];
	segments.forEach((seg) => {
		seg.text
			.split(' ')
			.filter(Boolean)
			.forEach((w) => {
				words.push({word: w, emphasis: Boolean(seg.emphasis)});
			});
	});

	return (
		<div style={{maxWidth, fontFamily: fonts.sans, fontSize, lineHeight: 1.35}}>
			{words.map((w, i) => {
				const local = frame - delay - i * staggerFrames;
				const opacity = interpolate(local, [0, 10], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});
				const y = interpolate(local, [0, 10], [8, 0], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
					easing: Easing.out(Easing.cubic),
				});
				// One settle-in flash on arrival, then rest at a quiet static
				// glow — the stat number is the only element that keeps pulsing.
				const glowPulse = w.emphasis
					? interpolate(local, [10, 20, 34], [0.9, 0.9, 0.25], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
					  })
					: 0;
				return (
					<span
						key={i}
						style={{
							display: 'inline-block',
							opacity,
							transform: `translateY(${y}px)`,
							color: w.emphasis ? colors.white : colors.gray,
							fontWeight: w.emphasis ? 700 : 400,
							marginRight: '0.28em',
							textShadow: w.emphasis
								? `0 0 ${14 * glowPulse}px rgba(217,179,108,${glowPulse})`
								: undefined,
						}}
					>
						{w.word}
					</span>
				);
			})}
		</div>
	);
};
