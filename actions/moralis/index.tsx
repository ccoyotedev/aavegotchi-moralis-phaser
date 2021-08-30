interface AavegotchiMoralis {
  attributes: Array<{
    trait_type: string;
    value:
      | string
      | {
          hex: string;
          type: "BigNumber";
        };
  }>;
  description: string;
  external_url: string;
  image_data: string;
  name: string;
}

export const getAavegotchisFromMoralis = async (
  moralis: any,
  address: string
): Promise<Array<AavegotchiMoralis>> => {
  const options = {
    chain: "matic",
    address,
  };

  try {
    const nfts = await moralis.Web3.getNFTs(options);
    const erc721 = nfts.filter((item) => item.contract_type === "ERC721");

    const results = await Promise.all<AavegotchiMoralis>(
      erc721.map(async ({ token_uri }) => {
        const res = await fetch(token_uri);
        const metadata = await res.json();
        return metadata;
      })
    );
    return results;
  } catch (err) {
    throw err;
  }
};
