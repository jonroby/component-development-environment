export const types = {
  SELECT_COMPONENT: 'SELECT_COMPONENT',
  SELECT_TAB: 'SELECT_TAB',
  SELECT_SNAPSHOT: 'SELECT_SNAPSHOT',
  UPDATE_SNAPSHOT: 'UPDATE_SNAPSHOT',
  UPDATE_COMPONENT_SEARCH_INPUT: 'UPDATE_COMPONENT_SEARCH_INPUT',
  FETCH_COMPONENT_DATA: 'FETCH_COMPONENT_DATA',
  FETCH_COMPONENT_DATA_SUCCESS: 'FETCH_COMPONENT_DATA_SUCCESS',
  FETCH_COMPONENT_DATA_FAILURE: 'FETCH_COMPONENT_DATA_FAILURE',
  HANDLE_SNAPSHOTS: 'HANDLE_SNAPSHOTS',
  HANDLE_SNAPSHOTS_SUCCESS: 'HANDLE_SNAPSHOTS_SUCCESS',
  HANDLE_SNAPSHOTS_FAILURE: 'HANDLE_SNAPSHOTS_FAILURE',
};

export const selectComponent = payload => ({
  type: types.SELECT_COMPONENT,
  payload
});

export const selectTab = payload => ({
  type: types.SELECT_TAB,
  payload
});

export const selectSnapshot = payload => ({
  type: types.SELECT_SNAPSHOT,
  payload
});

export const updateSnapshot = payload => ({
  type: types.UPDATE_SNAPSHOT,
  payload
});

export const updateComponentSearchInput = payload => ({
  type: types.UPDATE_COMPONENT_SEARCH_INPUT,
  payload
});

export const fetchComponentData = payload => ({
  type: types.FETCH_COMPONENT_DATA,
  payload
});

export const fetchComponentDataSuccess = payload => ({
  type: types.FETCH_COMPONENT_DATA_SUCCESS,
  payload
});

export const fetchComponentDataFailure = payload => ({
  type: types.FETCH_COMPONENT_DATA_FAILURE,
  payload
});

export const handleSnapshots = payload => ({
  type: types.HANDLE_SNAPSHOTS,
  payload
});

export const handleSnapshotsSuccess = payload => ({
  type: types.HANDLE_SNAPSHOTS_SUCCESS,
  payload
});

export const handleSnapshotsFailure = payload => ({
  type: types.HANDLE_SNAPSHOTS_FAILURE,
  payload
});







// export const fetchFakeProps = payload => ({
//   type: types.FETCH_FAKE_PROPS,
//   payload
// });

// export const fetchFakePropsSuccess = payload => ({
//   type: types.FETCH_FAKE_PROPS_SUCCESS,
//   payload
// });

// export const fetchFakePropsFailure = payload => ({
//   type: types.FETCH_FAKE_PROPS_FAILURE,
//   payload
// });

// export const fetchPropsAsts = payload => ({
//   type: types.FETCH_PROPS_ASTS,
//   payload
// });

// export const fetchPropsAstsSuccess = payload => ({
//   type: types.FETCH_PROPS_ASTS_SUCCESS,
//   payload
// });

// export const fetchPropsAstsFailure = payload => ({
//   type: types.FETCH_PROPS_ASTS_FAILURE,
//   payload
// });

// export const fetchCustomTypes = payload => ({
//   type: types.FETCH_CUSTOM_TYPES,
//   payload
// });

// export const fetchCustomTypesSuccess = payload => ({
//   type: types.FETCH_CUSTOM_TYPES_SUCCESS,
//   payload
// });

// export const fetchCustomTypesFailure = payload => ({
//   type: types.FETCH_CUSTOM_TYPES_FAILURE,
//   payload
// });

// export const postCustomTypes = payload => ({
//   type: types.POST_CUSTOM_TYPES,
//   payload
// });

// export const postCustomTypesSuccess = payload => ({
//   type: types.POST_CUSTOM_TYPES_SUCCESS,
//   payload
// });

// export const postCustomTypesFailure = payload => ({
//   type: types.POST_CUSTOM_TYPES_FAILURE,
//   payload
// });

// export const delCustomTypes = payload => ({
//   type: types.DEL_CUSTOM_TYPES,
//   payload
// });

// export const delCustomTypesSuccess = payload => ({
//   type: types.DEL_CUSTOM_TYPES_SUCCESS,
//   payload
// });

// export const delCustomTypesFailure = payload => ({
//   type: types.DEL_CUSTOM_TYPES_FAILURE,
//   payload
// });

