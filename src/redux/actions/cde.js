export const types = {
  SELECT_COMPONENT: 'SELECT_COMPONENT',
};

export const selectComponent = payload => ({
  type: types.SELECT_COMPONENT,
  payload
});
