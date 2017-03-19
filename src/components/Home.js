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
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.dispatch(fetchAPIdata(this.props, this.toggleRefreshing.bind(this)));
  }

  toggleRefreshing() {
    if (this.state.refreshing) {
      this.setState({refreshing: false});
    }
  }

  componentWillMount() {
    console.log('running componentWillMount...');
    if (!this.props.initialized) {
      console.log('Initial componentWillMount fetch running...')
      this.props.dispatch(fetchAPIdata(this.props, this.toggleRefreshing.bind(this)));
    }
  }

  componentDidMount() {
    console.log('Finished mounting');
  }

  openListView(child, idx) {
    this.props.navigator.push({screen: 'ListView', child: child, index: idx})
  }

  mapTitles() {
    return (
      this.props.lists.map((child, idx) => {
        return (
          <TouchableOpacity onPress={() => this.openListView(child, idx)} key={`TouchableOpacity${idx}`}>
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
        {this.mapTitles()}
      </ScrollView>
    );
  }
}

export default connect(store => {
  return { 
    lists: store.lists
  }
})(Home);
