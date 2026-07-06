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
				lines={[{text: 'Not an IPO.'}, {text: 'A verdict.'}]}
			/>
			<BodyText
				delay={26}
				fontSize={48}
				staggerFrames={2}
				segments={[
					{text: "The market just decided value isn't a story anymore — "},
					{text: "it's a bill", emphasis: true},
					{text: '. Every firm selling advice, law, or accounting already gets it.'},
				]}
			/>
			<IconRow
				delay={70}
				stagger={7}
				items={['Consultants', 'Lawyers', 'Accountants']}
			/>
		</SceneLayout>
	);
};
