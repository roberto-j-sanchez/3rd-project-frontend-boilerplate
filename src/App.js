import React, { Component } from 'react';
import './App.css';
import { Switch, NavLink, Route } from 'react-router-dom';
import axios from 'axios';

import Signup from './components/user-pages/Signup';
import Login from './components/user-pages/Login';
import Home from './components/Home';


class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }

  componentDidMount(){
    axios.get("http://localhost:3001/api/checkUser", { withCredentials: true })
    .then(responseFromBackend => {
      // console.log('Check User in APP.JS: ', responseFromBackend.data)
      const { userDoc } = responseFromBackend.data;
      this.syncCurrentUser(userDoc);
    });
  }

  // this is the method for updating 'currentUser'
  // must be defined in App.js since it is the owner of 'currentUser'
  syncCurrentUser(user){
    this.setState({ currentUser: user });
  }

  render() {
    return (
      <div className='App'>
        <header>
          <h1> Iron Phones ☎ </h1>
          <nav>
            <NavLink to='/'>Home</NavLink>

            <NavLink to='/signup-page'>Signup</NavLink>
            <NavLink to='/login-page'>Login</NavLink>
          </nav>
        </header>

        <Switch>
          {/* this is an example of how to normally do the Route */}
          {/* <Route path='/somePage component={someComponentThatWillRenderWhenUserClicksThisLink } /> */}
          <Route
            exact path='/' component={ Home } />
            
          <Route
            path='/signup-page'
            render={() => (
              <Signup
                currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUser(userDoc)}
              />
            )}
          />

          <Route
            path='/login-page'
            render={() => (
              <Login
                currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUser(userDoc)}
              />
            )}
          />

        </Switch>

        <footer>Made with ♥ at Ironkack - PTWD 2019</footer>
      </div>
    );
  }
}

export default App;
