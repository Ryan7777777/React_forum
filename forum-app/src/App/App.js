import Home from '../Homepage/Home';
import Signup from './Signup/Signup';
import Error404Page from './404Error/404Error';
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';
function App() {
  return (
    <div className="page-wrapper" id="page">
      <Router>
     <Switch>
            <Route path="/signup/">
              <Signup/>
            </Route>
            <Route exact path="/" component={() => <Redirect to="/comment/all" />}/>
            <Route path="/comment">
              <div className="mainpage">
                 <Home/>
              </div>
            </Route>
            <Route path="/post">
              <div className="mainpage">
                 <Home/>
              </div>
            </Route>
              <Error404Page/>
            <Route/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
