import React from 'react'
import './App.css'
import Container from './Components/Container/Container'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Authentication from './Components/Authentication/Authentication'

function App() {
  return (
      <Router>
        <div className="App" id="App">
          <Authentication />
          <Route key="container"
            exact
            path="/container/:userId"
            render={(match) => <Container match={match} />} />
        </div>
      </Router>
  )
}

export default App