import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import './App.css';
import Home from './Home.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import ToDo from './ToDo.js';
import PrivateRoute from './PrivateRoute.js';


export default class App extends Component {

  state = {//check to see if these are in localStorage, if they are use to hydrate pages in state, otherwise use an empty string 
    token: localStorage.getItem('TOKEN') || '',
    email: localStorage.getItem('EMAIL') || '',
  }

  //get access to token and email; every component will need access to the token to authorize requests so will need to pass down (via routes) as props

  storeTokenandEmail = (token, email) => {//using as a function and take out .body b/c declaration only knows them as 'token' and 'email'?
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('EMAIL', email);

    this.setState({
      token,
      email
    })
  }
  //to logout means to remove the token and reset to an empty string
  logOut = () => {
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('EMAIL', '');

    this.setState({
      token: '',
      email: ''
    })
  }

  render() {
    return (
      <div>
        <Router>
          <ul>
            {
              this.state.token
                ? <div>
                  {this.state.email}
                  <br></br>
                  <button onClick={this.logOut}>Log Out</button>
                </div>
                : <>
                  <Link to="/signup"><div>Sign Up</div></Link>
                  <Link to="/signin"><div>Sign In</div></Link>
                </>
            }
            <Link to="/home"><div>Home</div></Link>
            <Link to="/todo"><div>To-Do's</div></Link>
          </ul>

          <Switch>
            <Route exact path='/home' render={(routerProps) => <Home
              {...routerProps} />}
            />
            <Route
              exact path='/signup'
              render={(routerProps) => <SignUp
                {...routerProps}
                storeTokenandEmail={this.storeTokenandEmail} />}//this way the signup page can change the parent's state
            />
            <Route
              exact path='/signin'
              render={(routerProps) => <SignIn
                {...routerProps}
                storeTokenandEmail={this.storeTokenandEmail} />}
            />
            <PrivateRoute
              token={this.state.token}//any route that needs a token needs to be a private route, ie: Show the component only when the user is logged in, otherwise, redirect the user to /signin page
              exact path='/todo'
              render={(routerProps) => <ToDo
                {...routerProps}
                token={this.state.token} />}//todo component needs access to token so can fetch user's to-dos; checks to see if logged-in, if not will be redirected to signin 
            />
          </Switch>
        </Router>
      </div>
    )
  }
}