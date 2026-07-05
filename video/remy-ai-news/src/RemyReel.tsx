import React from 'react';
import {Series} from 'remotion';
import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene2Valuation} from './scenes/Scene2Valuation';
import {Scene3Bill} from './scenes/Scene3Bill';
import {Scene4Reframe} from './scenes/Scene4Reframe';
import {Scene5Risk} from './scenes/Scene5Risk';
import {Scene6Outro} from './scenes/Scene6Outro';

export const RemyReel: React.FC = () => {
	return (
		<Series>
			<Series.Sequence durationInFrames={120}>
				<Scene1Hook />
			</Series.Sequence>
			<Series.Sequence durationInFrames={360}>
				<Scene2Valuation />
			</Series.Sequence>
			<Series.Sequence durationInFrames={360}>
				<Scene3Bill />
			</Series.Sequence>
			<Series.Sequence durationInFrames={300}>
				<Scene4Reframe />
			</Series.Sequence>
			<Series.Sequence durationInFrames={420}>
				<Scene5Risk />
			</Series.Sequence>
			<Series.Sequence durationInFrames={270}>
				<Scene6Outro />
			</Series.Sequence>
		</Series>
	);
};
