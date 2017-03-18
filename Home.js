import React from 'react';
import { connect, Provider } from 'react-redux';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
// import Store from './Store';

class Home extends React.Component {
  getAPIdata() {
    return function(dispatch) {
      axios.get('https://www.reddit.com/.json').then(res => {
        res.data.data.children.forEach(child => dispatch({type: 'ADD_LIST', payload: {
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
      .catch(error => console.log('Error dispatching in getAPIdata:', error));
    }
  }

  // componentWillMount() {
  //   console.log('about to mount');
  //   // this.props.dispatch(getAPIdata());
  // }

  componentWillMount() {
    let self = this;
    console.log('about to mount; self.props:', self.props);
    this.props.dispatch(this.getAPIdata());
  }

  // componentDidMount() {
  //   console.log('mounted... props store lists:', this.props.lists, 'and store.getState():', store.getState())
  // }

  componentDidMount() {
    console.log('Finished mounting');
  }

  mapTitles() {
    console.log('mapTitles running...')
    return (
      this.props.lists.map((child, idx) => {
        console.log('idx:', idx, 'and child:', child);
        return (
          <Text>{`${idx+1}: ${child.title}`}</Text>
        )
      })
    )
  }

  render() {
    let self = this;
    console.log('Test log');
    return (
      <View >
        <Text>Reddit API React Native!</Text>
        <Text>Fetched Lists Below:</Text>
        {self.mapTitles()}
      </View>
    );
  }
}

export default connect(store => {
  return { 
    lists: store.lists
  }
})(Home);
