import React from 'react';
import axios from 'axios';
import { connect, Provider } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import ListItem from './ListItem';
import fetchAPIdata from '../actions/ListsAction';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      initialized: false,
    };
  }

  _onRefresh() {
    let self = this;
    this.setState({refreshing: true});
    this.props.dispatch(fetchAPIdata(self.props, self.toggleRefreshing.bind(self)));
    // .then(() => this.setState({refreshing: false}););
  }

  toggleRefreshing() {
    let self = this;
    console.log('running toggleRefreshing...')
    if (self.state.refreshing) {
      self.setState({refreshing: false});
    }
  }

  getAPIdata() {
    let self = this;
    return function(dispatch) {
      axios.get('https://www.reddit.com/.json').then(res => {
        console.log('axios GET complete 2! this.props.initialized:', self.props.initialized)
        res.data.data.children.forEach((child, i) => dispatch({type: 'ADD_LIST', index: i, payload: {
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
      .then(res => {
        self.props.toggleInitialized();
        if (self.state.refreshing) {
          self.setState({refreshing: false});
        }
      })
      .catch(error => console.log('Error dispatching in getAPIdata:', error));
    }
  }

  componentWillMount() {
    let self = this;
    console.log('running componentWillMount... self.props.initialized:', self.props.initialized);
    // console.log('about to mount; self.props:', self.props);
    if (!self.props.initialized) {
      console.log('Initial componentWillMount fetch running...')
      // this.props.dispatch(this.getAPIdata());
      self.props.dispatch(fetchAPIdata(self.props, self.toggleRefreshing.bind(self)));
    }
  }

  componentDidMount() {
    console.log('Finished mounting');
  }

  openListView(child, idx) {
    console.log('openListView invoked!');
    this.props.navigator.push({screen: 'ListView', child: child, index: idx})
  }

  mapTitles() {
    let self = this;
    // console.log('mapTitles running...')
    return (
      this.props.lists.map((child, idx) => {
        // console.log('idx:', idx, 'and child:', child);
        return (
          <TouchableOpacity onPress={() => self.openListView(child, idx)} key={`TouchableOpacity${idx}`}>
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
            >
            </ListItem>
          </TouchableOpacity>
        )
      })
    )
  }

  render() {
    let self = this;
    // console.log('Test log');
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
