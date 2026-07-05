import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {SceneLayout} from '../components/SceneLayout';
import {EyebrowLabel} from '../components/EyebrowLabel';
import {Headline} from '../components/Headline';
import {colors} from '../theme';

const ImpactBar: React.FC = () => {
	const frame = useCurrentFrame();
	const width = interpolate(frame, [26, 50], [0, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const pulse = 0.6 + 0.4 * Math.sin(Math.max(frame - 50, 0) * 0.08);

	return (
		<div
			style={{
				marginTop: 60,
				height: 6,
				width: '100%',
				backgroundColor: 'rgba(255,255,255,0.05)',
				borderRadius: 3,
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					height: '100%',
					width: `${width}%`,
					background: `linear-gradient(90deg, ${colors.gold}, ${colors.goldBright})`,
					boxShadow: `0 0 ${14 * pulse}px rgba(217,179,108,0.6)`,
				}}
			/>
		</div>
	);
};

export const Scene1Hook: React.FC = () => {
	return (
		<SceneLayout ghostNumber="01" slideNumber="01">
			<EyebrowLabel text="AI NEWS · JULY 5" color={colors.gray} />
			<div style={{marginTop: 28}}>
				<Headline
					fontSize={104}
					delay={6}
					lines={[
						{text: 'Google just lost'},
						{text: 'its brain.', color: colors.gold},
					]}
				/>
			</div>
			<ImpactBar />
		</SceneLayout>
	);
};
