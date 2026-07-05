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
			<StatNumber
				to={-270}
				durationInFrames={24}
				delay={8}
				fontSize={216}
				format={(n) => `-$${Math.round(Math.abs(n))}B`}
			/>
			<BodyText
				delay={38}
				fontSize={48}
				staggerFrames={1.5}
				segments={[
					{text: 'Like losing your goalkeeper at halftime of a final. Alphabet '},
					{text: 'lost that in two trading sessions', emphasis: true},
					{text: ' — the price of watching its best researchers walk out.'},
				]}
			/>
			<TrendLine ticker="GOOGL" changeLabel="-7.2%" delay={78} />
		</SceneLayout>
	);
};
