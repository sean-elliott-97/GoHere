import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';


import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { BrowserRouter as Router, Route, Switch,useHistory } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
// import SavedTrips from './pages/SavedTrips';
import SavedTrips from './components/SavedTrips';
import { setContext } from '@apollo/client/link/context';

const history = useHistory
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
          
          <Switch className="switch-margin">
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile/:username?" component={Profile} />
            <Route exact path="/post/:id" component={SinglePost} />
            <Route exact path="/savedTrips" component={SavedTrips}/>
            {/* <Route exact path="/:username/saved" component={SavedTrips} /> */}

            <Route component={NoMatch} />
         </Switch>

          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;