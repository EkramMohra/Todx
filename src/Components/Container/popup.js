
import React from "react";
import { observer, inject } from 'mobx-react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import './popup.css'

const MyModal = props => {

    const [title, setTitle] = useState(props.task.title)
    const [content, setContent] = useState(props.task.content)
    const [favourite, setFavourite] = useState(props.task.favourite)
    const [time, setTime] = useState(props.task.time)
    const [date, setDate] = useState(props.task.date)
    const [notification, setNotification] = useState(props.task.notification)
    const [status, setStatus] = useState(props.task.status)

    function updateTask() {
        let id = props.task.id
        props.list.updateTask(id, title, content, favourite, time, date, notification, status)
        console.log(props.task);
        props.onHide()

    }

    function handleChange(e) {
        let name = e.target.name
        name === "title" ? setTitle(e.target.value)
            : name === "content" ? setContent(e.target.value)
                : name === "favourite" ? setFavourite(e.target.value)
                    : name === "time" ? setTime(e.target.value)
                        : name === "date" ? setDate(e.target.value)
                            : name === "notification" ? setNotification(e.target.value)
                                : setStatus(e.target.value)
    }

    return (
        <Modal  {...props} centered aria-labelledby="contained-modal-title-vcenter">


            <Modal.Header >
                <Modal.Title>update client</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <div> title:<input className="input-class" name="title" defaultValue={title} onChange={handleChange} /></div>
                <div> content:<input className="input-class" name="content" defaultValue={content} onChange={handleChange} /></div>
                <div> favourite:<input className="input-class" name="favourite" defaultValue={favourite} onChange={handleChange} /></div>
                <div> time:<input className="input-class" name="time" defaultValue={time} onChange={handleChange} /></div>
                <div> date:<input className="input-class" name="date" defaultValue={date} onChange={handleChange} /></div>
                <div> notification:<input className="input-class" name="notification" defaultValue={notification} onChange={handleChange} /></div>
                <div> status:<input className="input-class" name="status" defaultValue={status} onChange={handleChange} /></div>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="warning" onClick={updateTask}>Update</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default inject("list")(observer(MyModal))



