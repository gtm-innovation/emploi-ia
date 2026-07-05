import React from 'react';
import {SceneLayout} from '../components/SceneLayout';
import {EyebrowLabel} from '../components/EyebrowLabel';
import {Headline} from '../components/Headline';
import {colors} from '../theme';

export const Scene1Hook: React.FC = () => {
	return (
		<SceneLayout ghostNumber="01" slideNumber="01">
			<EyebrowLabel text="AI NEWS · JULY 5" color={colors.gray} />
			<div style={{marginTop: 28}}>
				<Headline
					fontSize={104}
					delay={6}
					lines={[
						{text: 'Google just lost'},
						{text: 'its brain.', color: colors.gold},
					]}
				/>
			</div>
		</SceneLayout>
	);
};
