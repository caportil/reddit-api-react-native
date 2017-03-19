import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { StyleSheet, Text, View, Navigator } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { connect, Provider } from 'react-redux';
import Home from './src/components/Home';
import ListView from './src/components/ListView';
import store from './src/Store'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
    };
  }

  toggleInitialized() {
    let self = this;
    console.log('running toggleInitialized...')
    self.setState({initialized: true})
  }

  renderScene(route,nav) {
    let self = this;
    switch (route.screen) {
      case "Home":
        return <Home navigator={nav} initialized={self.state.initialized} toggleInitialized={this.toggleInitialized.bind(this)}/>
      case "ListView":
        return <ListView navigator={nav} child={route.child} index={route.index}/>
      }
  }

  render() {
    let self = this;
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
