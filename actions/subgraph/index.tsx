import { request } from "graphql-request";

const coreURI =
  "https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic";

export const useSubgraph = async <T extends object>(
  query: string,
  uri?: string
): Promise<T> => {
  try {
    const data = await request<T>(uri || coreURI, query);
    return data;
  } catch (err) {
    throw {
      status: 400,
      name: "Subgraph error",
      message: err.response.errors[0].message,
    };
  }
};