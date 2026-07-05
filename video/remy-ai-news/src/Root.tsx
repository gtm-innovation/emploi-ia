import React from 'react';
import {Composition} from 'remotion';
import {RemyReel} from './RemyReel';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="RemyReel"
				component={RemyReel}
				durationInFrames={1830}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
