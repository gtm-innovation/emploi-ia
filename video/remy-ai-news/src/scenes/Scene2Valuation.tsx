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
			<EyebrowLabel text="WHY THE RUSH" color={colors.gold} />
			<StatNumber
				to={730}
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
					{text: "OpenAI's targeted IPO valuation — "},
					{text: 'below its last private round of $852B', emphasis: true},
					{
						text: '. The market already smells doubt.',
					},
				]}
			/>
			<ComparisonBars
				delay={78}
				maxValue={852}
				items={[
					{
						label: 'Last private round',
						value: 852,
						displayValue: '$852B',
						color: colors.gray,
					},
					{
						label: 'IPO target',
						value: 730,
						displayValue: '$730B',
						color: colors.gold,
						emphasis: true,
					},
				]}
			/>
		</SceneLayout>
	);
};
