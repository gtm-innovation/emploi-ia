import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadScript} from '@remotion/google-fonts/AlexBrush';

const {fontFamily: interFamily} = loadInter('normal', {
	weights: ['400', '700', '800'],
	subsets: ['latin'],
	ignoreTooManyRequestsWarning: true,
});
const {fontFamily: scriptFamily} = loadScript('normal', {
	subsets: ['latin'],
	ignoreTooManyRequestsWarning: true,
});

export const colors = {
	bg: '#0a0a0a',
	bgGhost: '#141414',
	gold: '#d9b36c',
	goldBright: '#f0d999',
	white: '#f5f5f2',
	gray: '#8a8fa3',
};

export const fonts = {
	sans: interFamily,
	script: scriptFamily,
};

export const GOLD_GRADIENT = `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldBright} 100%)`;
