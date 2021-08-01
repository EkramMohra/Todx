import NavBar from '../NavBar/NavBar'
import List from './List'
import { inject, observer } from 'mobx-react';
import InCalendar from './Calendar/Calendar'
import 'react-calendar/dist/Calendar.css';
import React, { useState } from 'react'
import Pusher from 'pusher-js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './container.css'


const MySwal = withReactContent(Swal)

const Container = (props) => {
  const [firstAsign, setfirstAsign] = useState('in')
  let userId = JSON.parse(sessionStorage.getItem('user'))[0].id
  if (firstAsign == 'in') {
    console.log("first asign")
    props.todolist.updateId(userId)
    props.dailylist.updateId(userId)
    props.timedlist.updateId(userId)
    props.todolist.getList()
    props.dailylist.getList()
    props.timedlist.getList()
    setfirstAsign('out')
  }
  // const [flag, setFlag] = useState(false)
  Pusher.logToConsole = true;
  // let flag = false
  let channel = `share_task_recevier_id_${userId}`
  var pusher = new Pusher('5b82386d16e4fe295409', {
    cluster: 'eu'
  })
  var channelPusher = pusher.subscribe(channel);
  channelPusher.bind('my-event', function (data) {
    // setFlag(true)
    // console.log(flag)
    MySwal.fire({
      icon: "warning",
      title: JSON.stringify(data.message),
      showConfirmButton: false,
      timer: 3000
    })
    props.todolist.addTask(data.task)
  })
  return (
    <>
      <NavBar />
      <div className="wrapper">
        <InCalendar className="calendar"/>
        <List />
      </div>
    </>
  )
}
export default inject("todolist", "dailylist", "timedlist")(observer(Container))