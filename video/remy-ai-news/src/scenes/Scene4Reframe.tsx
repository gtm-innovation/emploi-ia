import React from 'react';
import {SceneLayout} from '../components/SceneLayout';
import {Headline} from '../components/Headline';
import {BodyText} from '../components/BodyText';
import {IconRow} from '../components/IconRow';

export const Scene4Reframe: React.FC = () => {
	return (
		<SceneLayout ghostNumber="04" slideNumber="04">
			<Headline
				fontSize={104}
				delay={4}
				lines={[{text: 'Not an exodus.'}, {text: 'A forecast.'}]}
			/>
			<BodyText
				delay={26}
				fontSize={48}
				staggerFrames={2}
				segments={[
					{text: 'The market is betting AI research '},
					{text: 'decides who wins', emphasis: true},
					{text: '. Whole professions are about to be rewritten.'},
				]}
			/>
			<IconRow
				delay={70}
				stagger={7}
				items={['Accountants', 'Lawyers', 'Marketers', 'Doctors']}
			/>
		</SceneLayout>
	);
};
