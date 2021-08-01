import React from 'react';
import Popup from './popup';
import { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Share  from './Share'
import './task.css'

const Task = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [shareModalShow, setShareModalShow] = useState(false);

    const deleteTask = () => props.deleteTask(props.task.id)
    const doneTask = () => props.doneTask(props.task.id)
    const pattern = new RegExp('^(https?|ftp)://');
    
    return (
        <>

            <Popup show={modalShow}
                task={props.task} updateTask={props.updateTask}
                onHide={() => setModalShow(false)} time={props.task.time}
                priority={props.task.priority} notification={props.task.notification}
                date={props.task.date}  />

   
            <Share show={shareModalShow}
                task={props.task} task_type={props.task_type}
                onHide={() => setShareModalShow(false)}/>

            <Card style={{ width: '90%' }} className={`mb-2 ${props.task.status=="pending"?"pending":"done"}`} >
                <Card.Header> {props.task.title} </Card.Header>
                <Card.Body>
                    <Card.Title>
                        {props.task.content.length>50&&pattern.test(props.task.content)?
                        <a href={props.task.content}>
                         {props.task.content.length>100?"Start Zoom Meeting":"Join Zoom Meeting"}
                        </a>
                         :props.task.content} 
                    </Card.Title>
                    {props.task.time ? <Card.Title> {props.task.time}</Card.Title> : null}
                    <button onClick={() => setModalShow(true)}>edit</button>
                    <button onClick={deleteTask}>remove</button>
                    <Button onClick={doneTask} disabled = {props.task.status === "done"? 'disabled' : null}>Done</Button>

                    {props.task_type === "dailylist"||props.task.content.length>100 ? null : <button onClick={() => setShareModalShow(true)}>share</button> }
                </Card.Body>
            </Card>
        </>
    )
}

export default Task
