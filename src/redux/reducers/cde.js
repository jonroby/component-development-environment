import { types } from '../actions/cde';
import * as components from "../../components/index.js";

// Rewrite so that impossible states are impossible
export const initialState = {
  componentNames: Object.keys(components),
  selectedComponent: Object.keys(components)[0],
  fakeProps: {},
  snapshots: ['default'],
  selectedSnapshot: 'default',
  tabs: ['Component', 'Custom', 'Types', 'Code'],
  selectedTab: 'Component',
  propsAsts: {}
};

const cdeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SELECT_COMPONENT:
      const selectedComponent = { selectedComponent: payload };
      return { ...state, ...selectedComponent };

    case types.FETCH_FAKE_PROPS:
      return state;

    case types.FETCH_FAKE_PROPS_SUCCESS:
      const fakeProps = {
        ...state.fakeProps,
        ...payload,
      }

      return { ...state, fakeProps };

    case types.FETCH_FAKE_PROPS_FAILURE:
      return state;

    case types.FETCH_PROPS_ASTS:
      return state;

    case types.FETCH_PROPS_ASTS_SUCCESS:
      const propsAsts = {
        ...state.propsAsts,
        ...payload,
      }

      return { ...state, propsAsts };

    case types.FETCH_PROPS_ASTS_FAILURE:
      return state;

    case types.SELECT_TAB:
      return { ...state, ...{ selectedTab: payload }};

    default:
      return state;
  }
};

export default cdeReducer;
