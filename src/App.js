import './App.css';
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/auth/navbar/Navbar';
import PostList from './components/post/PostList';
import Profile from './components/profile/Profile';
import CallDetails from './components/call/Calldetails';
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

  fetchUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then(data => {
          if(data){
            this.setState({
              user: data,
              isLoggedIn: true
            });
          } else {
            this.setState({
              user: null,
              isLoggedIn: false
            });
          }
        })
        .catch(err => {
          this.setState({
            user: null,
            isLoggedIn: false
          });
        });
    }
  };


  componentDidMount() {
    this.fetchUser();
  }

  render() {
    
    return (
      <div className="App">
        <Navbar userData={this.state.user} isLoggedIn={this.state.isLoggedIn} getCurrentUser={this.getCurrentUser} />
        <Switch>
          <Route exact path="/" render={props => <Login {...props} getCurrentUser={this.getCurrentUser} />} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/posts" render={props => <PostList getUser={this.state.user}/>}/>
          <Route exact path="/my-profile/:id" component={Profile}/>
          <Route exact path="/profile/:id/calldetails/:callid" component={CallDetails}/>
        </Switch>
        
          <Link to={'/posts'}> Posts</Link>
        
        
      </div>
    );
  }

}