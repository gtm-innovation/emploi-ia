import React from 'react';
import {SceneLayout} from '../components/SceneLayout';
import {Headline} from '../components/Headline';
import {BodyText} from '../components/BodyText';

export const Scene4Reframe: React.FC = () => {
	return (
		<SceneLayout ghostNumber="04" slideNumber="04">
			<Headline
				fontSize={92}
				delay={4}
				lines={[{text: 'Not an exodus.'}, {text: 'A forecast.'}]}
			/>
			<div style={{marginTop: 40}}>
				<BodyText
					delay={40}
					fontSize={42}
					staggerFrames={3}
					segments={[
						{text: 'The market is betting AI research '},
						{text: 'decides who wins', emphasis: true},
						{text: '. '},
						{text: 'Accountants,', emphasis: true},
						{text: 'lawyers,', emphasis: true},
						{text: 'marketers,', emphasis: true},
						{text: 'doctors', emphasis: true},
						{text: ' — all about to be rewritten.'},
					]}
				/>
			</div>
		</SceneLayout>
	);
};
