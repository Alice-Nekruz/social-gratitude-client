import './App.css';
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/auth/navbar/Navbar';
import PostList from './components/post/PostList';
import Profile from './components/profile/Profile';
import authService from './services/auth-services';


import { Link } from 'react-router-dom';

export default class App extends React.Component {

  state = {
    isLoggedIn: false,
    user:null
  };

  getCurrentUser = (userObj, loggedIn) => {
    this.setState({
      isLoggedIn: loggedIn,
      user: userObj
    });
  };

  render() {
    
    return (
      <div className="App">
        <Navbar userData={this.state.user} isLoggedIn={this.state.isLoggedIn} getCurrentUser={this.getCurrentUser} />
        <Switch>
          <Route exact path="/" render={props => <Login {...props} getCurrentUser={this.getCurrentUser} />} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/posts" component={PostList}/>
          <Route exact path="/my-profile/:id" render={props => <Profile {...props} getCurrentUser={this.getCurrentUser} />} />
        </Switch>
        
          <Link to={'/posts'}> Posts</Link>
        
        
      </div>
    );
  }

}