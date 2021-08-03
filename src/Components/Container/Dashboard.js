import React, { useState } from 'react'
import List from './List'
import { inject, observer } from 'mobx-react';
import InCalendar from './Calendar/Calendar'
import Searchbox from './Calendar/Searchbox'
import {Col, Row} from 'react-bootstrap'
import './container.css'
import 'react-calendar/dist/Calendar.css';


const Dashboard = (props) => {

  return (
      <>
      <Row className="justify-content-md-center mb-3">
        <Col sm={1}>
          <InCalendar className="calendar"/>
        </Col>

        <Col  sm={3}>
          <Searchbox />
        </Col>
      </Row>

        <List />
      </>
  )
}

export default inject("todolist", "users", "dailylist", "timedlist")(observer(Dashboard))
