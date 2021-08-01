import React from 'react'
import './App.css'
import NavBar from './Components/NavBar/NavBar'

import Container from './Components/Container/Container'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Authentication from './Components/Authentication/Authentication'
import HomePage from './Components/Container/HomePage'

function App() {
  // sessionStorage.setItem('user', {id: 0})
  return (
      <Router>
        <div className="App" id="App">

          {/* <Route key="homePage" path="/homePage" render={() => <HomePage />}  /> */}
          <Container/>
        </div>
      </Router>
  )
}

export default App