export const COLOUR_VALUES = ["S", "D", "I", "G"] as const;
export type ItemColour = typeof COLOUR_VALUES[number];
