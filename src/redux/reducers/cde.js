import { types } from '../actions/cde';
import * as components from "../../components/index.js";

export const initialState = {
  components: Object.keys(components),
  selectedComponent: Object.keys(components)[0]
};

const cdeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_COMPONENT:
      const selectedComponent = { selectedComponent: action.payload };
      return { ...state, ...selectedComponent };

    default:
      return state;
  }
};

export default cdeReducer;
