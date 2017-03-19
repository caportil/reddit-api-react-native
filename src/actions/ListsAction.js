import axios from 'axios';

export default function fetchAPIdata(props, toggleRefreshing) {
  let self = this;
  return function(dispatch) {
    axios.get('https://www.reddit.com/.json').then(res => {
      console.log('axios GET complete 2! props.initialized:', props.initialized);
      res.data.data.children.forEach((child, i) => dispatch({type: 'ADD_LIST', index: i, payload: {
        title: child.data.title,
        author: child.data.author,
        created: child.data.created,
        domain: child.data.domain,
        id: child.data.id,
        name: child.data.name,
        num_comments: child.data.num_comments,
        permalink: child.data.permalink,
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
      console.log('within listsaction, running then...')
      props.toggleInitialized();
      toggleRefreshing();
    })
    .catch(error => console.log('Error dispatching in getAPIdata:', error));
  }
}
