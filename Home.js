import React from 'react';
import { connect, Provider } from 'react-redux';
import axios from 'axios';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
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

  componentWillMount() {
    let self = this;
    console.log('about to mount; self.props:', self.props);
    this.props.dispatch(this.getAPIdata());
  }

  componentDidMount() {
    console.log('Finished mounting');
  }

  mapTitles() {
    console.log('mapTitles running...')
    return (
      this.props.lists.map((child, idx) => {
        console.log('idx:', idx, 'and child:', child);
        return (
          <View>
            <Text>{`${idx+1}: ${child.title}`}</Text>
            {child.thumbnail === 'default' ?
              <Image source={{uri: 'http://i-cdn.phonearena.com/images/article/70867-image/Best-Reddit-clients-for-Android.jpg'}} />
              :
              <Image source={{uri: child.thumbnail}} style={{height: 50, width: 50}}/>
            }
            <Text>{`upvotes: ${child.ups}\ncomments: ${child.num_comments}`}</Text>
            <Text>{`submitted by ${child.author} to ${child.subreddit_name_prefixed}`}</Text>
            <Text>{`${new Date(child.created)}`}</Text>
            <Text>{`\n`}</Text>
          </View>
        )
      })
    )
  }

  render() {
    let self = this;
    console.log('Test log');
    return (
      <ScrollView >
        <Text>Reddit API React Native!</Text>
        <Text>Fetched Lists Below:</Text>
        {self.mapTitles()}
      </ScrollView>
    );
  }
}

export default connect(store => {
  return { 
    lists: store.lists
  }
})(Home);
