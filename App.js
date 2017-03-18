import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import axios from 'axios';
import { connect, Provider } from 'react-redux';
import Home from './Home';
import thunk from 'redux-thunk';
// import store from './Store'

const listReducer = (state = [], action) => {
  if (action.type === 'ADD_LIST') {
    state = state.concat([action.payload])
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
  // getAPIdata() {
  //   return function(dispatch) {
  //     axios.get('https://www.reddit.com/.json').then(res => {
  //       res.data.data.children.forEach(child => dispatch({type: 'ADD_LIST', payload: {
  //         title: child.data.title,
  //         author: child.data.author,
  //         created: child.data.created,
  //         domain: child.data.domain,
  //         id: child.data.id,
  //         name: child.data.name,
  //         num_comments: child.data.num_comments,
  //         permalink: child.data.permalink,
  //         // preview: child.data.preview,
  //         score: child.data.score,
  //         subreddit: child.data.subreddit,
  //         subreddit_id: child.data.subreddit_id,
  //         subreddit_name_prefixed: child.data.subreddit_name_prefixed,
  //         thumbnail: child.data.thumbnail,
  //         ups: child.data.ups,
  //         url: child.data.url,
  //         visited: child.data.visited
  //       }}))
  //     })
  //     .catch(error => console.log('Error dispatching in getAPIdata:', error));
  //   }
  // }

  // componentWillMount() {
  //   let self = this;
  //   console.log('about to mount; self.props:', self.props);
  //   this.props.dispatch(this.getAPIdata());
  // }

  // // componentWillMount() {
  // //   console.log('componentWillMount')
  // // }

  // componentDidMount() {
  //   console.log('mounted... props store lists:', this.props.lists, 'and store.getState():', store.getState())
  // }

  // mapTitles() {
  //   console.log('mapTitles running', store.getState())
  //   store.getState().lists.forEach((child, idx) => {
  //     console.log(child);
  //     return (
  //       <div>
  //         <div>{`${idx+1}: ${child.title}`}</div>
  //       </div>
  //     )
  //   })
  // }
  render() {
    let self = this;
    console.log('Test logz');
    return (
      <Provider store={store}>
        <Home />
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

// export default App;
