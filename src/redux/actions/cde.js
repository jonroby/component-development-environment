export const types = {
  FETCH_SOMETHING: 'FETCH_SOMETHING',
  FETCH_ANOTHER_THING: 'FETCH_ANOTHER_THING'
};

export const fetchSingleArticle = payload => ({ type: types.FETCH_SINGLE_ARTICLE, payload });
export const fetchAnotherThing = payload => ({
  type: types.FETCH_ANOTHER_THING,
  payload
});