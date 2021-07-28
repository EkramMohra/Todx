import React from 'react'
import {Route} from 'react-router-dom' 
import NavBar from '../NavBar/NavBar'
import List from './List'

const Container = () => {

    console.log('Container')
    return (
        [ 
            <NavBar />,
            <List />
        ] 
    )
}

export default Container