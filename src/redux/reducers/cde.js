import { types } from "../actions/cde";
import * as components from "../../components/index.js";

// Rewrite so that impossible states are impossible
export const initialState = {
  componentNames: Object.keys(components),
  selectedComponent: Object.keys(components)[0],

  snapshotNames: ["default"],
  selectedSnapshot: "default",

  snapshotChanges: {},
  fakeProps: {},
  customTypes: {},
  propsAsts: {},

  // selectedTab only recomputed off of tabs, which are static
  tabs: ["Component", "Custom", "Types", "Code"],
  selectedTab: "Component",

};

// Currently clearing snapshotChanges on a number of changes
// Find a better way
const cdeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SELECT_COMPONENT:
      if (state.selectedComponent === payload.key) return state;
      const selectedComponent = { selectedComponent: payload.key };
      return {
        ...state,
        ...selectedComponent,
        ...{ selectedSnapshot: "default" }
      };

    case types.SELECT_TAB:
      if (state.selectedTab === payload) return state;
      return {
        ...state,
        ...{ selectedTab: payload },
        ...{ snapshotChanges: {} }
      };

    case types.SELECT_SNAPSHOT:
      if (state.snapshot === payload.key) return state;
      return { ...state, ...{ selectedSnapshot: payload.key } };

    case types.UPDATE_SNAPSHOT:
      const snapshotChanges = {
        ...state.snapshotChanges,
        ...payload
      };

      return { ...state, snapshotChanges };

  case types.FETCH_COMPONENT_DATA:
    return state;

  case types.FETCH_COMPONENT_DATA_SUCCESS:
    return { ...state, ...payload };
    return state;

  case types.FETCH_COMPONENT_DATA_FAILURE:
    return state;

  case types.HANDLE_SNAPSHOTS:
    return state;

  case types.HANDLE_SNAPSHOTS_SUCCESS:
    return { ...state, ...payload };

  case types.HANDLE_SNAPSHOTS_FAILURE:
    return state;





    // case types.FETCH_FAKE_PROPS:
    //   return state;

    // case types.FETCH_FAKE_PROPS_SUCCESS:
    //   const fakeProps = {
    //     ...state.fakeProps,
    //     ...payload
    //   };

    //   return { ...state, fakeProps };

    // case types.FETCH_FAKE_PROPS_FAILURE:
    //   return state;

    // case types.FETCH_PROPS_ASTS:
    //   return state;

    // case types.FETCH_PROPS_ASTS_SUCCESS:
    //   const propsAsts = {
    //     ...state.propsAsts,
    //     ...payload
    //   };

    //   return { ...state, propsAsts };

    // case types.FETCH_PROPS_ASTS_FAILURE:
    //   return state;

    // case types.FETCH_CUSTOM_TYPES:
    //   return state;

    // case types.FETCH_CUSTOM_TYPES_SUCCESS:
    //   return { ...state, ...payload, snapshotChanges: {} };

    // case types.FETCH_CUSTOM_TYPES_FAILURE:
    //   return state;

    // case types.POST_CUSTOM_TYPES:
    //   return { ...state, snapshotChanges: {} };

    // case types.POST_CUSTOM_TYPES_SUCCESS:
    //   return { ...state, ...{ customTypes: payload }, snapshotChanges: {} };

    // case types.POST_CUSTOM_TYPES_FAILURE:
    //   return state;

    // case types.DEL_CUSTOM_TYPES:
    //   return { ...state, snapshotChanges: {} };

    // case types.DEL_CUSTOM_TYPES_SUCCESS:
    //   return {
    //     ...state,
    //     ...payload,
    //     snapshotChanges: {},
    //     selectedSnapshot: "default"
    //   };

    // case types.DEL_CUSTOM_TYPES_FAILURE:
    //   return state;

    default:
      return state;
  }
};

export default cdeReducer;
