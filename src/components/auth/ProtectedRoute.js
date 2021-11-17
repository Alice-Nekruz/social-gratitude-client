import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  console.log({ component: Component, user, rest });

  if (user) {
    return <Route {...rest} render={routeProps => <Component {...routeProps} userData={user} />} />;
  } else {
    return <Redirect to={{ pathname: '/', state: { from: rest.location } }} />;
  }
};

export default ProtectedRoute;
