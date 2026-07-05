export const TRANSITION_DURATION = 10;

export const SCENE_DURATIONS = [130, 380, 380, 320, 440, 280] as const;

export const TOTAL_DURATION =
	SCENE_DURATIONS.reduce((a, b) => a + b, 0) -
	TRANSITION_DURATION * (SCENE_DURATIONS.length - 1);
