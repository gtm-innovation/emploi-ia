import React from 'react';
import {fonts} from '../theme';

// A CSS approximation of the brand's 3D chrome/gold-tube script logo:
// a vertical gradient running dark-gold → bright-gold → white highlight →
// bright-gold → dark-gold clipped to the text, mimicking the specular
// band on a rounded metal tube.
export const RemyLogo: React.FC<{
	fontSize: number;
	style?: React.CSSProperties;
}> = ({fontSize, style}) => {
	return (
		<div
			style={{
				fontFamily: fonts.script,
				fontSize,
				lineHeight: 1,
				display: 'inline-block',
				background:
					'linear-gradient(180deg, #6b4e14 0%, #caa542 22%, #fff8e0 46%, #fff8e0 56%, #caa542 80%, #6b4e14 100%)',
				WebkitBackgroundClip: 'text',
				backgroundClip: 'text',
				color: 'transparent',
				WebkitTextStroke: `${Math.max(1, fontSize * 0.004)}px rgba(80,55,10,0.5)`,
				filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.45))',
				...style,
			}}
		>
			Remy
		</div>
	);
};
