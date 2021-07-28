import React from 'react'
import {Route} from 'react-router-dom' 
import NavBar from '../NavBar/NavBar'
import List from './List'

const Container = () => {

    return (
        [ 
            <NavBar />,
            <Route key="lists" exact path="/lists" render={() => <List/>}  />
        ] 
    )
}

export default Container