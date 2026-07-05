import React from 'react';
import {SceneLayout} from '../components/SceneLayout';
import {EyebrowLabel} from '../components/EyebrowLabel';
import {StatNumber} from '../components/StatNumber';
import {BodyText} from '../components/BodyText';
import {ComparisonBars} from '../components/ComparisonBars';
import {MidSceneFlash} from '../components/MidSceneFlash';
import {colors} from '../theme';

export const Scene2Valuation: React.FC = () => {
	return (
		<SceneLayout
			ghostNumber="02"
			slideNumber="02"
			overlay={<MidSceneFlash delay={78} />}
		>
			<EyebrowLabel text="WHY THEY'RE LEAVING" color={colors.gold} />
			<StatNumber
				to={965}
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
					{text: "Anthropic's valuation, which just "},
					{text: 'overtook OpenAI', emphasis: true},
					{
						text: '. Pre-IPO equity there is worth more than a Google paycheck.',
					},
				]}
			/>
			<ComparisonBars
				delay={78}
				maxValue={965}
				items={[
					{
						label: 'Anthropic',
						value: 965,
						displayValue: '$965B',
						color: colors.gold,
						emphasis: true,
					},
					{
						label: 'OpenAI',
						value: 852,
						displayValue: '$852B',
						color: colors.gray,
					},
				]}
			/>
		</SceneLayout>
	);
};
