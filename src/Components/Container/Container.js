import React from 'react'
import NavBar from '../NavBar/NavBar'
import List from './List'
import { inject, observer } from 'mobx-react';
import InCalendar from './Calendar/Calendar'
import 'react-calendar/dist/Calendar.css';



const Container = (props) => {


  return (
    <>
      <NavBar />
      <List />
      <div className="calendar">
        <InCalendar/>
      </div>
    </>
  )
}

export default inject("todolist", "dailylist", "timedlist")(observer(Container));
