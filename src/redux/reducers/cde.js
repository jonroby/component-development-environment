import { types } from "../actions/cde";
import * as components from "../../components/index.js";

// Rewrite so that impossible states are impossible
export const initialState = {
  componentNames: Object.keys(components),
  selectedComponent: Object.keys(components)[0],

  componentSearchInput: "",

  snapshotNames: ["default"],
  selectedSnapshot: "default",

  snapshotChanges: {},
  snapshotStatus: {
    action: "",
    status: "none"
  },

  fakeProps: {},
  customTypes: {},
  propsAsts: {},

  // selectedTab only recomputed off of tabs, which are static
  tabs: ["Component", "Custom", "Types", "Code"],
  selectedTab: "Component"
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
        ...{ selectedSnapshot: "default" },
        ...{ snapshotChanges: {} }
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
      return {
        ...state,
        ...{ selectedSnapshot: payload.key },
        ...{ snapshotChanges: {} }
      };

    case types.UPDATE_SNAPSHOT:
      const newSnapshotChanges = Object.keys(payload).reduce((acc, curr) => {
        return {
          [curr]: {
            ...state.snapshotChanges[curr],
            ...payload[curr]
          }
        };
      }, {});

      const snapshotChanges = {
        ...state.snapshotChanges,
        ...newSnapshotChanges
      };

      return { ...state, snapshotChanges };

    case types.UPDATE_COMPONENT_SEARCH_INPUT:
      return { ...state, componentSearchInput: payload };

    case types.FETCH_COMPONENT_DATA:
      return state;

    case types.FETCH_COMPONENT_DATA_SUCCESS:
      return { ...state, ...payload, ...{ snapshotChanges: {} } };
      return state;

    case types.FETCH_COMPONENT_DATA_FAILURE:
      return state;

    case types.HANDLE_SNAPSHOTS:
      return {
        ...state,
        snapshotStatus: { action: payload.restMethod, status: "loading" }
      };

    case types.HANDLE_SNAPSHOTS_SUCCESS:
      return {
        ...state,
        ...payload,
        snapshotStatus: { ...state.snapshotStatus, status: "success" },
        ...{ snapshotChanges: {} }
      };

    case types.HANDLE_SNAPSHOTS_FAILURE:
      return {
        ...state,
        snapshotSuccess: { ...state.snapshotStatus, status: "failure" }
      };

    default:
      return state;
  }
};

export const getVisibleComponentNames = state => {
  if (!state.cde.componentNames) {
    return [];
  } else if (state.cde.searchComponentNameInput === "") {
    return state.componentNames;
  } else {
    return state.cde.componentNames.filter(componentName => {
      return (
        componentName
          .toLowerCase()
          .match(state.cde.componentSearchInput.toLowerCase()) !== null
      );
    });
  }
};

export default cdeReducer;
