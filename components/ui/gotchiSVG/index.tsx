import { useAavegotchi } from "context/AavegotchiContext";
import { useEffect, useState } from "react";
import { useDiamondCall } from "actions/web3";
import { useMoralis } from "react-moralis";
import {
  convertInlineSVGToBlobURL,
  customiseSvg,
  CustomiseOptions,
} from "utils/aavegotchi";
import { Tuple } from "types";

interface Props {
  tokenId: string;
  options?: CustomiseOptions;
}

export const GotchiSVG = ({ tokenId, options }: Props) => {
  const { web3, isWeb3Enabled } = useMoralis();
  const {
    state: { usersAavegotchis },
    dispatch,
  } = useAavegotchi();
  const [svg, setSvg] = useState<string>();

  const fetchGotchiSvg = async (id: string, isOwner: boolean) => {
    try {
      const res = await useDiamondCall<Tuple<string, 4>>(web3, {
        name: "getAavegotchiSideSvgs",
        parameters: [id],
      });
      if (isOwner) {
        dispatch({
          type: "UPDATE_AAVEGOTCHI_SVG",
          tokenId: id,
          svg: res,
        });
      } else {
        setSvg(options ? customiseSvg(res[0], options) : res[0]);
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        error,
      });
    }
  };

  useEffect(() => {
    if (usersAavegotchis) {
      const gotchis = [...usersAavegotchis];
      const selectedGotchi = gotchis.find((gotchi) => gotchi.id === tokenId);

      if (selectedGotchi?.svg) {
        setSvg(
          options
            ? customiseSvg(
                selectedGotchi.svg[0],
                options,
                selectedGotchi.equippedWearables
              )
            : selectedGotchi.svg[0]
        );
      } else if (isWeb3Enabled) {
        fetchGotchiSvg(tokenId, !!selectedGotchi);
      }
    }
  }, [tokenId, usersAavegotchis, isWeb3Enabled, options]);

  return (
    <img
      src={svg ? convertInlineSVGToBlobURL(svg) : "/assets/gifs/loading.gif"}
      height="100%"
      width="100%"
    />
  );
};
