import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from 'remotion';
import {Background} from '../components/Background';
import {colors, fonts} from '../theme';

const SCENE_DURATION = 270;

export const Scene6Outro: React.FC = () => {
	const frame = useCurrentFrame();

	const logoOpacity = interpolate(frame, [0, 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const logoScale = interpolate(frame, [0, 22], [0.85, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	const taglineOpacity = interpolate(frame, [24, 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const taglineY = interpolate(frame, [24, 40], [14, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	const ctaOpacity = interpolate(frame, [50, 66], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const fadeOut = interpolate(
		frame,
		[SCENE_DURATION - 24, SCENE_DURATION],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	return (
		<AbsoluteFill>
			<Background ghostNumber="06" />
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<div
					style={{
						fontFamily: fonts.sans,
						fontWeight: 700,
						fontSize: 26,
						letterSpacing: 6,
						textTransform: 'uppercase',
						color: colors.gray,
						opacity: logoOpacity,
						marginBottom: 18,
					}}
				>
					ASYMMETRIC INSIGHTS
				</div>
				<div
					style={{
						fontFamily: fonts.script,
						fontSize: 190,
						color: colors.gold,
						lineHeight: 1,
						opacity: logoOpacity,
						transform: `scale(${logoScale})`,
					}}
				>
					Remy
				</div>
				<div
					style={{
						fontFamily: fonts.sans,
						fontWeight: 600,
						fontSize: 38,
						color: colors.white,
						opacity: taglineOpacity,
						transform: `translateY(${taglineY}px)`,
						marginTop: 28,
					}}
				>
					New edge, every week.
				</div>
				<div
					style={{
						fontFamily: fonts.sans,
						fontWeight: 500,
						fontSize: 30,
						color: colors.gray,
						opacity: ctaOpacity,
						marginTop: 20,
					}}
				>
					Follow for what&apos;s next →
				</div>
			</AbsoluteFill>
			<AbsoluteFill style={{backgroundColor: '#000', opacity: fadeOut}} />
		</AbsoluteFill>
	);
};
