import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import axios from 'axios';

const listReducer = (state = [], action) => {
  if (action.type === 'ADD_LIST') {
    state = state.concat([action.payload])
  }
  return state;
};

const reducers = combineReducers({
  lists: listReducer,
});

const store = createStore(reducers);

// store.subscribe(() => console.log('store has been changed; new store:', store.getState()));

axios.get('https://www.reddit.com/.json').then(res => {
  res.data.data.children.forEach(child => store.dispatch({type: 'ADD_LIST', payload: {
    title: child.data.title,
    author: child.data.author,
    created: child.data.created,
    domain: child.data.domain,
    id: child.data.id,
    name: child.data.name,
    num_comments: child.data.num_comments,
    permalink: child.data.permalink,
    // preview: child.data.preview,
    score: child.data.score,
    subreddit: child.data.subreddit,
    subreddit_id: child.data.subreddit_id,
    subreddit_name_prefixed: child.data.subreddit_name_prefixed,
    thumbnail: child.data.thumbnail,
    ups: child.data.ups,
    url: child.data.url,
    visited: child.data.visited
  }}))
})
  .then(res => console.log('Finished running axios.get; store:', store.getState()));

export default class App extends React.Component {
  render() {
    console.log('Test log');
    return (
      <View style={styles.container}>
        <Text>Reddit API React Native!</Text>
        <Text>Fetched Lists Below:</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
