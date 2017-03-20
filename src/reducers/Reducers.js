import { combineReducers } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';

const listReducer = (state = [], action) => {
  if (action.type === 'ADD_LIST') {
    let index = action.index;
    state = state.slice(0, index).concat([action.payload]).concat(state.slice(index + 1));
  }
  return state;
};

export default combineReducers({
  lists: listReducer,
});
