import './App.css';
import Container from './Components/Container/Container'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import {GiHamburgerMenu} from 'react-icons/gi'
// import {IconButton} from '@material-ui/core'
// import { Toolbar } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
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