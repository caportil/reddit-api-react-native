import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { Text, View, Navigator, AsyncStorage } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import Home from './src/components/Home';
import ListView from './src/components/ListView';
import store from './src/Store'

persistStore(store, {storage: AsyncStorage}, () => console.log('restored within persistStore!'));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
    };
  }

  toggleInitialized() {
    this.setState({initialized: true})
  }

  renderScene(route,nav) {
    switch (route.screen) {
      case "Home":
        return <Home navigator={nav} initialized={this.state.initialized} toggleInitialized={this.toggleInitialized.bind(this)}/>
      case "ListView":
        return <ListView navigator={nav} child={route.child} index={route.index}/>
      }
  }

  render() {
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
