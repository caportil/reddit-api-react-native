import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default props => {
  return (
    <View>
      <Text>{`${props.idx+1}: ${props.title}`}</Text>
      {props.thumbnail.slice(0,4) !== 'http' ?
        <Image source={{uri: 'http://i-cdn.phonearena.com/images/article/70867-image/Best-Reddit-clients-for-Android.jpg'}} style={{height: 50, width: 50}}/>
        :
        <Image source={{uri: props.thumbnail}} style={{height: 50, width: 50}}/>
      }
      <Text>{`upvotes: ${props.ups}\ncomments: ${props.num_comments}`}</Text>
      <Text>{`submitted by ${props.author} to ${props.subreddit_name_prefixed}`}</Text>
      <Text>{`${new Date(props.created)}`}</Text>
      <Text>{`\n`}</Text>
    </View>
  )
}
