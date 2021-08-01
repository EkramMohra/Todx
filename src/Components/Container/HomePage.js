import NavBar from '../NavBar/NavBar'
import List from './List'
import { inject, observer } from 'mobx-react';
import InCalendar from './Calendar/Calendar'
import 'react-calendar/dist/Calendar.css';
import React, { useState } from 'react'
import Pusher from 'pusher-js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import {Route} from 'react-router-dom';
import './container.css'
import Profile from '../NavBar/Profile/Profile'
import Dashboard from './Dashboard'
const MySwal = withReactContent(Swal)

const HomePage = (props) => {

  const [firstAsign, setfirstAsign] = useState('in')
  let userId = JSON.parse(sessionStorage.getItem('user'))[0].id
  let channel = `share_task_recevier_id_${userId}`
  let pusher = new Pusher('5b82386d16e4fe295409', {
    cluster: 'eu'
  })
  let channelPusher = pusher.subscribe(channel)

  if (firstAsign == 'in') {
    props.todolist.updateId(userId)
    props.dailylist.updateId(userId)
    props.timedlist.updateId(userId)
    props.todolist.getList()
    props.dailylist.getList()
    props.timedlist.getList()
    props.users.getUserInfo(userId)
    channelPusher.bind('my-event', function (data) {
      MySwal.fire({
        icon: "warning",
        title: JSON.stringify(data.message),
        showConfirmButton: false,
        timer: 3000
      })

      if (data.task_type === "timedtask") {
        props.timedlist.addTask(data.task)
      }
      else {
        props.todolist.addTask(data.task)
      }

    })
    setfirstAsign('out')
  }

  return (
    <div className="wrapper">
      <NavBar />
      <Route key="profile" exact path="/homePage/profile" render={() =>  <Profile />} />
      <Route key="dashboard" exact path="/homePage/dashboard" render={() =>  <Dashboard/>} />
  </div>
  )
}

export default inject("todolist", "users", "dailylist", "timedlist")(observer(HomePage))
