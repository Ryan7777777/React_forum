import Home from '../Homepage/Home.js';
import Signup from './Signup/Signup.js'
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  return (
    <div className="page-wrapper">
      <Router>
     <Switch>
            <Route path="/signup/">
              <Signup/>
            </Route>
            <Route path="/">
              <div className="mainpage">
                 <Home/>
              </div>
            </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
