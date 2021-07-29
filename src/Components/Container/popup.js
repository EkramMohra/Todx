import React from "react";
import { observer, inject } from 'mobx-react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import Switch from "react-switch";
import './popup.css'
const PopUp = props => {
    const [title, setTitle] = useState(props.task.title)
    const [content, setContent] = useState(props.task.content)
    const [date, setDate] = useState(props.task.date)
    const [priority, setPriority] = useState({ checked: props.task.priority ? true : false })
    const [notification, setNotification] = useState({ checked: props.task.notification == 1 ? true : false })
    const [time, setTime] = useState(props.task.time)
    function handleChangePriority(checked) {
        setPriority({ checked });
    }
    function handleChangeNotification(checked) {
        setNotification({ checked })
    }
    function updateTask() {
        let id = props.task.id
        let data = {
            id: id,
            title: title,
            content: content,
            priority: priority.checked ? true : false,
            date: date,
            notification: notification.checked == 1 ? true : false,
            time: time
        }
        props.updateTask(data)
        props.onHide()
    }
    function handleChange(e) {
        let name = e.target.name
        name === "title" ? setTitle(e.target.value)
            : name === "content" ? setContent(e.target.value)
                : name === "time" ? setTime(e.target.value)
                    : setDate(e.target.value)
    }
    return (
        <Modal  {...props} centered aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header >
                <Modal.Title>update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    title:<input className="input-class" name="title" defaultValue={title}
                        onChange={handleChange} />
                </div>
                <div>
                    content:<input className="input-class" name="content" defaultValue={content}
                        onChange={handleChange} />
                </div>
                {
                    props.time ? <div> time:<input type="time" className="input-class" name="time"
                        defaultValue={time} onChange={handleChange} /> </div> : null
                }
                {
                    props.date ? <div> date:
                        <input type="date" pattern="\d{1,2}/\d{1,2}/\d{4}" className="input-class"
                            name="date" defaultValue={date} onChange={handleChange} /> </div> : null
                }
                {props.priority !== undefined ? <label> <span> priority:</span>
                    <Switch onChange={handleChangePriority} checked={priority.checked}
                    />
                </label> : null}
                {props.notification !== undefined ? <label> <span> notification:</span>
                    <Switch onChange={handleChangeNotification} checked={notification.checked}
                    />
                </label> : null}
            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="warning" onClick={updateTask}>Update</Button>
            </Modal.Footer>
        </Modal >
    );
};
export default PopUp