import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import Task from './Task';
import MyModal from './MyModal';
import Zoom from './Zoom';
import './List.css'

const List = (props) => {


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
                    <h4>To Do List</h4>
                    {props.todolist.list.map((task, index) =>
                        <Task key={index} task={task} deleteTask={props.todolist.deleteTask}
                            task_type="todolist" updateTask={props.todolist.updateTask}
                            doneTask={props.todolist.doneTask} />)}
                    <button onClick={() => setModalShowToDo(true)}>Add</button>
                </div>

                <div className="list">
                    <h4>Dailies List</h4>
                    {props.dailylist.list.map((task, index) =>
                        <Task key={index} task={task} deleteTask={props.dailylist.deleteTask}
                            task_type="dailylist" updateTask={props.dailylist.updateTask}
                            doneTask={props.dailylist.doneTask} />)}

                    <button onClick={() => setModalShowDaylies(true)}>Add</button>
                </div >
                <div className="list">
                    <h4>Appointemnts For Today List</h4>
                    {props.timedlist.list.map((task, index) =>
                        <Task key={index} task={task} deleteTask={props.timedlist.deleteTask}
                            task_type="timedlist" updateTask={props.timedlist.updateTask}
                            doneTask={props.timedlist.doneTask} />)}

                    <button onClick={() => setModalShowTimed(true)}>Add</button>
                    <button onClick={() => setModalZoomMetting(true)}>Crate Zoom meeting</button>
                </div>
            </div>

        </>
    );
};
export default inject("todolist", "dailylist", "timedlist")(observer(List));