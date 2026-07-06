import React from 'react';
import {SceneLayout} from '../components/SceneLayout';
import {EyebrowLabel} from '../components/EyebrowLabel';
import {StatNumber} from '../components/StatNumber';
import {BodyText} from '../components/BodyText';
import {TrendLine} from '../components/TrendLine';
import {MidSceneFlash} from '../components/MidSceneFlash';
import {colors} from '../theme';

export const Scene3Bill: React.FC = () => {
	return (
		<SceneLayout
			ghostNumber="03"
			slideNumber="03"
			overlay={<MidSceneFlash delay={78} />}
		>
			<EyebrowLabel text="MEANWHILE" color={colors.gold} />
			<StatNumber
				to={47}
				durationInFrames={24}
				delay={8}
				fontSize={216}
				format={(n) => `$${Math.round(n)}B`}
			/>
			<BodyText
				delay={38}
				fontSize={48}
				staggerFrames={1.5}
				segments={[
					{text: "Anthropic's annualized revenue — "},
					{text: "nearly double OpenAI's", emphasis: true},
					{text: '. Like Bugatti quietly outselling everyone two-to-one, no ads needed.'},
				]}
			/>
			<TrendLine ticker="ANTHROPIC ARR" changeLabel="2X OPENAI" delay={78} />
		</SceneLayout>
	);
};
