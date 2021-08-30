export interface Tuple<T extends any, L extends number> extends Array<T> {
  0: T;
  length: L;
}

export interface CustomError extends Error {
  status?: number;
}

export interface Aavegotchi {
  id: string;
  name: string;
  withSetsNumericTraits: Tuple<number, 6>;
  equippedWearables: Tuple<number, 16>;
  svg?: string;
}

export interface AavegotchiGameObject extends Aavegotchi {
  spritesheetKey: string;
  svg: string;
}