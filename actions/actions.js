// Action Types
export const SET_LOCALE = 'SET_LOCALE';
export const SET_STORAGE_DATA = 'SET_STORAGE_DATA';

// Action Creators
export function setLocale(locale) {
  return { type: SET_LOCALE, locale };
}

export function setStorageData(data) {
  return { type: SET_STORAGE_DATA, data };
}
