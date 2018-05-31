export const types = {
  SELECT_COMPONENT: 'SELECT_COMPONENT',
  SELECT_TAB: 'SELECT_TAB',
  FETCH_FAKE_PROPS: 'FETCH_FAKE_PROPS',
  FETCH_FAKE_PROPS_SUCCESS: 'FETCH_FAKE_PROPS_SUCCESS',
  FETCH_FAKE_PROPS_FAILURE: 'FETCH_FAKE_PROPS_FAILURE',
  FETCH_PROPS_ASTS: 'FETCH_PROPS_ASTS',
  FETCH_PROPS_ASTS_SUCCESS: 'FETCH_PROPS_ASTS_SUCCESS',
  FETCH_PROPS_ASTS_FAILURE: 'FETCH_PROPS_ASTS_FAILURE',
};

export const selectComponent = payload => ({
  type: types.SELECT_COMPONENT,
  payload
});

export const selectTab = payload => ({
  type: types.SELECT_TAB,
  payload
});


export const fetchFakeProps = payload => ({
  type: types.FETCH_FAKE_PROPS,
  payload
});

export const fetchFakePropsSuccess = payload => ({
  type: types.FETCH_FAKE_PROPS_SUCCESS,
  payload
});

export const fetchFakePropsFailure = payload => ({
  type: types.FETCH_FAKE_PROPS_FAILURE,
  payload
});

export const fetchPropsAsts = payload => ({
  type: types.FETCH_PROPS_ASTS,
  payload
});

export const fetchPropsAstsSuccess = payload => ({
  type: types.FETCH_PROPS_ASTS_SUCCESS,
  payload
});

export const fetchPropsAstsFailure = payload => ({
  type: types.FETCH_PROPS_ASTS_FAILURE,
  payload
});


