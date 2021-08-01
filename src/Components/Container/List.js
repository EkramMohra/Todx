import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import Task from './Task';
import MyModal from './MyModal';
import Button from 'react-bootstrap/Button'

import Zoom from './Zoom';
import './List.css'
const moment = require("moment");
let today=moment().format("YYYY-MM-DD", true)
const List = (props) => {
    let date=props.todolist.DateOfTheDay 

    const [modalShowToDo, setModalShowToDo] = useState(false)
    const [modalShowDaylies, setModalShowDaylies] = useState(false)
    const [modalShowTimed, setModalShowTimed] = useState(false)
    const [modalZoomMetting, setModalZoomMetting] = useState(false)

    return (
        <>
            <MyModal show={modalShowToDo}
                addTask={props.todolist.addTask}
                time={false} priority={true} notification={false} date={true}
                onHide={() => setModalShowToDo(false)} />

            <MyModal show={modalShowDaylies}
                addTask={props.dailylist.addTask}
                time={false} priority={false} notification={false} date={false}
                onHide={() => setModalShowDaylies(false)} />

            <MyModal show={modalShowTimed}
                addTask={props.timedlist.addTask}
                time={true} priority={false} notification={true} date={true}
                onHide={() => setModalShowTimed(false)} />

            <Zoom show={modalZoomMetting} task_type="timedlist"
                addTask={props.timedlist.addTask} onHide={() => setModalZoomMetting(false)} />


            <div className="container">
                <div className="list">
                    <h4>To Do List {props.todolist.DateOfTheDay}</h4>
                    {props.todolist.list.map((task, index) =>
                        <Task key={index} task={task} deleteTask={props.todolist.deleteTask}
                            task_type="todolist" updateTask={props.todolist.updateTask}
                            date={date} doneTask={props.todolist.doneTask} />)}
                    <Button disabled = {date<today? true : false} onClick={() => setModalShowToDo(true)}>Add</Button>
                </div>

                <div className="list">
                    <h4>Dailies List</h4>
                    {props.dailylist.list.map((task, index) =>
                        <Task key={index} task={task} deleteTask={props.dailylist.deleteTask}
                            task_type="dailylist" updateTask={props.dailylist.updateTask}
                            date={date} doneTask={props.dailylist.doneTask} />)}

                    <Button disabled = {date<today ? true : false} onClick={() => setModalShowDaylies(true)}>Add</Button>
                </div >
                <div className="list">
                    <h4>Appointemnts For Today List</h4>
                    {props.timedlist.list.map((task, index) =>
                        <Task key={index} task={task} deleteTask={props.timedlist.deleteTask}
                            task_type="timedlist" updateTask={props.timedlist.updateTask}
                            date={date} doneTask={props.timedlist.doneTask} />)}

                    <Button disabled = {date<today? true : false} onClick={() => setModalShowTimed(true)}>Add</Button>
                    <Button onClick={() => setModalZoomMetting(true)}>Create Zoom meeting</Button>
                </div>
            </div>

        </>
    );
};
export default inject("todolist", "dailylist", "timedlist")(observer(List));