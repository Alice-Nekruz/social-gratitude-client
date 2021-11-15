import './App.css';
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/auth/navbar/Navbar';
import PostList from './components/post/PostList';
import Profile from './components/profile/Profile';
import CallDetails from './components/call/Calldetails';



import { Link } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" render={props => <Login {...props} getUser={this.getTheUser} />} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/posts" component={PostList}/>
          <Route exact path="/my-profile" component={Profile}/>
          <Route exact path="/profile/:id/calldetails/:callid" component={CallDetails}/>
        </Switch>
        <Link to={'/posts'}> Posts</Link>
      </div>
    );
  }

}