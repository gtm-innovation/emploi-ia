import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Background} from './Background';
import {Footer} from './Footer';

export const SceneLayout: React.FC<{
	ghostNumber: string;
	slideNumber: string;
	children: React.ReactNode;
	showFooter?: boolean;
	overlay?: React.ReactNode;
}> = ({ghostNumber, slideNumber, children, showFooter = true, overlay}) => {
	return (
		<AbsoluteFill>
			<Background ghostNumber={ghostNumber} />
			<div
				style={{
					position: 'absolute',
					top: 100,
					bottom: 220,
					left: 64,
					right: 64,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					gap: 40,
				}}
			>
				{children}
			</div>
			{overlay}
			{showFooter ? <Footer slideNumber={slideNumber} /> : null}
		</AbsoluteFill>
	);
};
