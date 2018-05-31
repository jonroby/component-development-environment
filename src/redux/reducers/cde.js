import { types } from '../actions/cde';
import * as components from "../../components/index.js";

export const initialState = {
  components: Object.keys(components),
  selectedComponent: Object.keys(components)[0]
};

const cdeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER:
      return state;
    case types.FETCH_USER_SUCCESS:
      return Object.assign({}, state, action.payload);
    case types.FETCH_USER_FAILED:
      return state;
    case types.FETCH_ANOTHER_THING:
      return state;

  

    default:
      return state;
  }
};

export default cdeReducer;
