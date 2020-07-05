import React from 'react';

import { Route , Redirect } from 'react-router-dom';

import store from '../store';

function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;
  // const signed = true;
  console.log('aqui');
  if(!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if(signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }


  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} />}
    />
  );
}
export default RouteWrapper;
