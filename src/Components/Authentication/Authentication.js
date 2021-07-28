import React from "react"
import {Route} from 'react-router-dom' 
import Login from "./Login"
import SignUp from "./SignUp"

import Container from 'react-bootstrap/Container'


const Authentication = () => {
  return (
    [
        <Route key="login" exact path="/" render={() => <Login />}  />,
        <Route key="signup" exact path="/signup" render={() => <SignUp />}/>
    ]
  );
};

export default Authentication;
