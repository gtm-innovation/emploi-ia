import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {colors} from '../theme';

// A brief diagonal light sweep that punctuates the moment a scene's
// supporting visual arrives — a stand-in for the "cut" a real edit
// would use to keep a long-held shot from feeling static.
export const MidSceneFlash: React.FC<{delay: number}> = ({delay}) => {
	const frame = useCurrentFrame();
	const local = frame - delay;

	if (local < -4 || local > 20) {
		return null;
	}

	const sweepX = interpolate(local, [0, 14], [-20, 120], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const opacity = interpolate(local, [0, 4, 14], [0, 0.16, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
			<div
				style={{
					position: 'absolute',
					top: '-20%',
					left: `${sweepX}%`,
					width: '4%',
					height: '140%',
					background: `linear-gradient(100deg, transparent, ${colors.goldBright}, transparent)`,
					opacity,
					transform: 'rotate(12deg)',
					mixBlendMode: 'screen',
				}}
			/>
		</AbsoluteFill>
	);
};
