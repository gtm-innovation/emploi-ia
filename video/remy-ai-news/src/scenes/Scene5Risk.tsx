import React from 'react';
import {SceneLayout} from '../components/SceneLayout';
import {EyebrowLabel} from '../components/EyebrowLabel';
import {StatNumber} from '../components/StatNumber';
import {BodyText} from '../components/BodyText';
import {RadialProgress} from '../components/RadialProgress';
import {colors} from '../theme';

export const Scene5Risk: React.FC = () => {
	return (
		<SceneLayout ghostNumber="05" slideNumber="05">
			<EyebrowLabel text="THE RISK" color={colors.gold} />
			<StatNumber
				to={90}
				durationInFrames={20}
				delay={8}
				fontSize={216}
				format={(n) => `${Math.round(n)}%`}
			/>
			<BodyText
				delay={34}
				fontSize={48}
				staggerFrames={1.5}
				segments={[
					{text: '90% of professionals', emphasis: true},
					{
						text: ' will move too late. I built the exact framework to turn this shift into an edge, not a threat.',
					},
				]}
			/>
			<RadialProgress
				to={90}
				durationInFrames={24}
				delay={78}
				captionLines={['MOVE', 'TOO LATE']}
			/>
		</SceneLayout>
	);
};
