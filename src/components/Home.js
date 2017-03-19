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
    self.setState({refreshing: true});
    self.props.dispatch(fetchAPIdata(self.props, self.toggleRefreshing.bind(self)));
  }

  toggleRefreshing() {
    let self = this;
    console.log('running toggleRefreshing...')
    if (self.state.refreshing) {
      self.setState({refreshing: false});
    }
  }


  componentWillMount() {
    let self = this;
    console.log('running componentWillMount... self.props.initialized:', self.props.initialized);
    if (!self.props.initialized) {
      console.log('Initial componentWillMount fetch running...')
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
    return (
      this.props.lists.map((child, idx) => {
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
    return (
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={self.state.refreshing}
            onRefresh={self._onRefresh.bind(self)}
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
