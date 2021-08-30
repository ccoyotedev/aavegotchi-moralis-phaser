import React, { createContext, useReducer, useContext } from "react";
import { State, initialState } from "./initialState";
import { useSubgraph } from 'actions/subgraph';
import { AavegotchisOfOwner, getAllAavegotchisOfOwner } from 'actions/subgraph/queries';
import { Action, reducer } from "./reducer";
import { Tuple, Aavegotchi } from "types";
import { Collaterals, collateralToAddress } from "utils/vars";
import { useDiamondCall } from "actions/web3";

const AavegotchiContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

interface GotchiOptions {
  haunt?: "0" | "1",
  numericTraits?: Tuple<number, 6>,
  wearables?: Tuple<number, 16>,
  collateral?: Collaterals,
  name?: string,
  id?: string,
}

export const updateWithPreviewAavegotchis = async (dispatch: React.Dispatch<Action>, web3: any, options: Array<GotchiOptions>) => {
  try {
    const gotchis = await Promise.all(options.map(async (option) => {
      const withSetsNumericTraits: Tuple<number, 6> = option.numericTraits || [50, 50, 50, 50, 50, 50];
      const equippedWearables: Tuple<number, 16> = option.wearables || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const svg = await useDiamondCall<string>(web3, {
        name: "previewAavegotchi",
        parameters: [
          option?.haunt || "0",
          option?.collateral ? collateralToAddress[option.collateral] : collateralToAddress["aWETH"],
          withSetsNumericTraits,
          equippedWearables,
        ],
      });
      return {
        id: option.id || '0000',
        name: option.name || 'Aavegotchi',
        withSetsNumericTraits,
        svg: svg,
        equippedWearables,
        status: 3,
      }
    }))
    dispatch({ type: "SET_USERS_AAVEGOTCHIS", usersAavegotchis: gotchis });
    dispatch({ type: "SET_SELECTED_AAVEGOTCHI", selectedAavegotchiId: gotchis[0]?.id })
  } catch (err) {
    dispatch({
      type: "SET_ERROR",
      error: err,
    })
  }
}

const updateAavegotchis = async (dispatch: React.Dispatch<Action>, owner: string) => {
  try {
    const res = await useSubgraph<AavegotchisOfOwner>(getAllAavegotchisOfOwner(owner));
    dispatch({ type: "SET_USERS_AAVEGOTCHIS", usersAavegotchis: res.aavegotchis });
    dispatch({ type: "SET_SELECTED_AAVEGOTCHI", selectedAavegotchiId: res.aavegotchis[0]?.id })
  } catch (err) {
    dispatch({
      type: "SET_ERROR",
      error: err,
    })
  }
}

const updateNetworkId = async (dispatch: React.Dispatch<Action>, web3: any) => {
  dispatch({ type: "START_ASYNC" });
  try {
    const networkId = await web3.eth.net.getId();
    dispatch({ type: "SET_NETWORK_ID", networkId });
    dispatch({ type: "END_ASYNC" });
  } catch (error) {
    dispatch({ type: "SET_ERROR", error })
  }
}

const AavegotchiContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <AavegotchiContext.Provider value={value}>
      {children}
    </AavegotchiContext.Provider>
  );
};

const useAavegotchi = () => useContext(AavegotchiContext);

export default AavegotchiContextProvider;
export { useAavegotchi, updateNetworkId, updateAavegotchis };
