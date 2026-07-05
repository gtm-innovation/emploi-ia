import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

// A handful of turbulence seeds cycled per-frame — real film grain flickers
// frame to frame rather than sitting as a static texture.
const SEED_COUNT = 6;

export const FilmGrain: React.FC = () => {
	const frame = useCurrentFrame();
	const seed = frame % SEED_COUNT;

	return (
		<AbsoluteFill
			style={{pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.05}}
		>
			<svg width="100%" height="100%">
				<filter id="film-grain">
					<feTurbulence
						type="fractalNoise"
						baseFrequency={0.85}
						numOctaves={2}
						seed={seed}
						stitchTiles="stitch"
					/>
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
					/>
				</filter>
				<rect width="100%" height="100%" filter="url(#film-grain)" />
			</svg>
		</AbsoluteFill>
	);
};
