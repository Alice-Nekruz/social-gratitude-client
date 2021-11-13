import './App.css';
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PostList from './components/post/PostList';
import Profile from './components/profile/Profile';


import { Link } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={props => <Login {...props} getUser={this.getTheUser} />} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/posts" component={PostList}/>
          <Route exact path="/profile" component={Profile}/>
        </Switch>
        <Link to={'/posts'}> Posts</Link>
      </div>
    );
  }

}