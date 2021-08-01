import {Route} from 'react-router-dom';
import React from 'react';
import HomePage from '../Container/HomePage'
import Authentication from '../Authentication/Authentication'

// ./Authentication/Authentication
import Profile from '../NavBar/Profile/Profile'
function Container() {
    return (
       <> 
        <Authentication />
        <Route key="homePage"  path="/homePage" render={() => <HomePage />}  />
      </>
    );
  }
  
  export default Container;
  