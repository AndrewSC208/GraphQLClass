import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { ApolloProvider } from 'react-apollo';

/*==COMPONENTS==*/
import App        from './components/App';
import SongList   from './components/SongList';
import SongCreate from './components/SongCreate';

/*
 * Might want to add some options to config the client a bit more
 */
const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList}/>
          <Route path="song/new" component={SongCreate} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
