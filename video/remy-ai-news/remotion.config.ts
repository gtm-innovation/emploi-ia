import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setBrowserExecutable(
	'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'
);
Config.setChromiumIgnoreCertificateErrors(true);
