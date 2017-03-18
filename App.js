import React from 'react';
import { StyleSheet, Text, View, Navigator } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import axios from 'axios';
import { connect, Provider } from 'react-redux';
import Home from './Home';
import ListView from './ListView';
import thunk from 'redux-thunk';
// import store from './Store'

const listReducer = (state = [], action) => {
  if (action.type === 'ADD_LIST') {
    // state = state.concat([action.payload]);

    //overwrite existing values instead of appending to end (for refresh purposes)
    let index = action.index;
    state = state.slice(0, index).concat([action.payload]).concat(state.slice(index + 1));
  }
  return state;
};

const reducers = combineReducers({
  lists: listReducer,
});

const middleware = applyMiddleware(thunk);

const store = createStore(reducers, middleware);

// store.subscribe(() => console.log('store has been changed; new store:', store.getState()));


  // .then(res => console.log('Finished running axios.get; store.lists[0]:', store.getState().lists[0]));

export default class App extends React.Component {
  renderScene(route,nav) {
    switch (route.screen) {
      case "Home":
        return <Home navigator={nav} />
      case "ListView":
        return <ListView navigator={nav} />
      }
  }

  render() {
    let self = this;
    console.log('Test logz');
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{screen: 'Home'}}
          renderScene={(route, nav) => this.renderScene(route, nav)}
        />
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
