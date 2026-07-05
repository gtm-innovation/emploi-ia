import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {colors, fonts} from '../theme';

const PATH_D =
	'M0,110 L160,102 L320,96 L460,92 L560,88 L600,86 L630,150 L660,235 L760,255 L900,268';

export const TrendLine: React.FC<{
	ticker: string;
	changeLabel: string;
	delay?: number;
}> = ({ticker, changeLabel, delay = 0}) => {
	const frame = useCurrentFrame();
	const local = frame - delay;

	const opacity = interpolate(local, [0, 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const draw = interpolate(local, [0, 38], [0, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const dotPulse = 0.6 + 0.4 * Math.sin(Math.max(local - 38, 0) * 0.08);
	const badgeOpacity = interpolate(local, [34, 44], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div style={{opacity}}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					marginBottom: 18,
					fontFamily: fonts.sans,
				}}
			>
				<span style={{fontSize: 38, fontWeight: 700, color: colors.white}}>
					{ticker}
				</span>
				<span
					style={{
						fontSize: 32,
						fontWeight: 700,
						color: colors.gold,
						opacity: badgeOpacity,
					}}
				>
					{changeLabel}
				</span>
			</div>
			<svg width="100%" height={360} viewBox="0 0 900 280" style={{overflow: 'visible'}}>
				<defs>
					<linearGradient id="trendFade" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor={colors.gold} stopOpacity={0.25} />
						<stop offset="100%" stopColor={colors.gold} stopOpacity={0} />
					</linearGradient>
				</defs>
				<path
					d={`${PATH_D} L900,280 L0,280 Z`}
					fill="url(#trendFade)"
					opacity={draw / 100}
				/>
				<path
					d={PATH_D}
					fill="none"
					stroke={colors.gray}
					strokeWidth={3}
					pathLength={100}
					strokeDasharray={100}
					strokeDashoffset={100 - draw}
				/>
				<circle cx={630} cy={150} r={9} fill={colors.goldBright} opacity={0.15} />
				<circle
					cx={630}
					cy={150}
					r={5 + dotPulse * 2}
					fill={colors.goldBright}
					opacity={draw >= 68 ? 0.4 + dotPulse * 0.5 : 0}
				/>
			</svg>
		</div>
	);
};
