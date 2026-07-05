export const TRANSITION_DURATION = 10;

export const SCENE_DURATIONS = [90, 190, 190, 200, 190, 200] as const;

export const TOTAL_DURATION =
	SCENE_DURATIONS.reduce((a, b) => a + b, 0) -
	TRANSITION_DURATION * (SCENE_DURATIONS.length - 1);
