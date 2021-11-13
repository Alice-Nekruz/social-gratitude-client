import './App.css';
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={props => <Login {...props} getUser={this.getTheUser} />} />
          <Route exact path="/register" component={Register} />
        </Switch>

      </div>
    );
  }

}