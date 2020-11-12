import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import './App.css';
import Home from './Home.js'
import SignUp from './SignUp.js'
import SignIn from './SignIn.js'

export default class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <ul>
            <Link to="/home"><div>Home</div></Link>
            <Link to="/signup"><div>Sign Up</div></Link>
            <Link to="/signin"><div>Sign In</div></Link>
          </ul>
          <Switch>
            <Route exact path='/home' render={(routerProps) => <Home
              {...routerProps} />}
            />
            <Route
              exact path='/signup'
              render={(routerProps) => <SignUp
                {...routerProps} />}
            />
            <Route
              exact path='/signin'
              render={(routerProps) => <SignIn
                {...routerProps} />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}