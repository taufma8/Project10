//From https://reacttraining.com/react-router/web/example/auth-workflow
import React from "react";
import {Route, Redirect} from "react-router-dom";
import {Consumer} from './Context';

//Provides a private route used only when the user is currently signed in and then displays requested component
const PrivateRouteCreate = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => {
        return(
          <Route {...rest} render={props =>
          context.isAuthenticated
          ? (<Component {...props} {...rest} />)
          : (<Redirect to={{pathname: "/signin", state: { from: props.location }}} />)}
          />
        )
      }}
    </Consumer>
  );
}

export default PrivateRouteCreate;