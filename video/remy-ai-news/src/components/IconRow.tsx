import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {colors, fonts} from '../theme';

export const IconRow: React.FC<{
	items: string[];
	delay?: number;
	stagger?: number;
}> = ({items, delay = 0, stagger = 7}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<div style={{display: 'flex', gap: 32, flexWrap: 'wrap'}}>
			{items.map((label, i) => {
				const local = frame - delay - i * stagger;
				const enter = spring({
					frame: local,
					fps,
					config: {damping: 10, stiffness: 140, mass: 0.6},
				});
				const scale = interpolate(enter, [0, 1], [0.4, 1]);
				const opacity = interpolate(local, [0, 6], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});
				const settled = interpolate(local, [14, 22], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});
				const bob = settled * Math.sin(local * 0.05 + i * 1.4) * 5;

				return (
					<div
						key={label}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 14,
							width: 150,
							opacity,
							transform: `translateY(${bob}px) scale(${scale})`,
						}}
					>
						<div
							style={{
								width: 112,
								height: 112,
								borderRadius: '50%',
								border: `2px solid ${colors.gold}`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontFamily: fonts.sans,
								fontWeight: 800,
								fontSize: 44,
								color: colors.gold,
								boxShadow: `0 0 24px rgba(217,179,108,0.2)`,
							}}
						>
							{label[0]}
						</div>
						<div
							style={{
								fontFamily: fonts.sans,
								fontWeight: 600,
								fontSize: 26,
								color: colors.gray,
								textAlign: 'center',
							}}
						>
							{label}
						</div>
					</div>
				);
			})}
		</div>
	);
};
