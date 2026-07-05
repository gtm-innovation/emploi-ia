import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {colors, fonts} from '../theme';

type BarItem = {
	label: string;
	value: number;
	displayValue: string;
	color: string;
	emphasis?: boolean;
};

export const ComparisonBars: React.FC<{
	items: BarItem[];
	maxValue: number;
	delay?: number;
	stagger?: number;
}> = ({items, maxValue, delay = 0, stagger = 14}) => {
	const frame = useCurrentFrame();

	return (
		<div style={{display: 'flex', flexDirection: 'column', gap: 34}}>
			{items.map((item, i) => {
				const local = frame - delay - i * stagger;
				const opacity = interpolate(local, [0, 12], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});
				const widthProgress = interpolate(local, [0, 40], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
					easing: Easing.out(Easing.cubic),
				});
				const barWidth = (item.value / maxValue) * 100 * widthProgress;
				const pulse = item.emphasis
					? 0.6 + 0.4 * Math.sin(Math.max(local - 40, 0) * 0.05)
					: 1;

				return (
					<div key={item.label} style={{opacity}}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								marginBottom: 10,
								fontFamily: fonts.sans,
								fontSize: 26,
								color: colors.gray,
							}}
						>
							<span style={{fontWeight: 600, color: colors.white}}>
								{item.label}
							</span>
							<span style={{fontWeight: 700, color: item.color}}>
								{item.displayValue}
							</span>
						</div>
						<div
							style={{
								height: 22,
								borderRadius: 11,
								backgroundColor: 'rgba(255,255,255,0.06)',
								overflow: 'hidden',
							}}
						>
							<div
								style={{
									height: '100%',
									width: `${barWidth}%`,
									borderRadius: 11,
									background: item.color,
									boxShadow: item.emphasis
										? `0 0 ${18 * pulse}px ${item.color}`
										: undefined,
								}}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};
