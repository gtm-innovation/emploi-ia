import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {colors, fonts} from '../theme';

export const Footer: React.FC<{slideNumber: string; delay?: number}> = ({
	slideNumber,
	delay = 15,
}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const lineWidth = interpolate(frame - delay, [0, 24], [0, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	// Brief settle-in glow only — a quiet, secondary brand mark, not a hero.

	return (
		<div
			style={{
				position: 'absolute',
				left: 64,
				right: 64,
				bottom: 90,
				opacity,
			}}
		>
			<div
				style={{
					borderTop: `1px solid rgba(217,179,108,0.25)`,
					width: `${lineWidth}%`,
					marginBottom: 24,
				}}
			/>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						fontFamily: fonts.script,
						fontSize: 56,
						color: colors.gold,
						lineHeight: 1,
						textShadow: `0 0 8px rgba(217,179,108,0.2)`,
					}}
				>
					Remy
				</div>
				<div
					style={{
						fontFamily: fonts.sans,
						fontWeight: 700,
						fontSize: 24,
						color: colors.gray,
					}}
				>
					{slideNumber}
				</div>
			</div>
		</div>
	);
};
