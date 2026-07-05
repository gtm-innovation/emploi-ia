import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors} from '../theme';

export const TopProgressBar: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				height: 5,
				backgroundColor: 'rgba(255,255,255,0.06)',
			}}
		>
			<div
				style={{
					height: '100%',
					width: `${progress}%`,
					background: `linear-gradient(90deg, ${colors.gold}, ${colors.goldBright})`,
				}}
			/>
		</div>
	);
};
