import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from 'remotion';
import {Background} from '../components/Background';
import {RemyLogo} from '../components/RemyLogo';
import {colors, fonts} from '../theme';
import {SCENE_DURATIONS} from '../timeline';

const SCENE_DURATION = SCENE_DURATIONS[5];

// Quick rolodex flip back through every scene's ghost number (01→06) —
// a visual callback to the opening that rewards a rewatch/loop.
const GHOST_SEQUENCE = ['01', '02', '03', '04', '05', '06'];

export const Scene6Outro: React.FC = () => {
	const frame = useCurrentFrame();
	const ghostFlipIndex = Math.min(Math.floor(frame / 4), GHOST_SEQUENCE.length - 1);
	const ghostNumber = GHOST_SEQUENCE[ghostFlipIndex];

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

	// A warm gold spotlight that blooms behind the logo as it lands, in
	// brand tones rather than a stock light-leak's arbitrary hue.
	const glowOpacity = interpolate(frame, [0, 30, 70, 100], [0, 0.3, 0.3, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill>
			<Background ghostNumber={ghostNumber} />
			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: '40%',
					width: 760,
					height: 760,
					transform: 'translate(-50%, -50%)',
					background: `radial-gradient(circle, ${colors.goldBright} 0%, ${colors.gold} 35%, transparent 70%)`,
					filter: 'blur(100px)',
					opacity: glowOpacity,
					mixBlendMode: 'screen',
					pointerEvents: 'none',
				}}
			/>
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
				<RemyLogo
					fontSize={190}
					style={{
						opacity: logoOpacity,
						transform: `scale(${logoScale})`,
					}}
				/>
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
