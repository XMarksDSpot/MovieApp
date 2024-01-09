import { SET_LOCALE, SET_STORAGE_DATA } from '../actions/actions.js';

// Initial state
const initialState = {};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOCALE:
      return { ...state, locale: action.locale };
    case SET_STORAGE_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
}

export default appReducer;
