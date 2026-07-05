import React from 'react';
import {SceneLayout} from '../components/SceneLayout';
import {EyebrowLabel} from '../components/EyebrowLabel';
import {StatNumber} from '../components/StatNumber';
import {BodyText} from '../components/BodyText';
import {TrendLine} from '../components/TrendLine';
import {colors} from '../theme';

export const Scene3Bill: React.FC = () => {
	return (
		<SceneLayout ghostNumber="03" slideNumber="03">
			<EyebrowLabel text="THE BILL" color={colors.gold} />
			<div style={{marginTop: 24}}>
				<StatNumber
					to={-270}
					durationInFrames={36}
					delay={14}
					fontSize={196}
					format={(n) => `-$${Math.round(Math.abs(n))}B`}
				/>
			</div>
			<div style={{marginTop: 36}}>
				<BodyText
					delay={68}
					fontSize={42}
					segments={[
						{text: 'Like losing your goalkeeper at halftime of a final. Alphabet '},
						{text: 'lost that in two trading sessions', emphasis: true},
						{text: ' — the price of watching its best researchers walk out.'},
					]}
				/>
			</div>
			<div style={{marginTop: 76}}>
				<TrendLine ticker="GOOGL" changeLabel="-7.2%" delay={130} />
			</div>
		</SceneLayout>
	);
};
