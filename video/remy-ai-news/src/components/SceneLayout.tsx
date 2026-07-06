import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Background} from './Background';
import {Footer} from './Footer';
import {SAFE_ZONE} from '../theme';

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
					top: SAFE_ZONE.top,
					bottom: SAFE_ZONE.bottom,
					left: SAFE_ZONE.left,
					right: SAFE_ZONE.right,
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
