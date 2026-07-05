import React from 'react';
import {AbsoluteFill} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene2Valuation} from './scenes/Scene2Valuation';
import {Scene3Bill} from './scenes/Scene3Bill';
import {Scene4Reframe} from './scenes/Scene4Reframe';
import {Scene5Risk} from './scenes/Scene5Risk';
import {Scene6Outro} from './scenes/Scene6Outro';
import {ParticleField} from './components/ParticleField';
import {SCENE_DURATIONS, TRANSITION_DURATION} from './timeline';

const timing = linearTiming({durationInFrames: TRANSITION_DURATION});

export const RemyReel: React.FC = () => {
	return (
		<AbsoluteFill>
			<TransitionSeries>
				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[0]}>
					<Scene1Hook />
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					presentation={slide({direction: 'from-bottom'})}
					timing={timing}
				/>
				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[1]}>
					<Scene2Valuation />
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition presentation={fade()} timing={timing} />
				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[2]}>
					<Scene3Bill />
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					presentation={slide({direction: 'from-right'})}
					timing={timing}
				/>
				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[3]}>
					<Scene4Reframe />
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition presentation={fade()} timing={timing} />
				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[4]}>
					<Scene5Risk />
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition presentation={fade()} timing={timing} />
				<TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[5]}>
					<Scene6Outro />
				</TransitionSeries.Sequence>
			</TransitionSeries>
			<ParticleField />
		</AbsoluteFill>
	);
};
