import React from 'react'
import './App.css'
import Profile from './Components/NavBar/Profile/Profile'
import Container from './Components/Container/Container'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Authentication from './Components/Authentication/Authentication'

function App() {
  // sessionStorage.setItem('user', {id: 0})
  return (
      <Router>
        <div className="App" id="App">
          <Authentication />
          <Route exact path="/profile" render={() => <Profile />} />

          <Route key="container"
            exact
            path="/container/:userId"
            render={(match) => <Container match={match} />} />
        </div>
      </Router>
  )
}

export default App