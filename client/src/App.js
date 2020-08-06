import React from 'react';
import apolloClient from 'apollo-boost';
import Launches from './components/launches';
import Launch from './components/launch';
import {ApolloProvider} from 'react-apollo';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'

const client= new apolloClient({
  uri: "/graphql"
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app container">
          <h1 style={{textAlign: 'center', marginTop:30}}>Spacex launch data</h1> 
          <Route exact path='/' component={Launches} />
          <Route exact path='/launch/:flight_number' component={Launch} />
        </div>
      </Router>
      
    </ApolloProvider>
    
  );
}

export default App;
