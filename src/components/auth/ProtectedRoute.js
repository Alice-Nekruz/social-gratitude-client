import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  console.log('XXXXXX')
  console.log({ component: Component, user, rest });

  if (user) {
    return <Route {...rest} render={props => <Component {...props} getUser={user} />} />;
  } else {
    return <Redirect to={{ pathname: '/', state: { from: rest.location } }} />;
  }
};

export default ProtectedRoute;
