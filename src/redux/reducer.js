import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./actionTypes";
import { initialState } from "../utils/constant";

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      state = {
        ...state,
        Card: [
          ...state.Card,action.payload,
        ],
      };
      return state;

    case UPDATE_ITEM:
      return { ...state };

    case DELETE_ITEM:
      return { ...state };

    default:
      return state;
  }
}

export default reducer;
