export const TRANSITION_DURATION = 10;

export const SCENE_DURATIONS = [110, 280, 280, 240, 300, 250] as const;

export const TOTAL_DURATION =
	SCENE_DURATIONS.reduce((a, b) => a + b, 0) -
	TRANSITION_DURATION * (SCENE_DURATIONS.length - 1);
