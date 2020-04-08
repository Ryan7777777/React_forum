import Home from '../Homepage/Home.js';
import Body from '../Homepage/Body/Body.js';
import Signup from '../Signup/Signup.js'
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
     <Switch>
            <Route path="/signup/">
              <Signup/>
            </Route>
            <Route path="/">
              <Home/>
              <Body/>
            </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
