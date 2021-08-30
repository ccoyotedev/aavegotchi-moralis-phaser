import { Aavegotchi } from "types";

export interface AavegotchisOfOwner {
  aavegotchis: Array<Aavegotchi>
}

export const getAllAavegotchisOfOwner = (owner: string) => {
  const query = `
    {
      aavegotchis(first: 500, orderBy: gotchiId, where: { owner:"${owner.toLowerCase()}", status: 3 }) {
        id
        name
        withSetsNumericTraits
        equippedWearables
      }
    }
  `
  return query;
}