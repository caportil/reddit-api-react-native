import React from 'react';
import { connect, Provider } from 'react-redux';
import axios from 'axios';
import { StyleSheet, Text, View, Image, ScrollView, RefreshControl } from 'react-native';
import ListItem from './ListItem';
// import Store from './Store';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

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
          <ListItem
            key={`ListItem${idx}`}
            idx={idx}
            title={child.title}
            thumbnail={child.thumbnail}
            ups={child.ups}
            num_comments={child.num_comments}
            author={child.author}
            created={child.created}
            subreddit_name_prefixed={child.subreddit_name_prefixed}
          ></ListItem>
        )
      })
    )
  }

  render() {
    let self = this;
    console.log('Test log');
    return (
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
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
