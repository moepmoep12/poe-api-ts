export const ATTRIBUTE_VALUES = ["A", "D", "DV", "G", "I", "S"] as const;
export type Attribute = typeof ATTRIBUTE_VALUES[number];
