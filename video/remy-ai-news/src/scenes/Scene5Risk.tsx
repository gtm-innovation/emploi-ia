import React from 'react';
import {SceneLayout} from '../components/SceneLayout';
import {EyebrowLabel} from '../components/EyebrowLabel';
import {StatNumber} from '../components/StatNumber';
import {BodyText} from '../components/BodyText';
import {colors} from '../theme';

export const Scene5Risk: React.FC = () => {
	return (
		<SceneLayout ghostNumber="05" slideNumber="05">
			<EyebrowLabel text="THE RISK" color={colors.gold} />
			<div style={{marginTop: 24}}>
				<StatNumber
					to={90}
					durationInFrames={30}
					delay={14}
					fontSize={196}
					format={(n) => `${Math.round(n)}%`}
				/>
			</div>
			<div style={{marginTop: 36}}>
				<BodyText
					delay={62}
					fontSize={42}
					segments={[
						{text: '90% of professionals', emphasis: true},
						{
							text: ' will move too late. I built the exact framework to turn this shift into an edge, not a threat.',
						},
					]}
				/>
			</div>
		</SceneLayout>
	);
};
