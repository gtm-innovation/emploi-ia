import React, {useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors} from '../theme';

// Deterministic pseudo-random so renders are reproducible frame-to-frame.
const seededRandom = (seed: number) => {
	const x = Math.sin(seed * 999.7) * 10000;
	return x - Math.floor(x);
};

type Particle = {
	x: number;
	yStart: number;
	size: number;
	speed: number;
	swayAmp: number;
	swaySpeed: number;
	phase: number;
	opacityBase: number;
};

const PARTICLE_COUNT = 22;

export const ParticleField: React.FC = () => {
	const frame = useCurrentFrame();
	const {height, durationInFrames} = useVideoConfig();

	const particles: Particle[] = useMemo(() => {
		return new Array(PARTICLE_COUNT).fill(0).map((_, i) => ({
			x: seededRandom(i * 1.1) * 1080,
			yStart: seededRandom(i * 2.3) * height,
			size: 2 + seededRandom(i * 3.7) * 4,
			speed: 6 + seededRandom(i * 4.9) * 10,
			swayAmp: 10 + seededRandom(i * 5.3) * 24,
			swaySpeed: 0.008 + seededRandom(i * 6.1) * 0.01,
			phase: seededRandom(i * 7.9) * Math.PI * 2,
			opacityBase: 0.12 + seededRandom(i * 8.3) * 0.22,
		}));
	}, [height]);

	const globalFade = interpolate(
		frame,
		[0, 30, durationInFrames - 30, durationInFrames],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			{particles.map((p, i) => {
				const travelled = (frame * p.speed * 0.06) % (height + 80);
				const y = ((p.yStart + travelled) % (height + 80)) - 40;
				const sway = Math.sin(frame * p.swaySpeed + p.phase) * p.swayAmp;
				const twinkle =
					p.opacityBase +
					Math.sin(frame * 0.05 + p.phase) * p.opacityBase * 0.4;

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: p.x + sway,
							top: y,
							width: p.size,
							height: p.size,
							borderRadius: '50%',
							backgroundColor: colors.gold,
							opacity: Math.max(0, twinkle) * globalFade,
							filter: 'blur(0.5px)',
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};
