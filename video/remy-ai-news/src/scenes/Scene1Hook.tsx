import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {SceneLayout} from '../components/SceneLayout';
import {EyebrowLabel} from '../components/EyebrowLabel';
import {Headline} from '../components/Headline';
import {colors} from '../theme';

const ImpactBar: React.FC = () => {
	const frame = useCurrentFrame();
	const width = interpolate(frame, [16, 32], [0, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const pulse = 0.6 + 0.4 * Math.sin(Math.max(frame - 32, 0) * 0.08);

	return (
		<div
			style={{
				height: 8,
				width: '100%',
				backgroundColor: 'rgba(255,255,255,0.05)',
				borderRadius: 4,
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					height: '100%',
					width: `${width}%`,
					background: `linear-gradient(90deg, ${colors.gold}, ${colors.goldBright})`,
					boxShadow: `0 0 ${16 * pulse}px rgba(217,179,108,0.6)`,
				}}
			/>
		</div>
	);
};

export const Scene1Hook: React.FC = () => {
	return (
		<SceneLayout ghostNumber="01" slideNumber="01">
			<EyebrowLabel text="AI NEWS · JULY 5" color={colors.gray} />
			<Headline
				fontSize={118}
				delay={4}
				lines={[
					{text: 'Google just lost'},
					{text: 'its brain.', color: colors.gold},
				]}
			/>
			<ImpactBar />
		</SceneLayout>
	);
};
