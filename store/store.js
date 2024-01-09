import { createStore } from '../node_modules/redux/dist/redux.legacy-esm.js';
import appReducer from '../reducers/reducers.js';

const store = createStore(appReducer);

export default store;
