export const SOCKET_COLOUR_VALUES = ["A", "B", "DV", "G", "R", "W"] as const;
export type SocketColour = typeof SOCKET_COLOUR_VALUES[number];
