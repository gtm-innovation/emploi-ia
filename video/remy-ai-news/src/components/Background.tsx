import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from 'remotion';
import {colors, fonts} from '../theme';

const KEN_BURNS_RAMP_FRAMES = 140;

export const Background: React.FC<{
	ghostNumber: string;
	linesFadeInDuration?: number;
	zoom?: number;
}> = ({ghostNumber, linesFadeInDuration = 20, zoom = 1.07}) => {
	const frame = useCurrentFrame();
	const linesOpacity = interpolate(frame, [0, linesFadeInDuration], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const kenBurnsScale = interpolate(
		frame,
		[0, KEN_BURNS_RAMP_FRAMES],
		[1, zoom],
		{extrapolateRight: 'clamp', easing: Easing.linear}
	);
	const kenBurnsShiftX = interpolate(
		frame,
		[0, KEN_BURNS_RAMP_FRAMES],
		[0, -14],
		{extrapolateRight: 'clamp'}
	);

	const lineDrift = Math.sin(frame * 0.025) * 8;
	const glowPulse = 0.55 + 0.45 * Math.sin(frame * 0.05);

	const sparkT = ((frame * 1.4) % 260) / 260;
	const spark1X = 760 + (1120 - 760) * sparkT;
	const spark1Y = -40 + (720 - -40) * sparkT;
	const sparkT2 = ((frame * 1.1 + 130) % 260) / 260;
	const spark2X = 860 + (1220 - 860) * sparkT2;
	const spark2Y = -40 + (640 - -40) * sparkT2;

	return (
		<AbsoluteFill style={{backgroundColor: colors.bg}}>
			<AbsoluteFill
				style={{
					justifyContent: 'flex-start',
					alignItems: 'flex-end',
					overflow: 'hidden',
					transform: `scale(${kenBurnsScale}) translateX(${kenBurnsShiftX}px)`,
					transformOrigin: 'top right',
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
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					opacity: linesOpacity,
					transform: `scale(${kenBurnsScale}) translateX(${kenBurnsShiftX + lineDrift}px)`,
					transformOrigin: 'top right',
				}}
			>
				<line
					x1="760"
					y1="-40"
					x2="1120"
					y2="720"
					stroke={colors.gold}
					strokeWidth={2}
					opacity={0.4 + 0.25 * glowPulse}
				/>
				<line
					x1="860"
					y1="-40"
					x2="1220"
					y2="640"
					stroke={colors.gold}
					strokeWidth={2}
					opacity={0.2 + 0.2 * glowPulse}
				/>
				<circle cx={spark1X} cy={spark1Y} r={10} fill={colors.goldBright} opacity={0.12} />
				<circle cx={spark1X} cy={spark1Y} r={4} fill={colors.goldBright} opacity={0.85} />
				<circle cx={spark2X} cy={spark2Y} r={8} fill={colors.goldBright} opacity={0.1} />
				<circle cx={spark2X} cy={spark2Y} r={3} fill={colors.goldBright} opacity={0.7} />
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
