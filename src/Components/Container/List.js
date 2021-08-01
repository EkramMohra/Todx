import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { HiOutlineViewGridAdd } from "react-icons/hi";
import Task from './Task';
import MyModal from './MyModal';
import Zoom from './Zoom';
import Fab from '@material-ui/core/Fab';
import './List.css'

const moment = require("moment");

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


            <div className="list-container">
                <Card className="list" as="h5">
                    <Card.Header>
                        <Row>
                        {/* moment().format("YYYY-MM-DD", true) */}
                            <Col sm={8} className="mt-2"> ToDo List - {props.todolist.DateOfTheDay}</Col>
                            <Col sm={4}>  
                                <Fab 
                                    size="small" 
                                    // color="secondary" 
                                    className="btn-add-task"  
                                    onClick={() => setModalShowToDo(true)}
                                    aria-label="add">
                                    <HiOutlineViewGridAdd/>
                                </Fab>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        {props.todolist.list.map((task, index) =>
                        <Task key={`todolist-${index}` }
                              task={task} 
                              deleteTask={props.todolist.deleteTask}
                              task_type="todolist" 
                              updateTask={props.todolist.updateTask}
                            doneTask={props.todolist.doneTask} 
                        />)}
                    </Card.Body>
                </Card>
                
                <Card className="list">
                    <Card.Header as="h5">
                        <Row>
                            <Col sm={8} className="mt-2">  Dailies List </Col>
                            <Col sm={4}> 
                                <Fab 
                                    size="small" 
                                    // color="secondary" 
                                    className="btn-add-task"  
                                    onClick={() => setModalShowDaylies(true)}
                                    aria-label="add">
                                    <HiOutlineViewGridAdd/>
                                </Fab> 
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        {props.dailylist.list.map((task, index) =>
                            <Task key={index} 
                                    task={task} 
                                    deleteTask={props.dailylist.deleteTask}
                                    task_type="dailylist" 
                                    updateTask={props.dailylist.updateTask}
                                    doneTask={props.dailylist.doneTask} 
                            />
                        )}   
                    </Card.Body>
                </Card>
            
                <Card className="list">
                    <Card.Header as="h5">
                        <Row>
                            <Col sm={8} className="mt-2 apointement-style">   Appointemnts List For  - {props.todolist.DateOfTheDay}  </Col>
                            <Col sm={4}>  
                                <Fab 
                                    size="small" 
                                    className="btn-add-task"  
                                    onClick={() => setModalShowTimed(true)}
                                    aria-label="add">
                                    <HiOutlineViewGridAdd/>
                                </Fab>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                       
                        {props.timedlist.list.map((task, index) =>
                            <Task key={index} 
                                task={task} 
                                deleteTask={props.timedlist.deleteTask}
                                task_type="timedlist" 
                                updateTask={props.timedlist.updateTask}
                                doneTask={props.timedlist.doneTask} 
                            />
                        )}
                    </Card.Body>
                </Card>
            </div>

        </>
    );
};
export default inject("todolist", "dailylist", "timedlist")(observer(List))