import React from 'react';
import {Composition} from 'remotion';
import {RemyReel} from './RemyReel';
import {TOTAL_DURATION} from './timeline';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="RemyReel"
				component={RemyReel}
				durationInFrames={TOTAL_DURATION}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
