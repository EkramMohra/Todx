import NavBar from '../NavBar/NavBar'
import List from './List'
import { inject, observer } from 'mobx-react';
import InCalendar from './Calendar/Calendar'
import 'react-calendar/dist/Calendar.css';
import React, { useState } from 'react'
import Searchbox from './Calendar/Searchbox'
import Pusher from 'pusher-js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import {Route} from 'react-router-dom';
import './container.css'
import Profile from '../NavBar/Profile/Profile'


const Dashboard = (props) => {

  return (
      <>
        <InCalendar className="calendar"/>
        <Searchbox />
        <List />
      </>
  )
}

export default inject("todolist", "users", "dailylist", "timedlist")(observer(Dashboard))
