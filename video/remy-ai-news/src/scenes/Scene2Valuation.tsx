import React from 'react';
import {SceneLayout} from '../components/SceneLayout';
import {EyebrowLabel} from '../components/EyebrowLabel';
import {StatNumber} from '../components/StatNumber';
import {BodyText} from '../components/BodyText';
import {ComparisonBars} from '../components/ComparisonBars';
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
			<div style={{marginTop: 76}}>
				<ComparisonBars
					delay={130}
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
			</div>
		</SceneLayout>
	);
};
