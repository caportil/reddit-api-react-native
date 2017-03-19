import { combineReducers } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';

const listReducer = (state = [], action) => {
  if (action.type === 'ADD_LIST') {
    state = state.concat([action.payload])
  }
  return state;
};

export default combineReducers({
  lists: listReducer,
});
