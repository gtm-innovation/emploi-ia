import React from 'react';
import {SceneLayout} from '../components/SceneLayout';
import {EyebrowLabel} from '../components/EyebrowLabel';
import {StatNumber} from '../components/StatNumber';
import {BodyText} from '../components/BodyText';
import {colors} from '../theme';

export const Scene2Valuation: React.FC = () => {
	return (
		<SceneLayout ghostNumber="02" slideNumber="02">
			<EyebrowLabel text="WHY THEY'RE LEAVING" color={colors.gold} />
			<div style={{marginTop: 24}}>
				<StatNumber
					to={965}
					durationInFrames={36}
					delay={14}
					fontSize={196}
					format={(n) => `$${Math.round(n)}B`}
				/>
			</div>
			<div style={{marginTop: 36}}>
				<BodyText
					delay={68}
					fontSize={42}
					segments={[
						{text: "Anthropic's valuation, which just "},
						{text: 'overtook OpenAI', emphasis: true},
						{
							text: '. Pre-IPO equity there is worth more than a Google paycheck.',
						},
					]}
				/>
			</div>
		</SceneLayout>
	);
};
