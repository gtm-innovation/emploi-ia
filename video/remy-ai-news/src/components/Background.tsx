import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {colors, fonts} from '../theme';

export const Background: React.FC<{
	ghostNumber: string;
	linesFadeInDuration?: number;
}> = ({ghostNumber, linesFadeInDuration = 20}) => {
	const frame = useCurrentFrame();
	const linesOpacity = interpolate(frame, [0, linesFadeInDuration], [0, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{backgroundColor: colors.bg}}>
			<AbsoluteFill
				style={{
					justifyContent: 'flex-start',
					alignItems: 'flex-end',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						fontFamily: fonts.sans,
						fontWeight: 800,
						fontSize: 520,
						color: '#141414',
						lineHeight: 1,
						transform: 'translate(28%, -18%)',
						userSelect: 'none',
					}}
				>
					{ghostNumber}
				</div>
			</AbsoluteFill>

			<svg
				width="100%"
				height="100%"
				viewBox="0 0 1080 1920"
				style={{position: 'absolute', top: 0, left: 0, opacity: linesOpacity}}
			>
				<line
					x1="760"
					y1="-40"
					x2="1120"
					y2="720"
					stroke={colors.gold}
					strokeWidth={2}
					opacity={0.55}
				/>
				<line
					x1="860"
					y1="-40"
					x2="1220"
					y2="640"
					stroke={colors.gold}
					strokeWidth={2}
					opacity={0.3}
				/>
			</svg>

			<AbsoluteFill
				style={{
					background:
						'radial-gradient(120% 90% at 30% 20%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 55%), radial-gradient(140% 100% at 50% 100%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)',
				}}
			/>
		</AbsoluteFill>
	);
};
