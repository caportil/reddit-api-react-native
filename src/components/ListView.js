import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { connect, Provider } from 'react-redux';

export default props => {
  return (
    <View>
      <Text>{`${props.index+1}: ${props.child.title}`}</Text>
      {props.child.thumbnail.slice(0,4) !== 'http' ?
        <Image source={{uri: 'http://i-cdn.phonearena.com/images/article/70867-image/Best-Reddit-clients-for-Android.jpg'}} style={{height: 200, width: 200}}/>
        :
        <Image source={{uri: props.child.thumbnail}} style={{height: 50, width: 50}}/>
      }
      <Text>{`upvotes: ${props.child.ups}\ncomments: ${props.child.num_comments}`}</Text>
      <Text>{`submitted by ${props.child.author} to ${props.child.subreddit_name_prefixed}`}</Text>
      <Text>{`${new Date(props.child.created)}`}</Text>
      <Text>{`\n`}</Text>
      <TouchableOpacity onPress={() => props.navigator.push({screen: 'Home'})}>
        <Text>{`Return to Home`}</Text>
        <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Reddit_logo_and_wordmark.svg/1280px-Reddit_logo_and_wordmark.svg.png'}} style={{height: 100, width: 300}}/>
      </TouchableOpacity>
    </View>
  )
}
