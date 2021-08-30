import { State } from "./initialState";

export type Action =
  | {
      type: "SET_USERS_AAVEGOTCHIS";
      usersAavegotchis: State["usersAavegotchis"];
    }
  | {
      type: "SET_SELECTED_AAVEGOTCHI";
      selectedAavegotchiId: State["selectedAavegotchiId"];
    }
  | {
      type: "START_ASYNC";
    }
  | {
      type: "SET_ERROR";
      error: State["error"];
    }
  | {
      type: "SET_NETWORK_ID";
      networkId: State["networkId"];
    }
  | {
      type: "END_ASYNC";
    }
  | {
      type: "UPDATE_AAVEGOTCHI_SVG";
      tokenId: string;
      svg: string;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USERS_AAVEGOTCHIS": {
      return {
        ...state,
        usersAavegotchis: action.usersAavegotchis,
      };
    }
    case "SET_SELECTED_AAVEGOTCHI": {
      return {
        ...state,
        selectedAavegotchiId: action.selectedAavegotchiId,
      };
    }
    case "START_ASYNC": {
      return {
        ...state,
        loading: true,
      };
    }
    case "END_ASYNC": {
      return {
        ...state,
        loading: false,
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case "SET_NETWORK_ID": {
      return {
        ...state,
        networkId: action.networkId,
      };
    }
    case "UPDATE_AAVEGOTCHI_SVG": {
      if (!state.usersAavegotchis) throw "No Aavegotchis to update."
      const copyGotchiState = [...state.usersAavegotchis];
      const updatedGotchiIndex = copyGotchiState.findIndex(gotchi => gotchi.id === action.tokenId);

      if (updatedGotchiIndex >= 0) {
        copyGotchiState[updatedGotchiIndex].svg = action.svg;
        return {
          ...state,
          usersAavegotchis: copyGotchiState
        }
      } else {
        throw "Selected gotchi doesn't exist in state."
      }
    }
    default:
      throw "Bad action type";
  }
};
