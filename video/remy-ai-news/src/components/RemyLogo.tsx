import React from 'react';
import {Img, staticFile} from 'remotion';

// The brand's real gold chrome script logo, rendered as an image asset
// (public/remy-logo.webp) rather than a CSS approximation.
const LOGO_ASPECT_RATIO = 700 / 328;

export const RemyLogo: React.FC<{
	fontSize: number;
	style?: React.CSSProperties;
}> = ({fontSize, style}) => {
	const height = fontSize;
	const width = height * LOGO_ASPECT_RATIO;

	return (
		<Img
			src={staticFile('remy-logo.webp')}
			style={{
				height,
				width,
				objectFit: 'contain',
				filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.45))',
				...style,
			}}
		/>
	);
};
