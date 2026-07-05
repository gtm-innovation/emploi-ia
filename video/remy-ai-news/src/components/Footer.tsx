import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
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
