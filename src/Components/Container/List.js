import React,{ useState } from 'react';
import Task from './Task';
import MyModal from './MyModal';
import './List.css'
import { inject, observer } from 'mobx-react';
const List = (props) => {
    const [modalShowToDo, setModalShowToDo] = useState(false)
    const [modalShowDaylies, setModalShowDaylies] = useState(false)
    const [modalShowTimed, setModalShowTimed] = useState(false)
    return (
        <>
            <MyModal show={modalShowToDo}
                addTask={props.todolist.addTask} time={false} priority={true} notification={false} date={true} onHide={() => setModalShowToDo(false)} />
            <MyModal show={modalShowDaylies}
                addTask={props.dailylist.addTask} time={false} priority={false} notification={false} date={false} onHide={() => setModalShowDaylies(false)} />
            <MyModal show={modalShowTimed}
                addTask={props.timedlist.addTask} time={true} priority={false} notification={true} date={true} onHide={() => setModalShowTimed(false)} />
            <div className="container">
                <div className="list">
                    <h4>To Do List</h4>
                    {props.todolist.list.map((task, index) =>
                        <Task key={index} task={task} deleteTask={props.todolist.deleteTask}
                        updateTask={props.todolist.updateTask} />)}
                    <button onClick={() => setModalShowToDo(true)}>Add</button>
                </div>
                <div className="list">
                    <h4>Dailies List</h4>
                    {props.dailylist.list.map((task, index) =>
                        <Task key={index} task={task} deleteTask={props.dailylist.deleteTask}
                        updateTask={props.dailylist.updateTask} />)}
                    <button onClick={() => setModalShowDaylies(true)}>Add</button>
                </div >
                <div className="list">
                    <h4>Appointemnts For Today List</h4>
                    {props.timedlist.list.map((task, index) =>
                        <Task key={index} task={task} deleteTask={props.timedlist.deleteTask}
                        updateTask={props.timedlist.updateTask} />)}
                    <button onClick={() => setModalShowTimed(true)}>Add</button>
                </div>
            </div>
        </>
    );
};
export default inject("todolist", "dailylist", "timedlist")(observer(List));