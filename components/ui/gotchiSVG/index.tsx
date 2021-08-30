import { useAavegotchi } from "context/AavegotchiContext";
import { useEffect, useState } from "react";
import { useDiamondCall } from "actions/web3";
import { useMoralis } from "react-moralis";
import { convertInlineSVGToBlobURL, customiseSvg, CustomiseOptions} from 'utils/aavegotchi';

interface Props {
  tokenId: string;
  options?: CustomiseOptions;
}

export const GotchiSVG = ({ tokenId, options }: Props) => {
  const { web3, isWeb3Enabled } = useMoralis();
  const { state: { usersAavegotchis }, dispatch} = useAavegotchi();
  const [ svg, setSvg ] = useState<string>();

  const fetchGotchiSvg = async (id: string, isOwner: boolean) => {
    try {
      const res = await useDiamondCall<string>(web3, { name: "getAavegotchiSvg", parameters: [id]});
      if (isOwner) {
        dispatch({
          type: "UPDATE_AAVEGOTCHI_SVG",
          tokenId: id,
          svg: res
        })
      } else {
        setSvg(options ? customiseSvg(res, options) : res)
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        error
      })
    }
  }

  useEffect(() => {
    if (usersAavegotchis) {
      const gotchis = [...usersAavegotchis]
      const selectedGotchi = gotchis.find(gotchi => gotchi.id === tokenId);

      if (selectedGotchi?.svg) {
        setSvg(options ? customiseSvg(selectedGotchi.svg, options, selectedGotchi.equippedWearables) : selectedGotchi.svg);
      } else if (isWeb3Enabled) {
        fetchGotchiSvg(tokenId, !!selectedGotchi);
      }
    }
  }, [tokenId, usersAavegotchis, isWeb3Enabled, options])

  return (
    <img src={svg ? convertInlineSVGToBlobURL(svg) : "/assets/gifs/loading.gif"} height="100%" width="100%" />
  )
}