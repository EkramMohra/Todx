import React from "react";
import { observer, inject } from 'mobx-react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import Switch from "react-switch";
import './popup.css'

const MyModal = props => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [favourite, setFavourite] = useState(false)
    const [time, setTime] = useState("")
    const [date, setDate] = useState("")
    const [notification, setNotification] = useState({ checked: false })


    const addTask = () => {
        console.log(notification.checked)
        props.list.addTask(title, content, favourite, time, date, notification.checked)
        props.onHide()
        emptyInputs()
    }

    const emptyInputs = () => {
        setTitle("")
        setContent("")
        setFavourite("")
        setTime("")
        setDate("")
        setNotification("")
    }

    function handleChangeNotification(checked) {
        console.log(checked);
        setNotification({ checked });
    }

    const handleChange = (e) => {
        let name = e.target.name
        console.log(name)
        name === "title" ? setTitle(e.target.value)
            : name === "content" ? setContent(e.target.value)
                : name === "favourite" ? setFavourite(!favourite)
                    : name === "time" ? setTime(e.target.value)
                        : setDate(e.target.value)

    }

    return (
        <Modal  {...props} centered aria-labelledby="contained-modal-title-vcenter">


            <Modal.Header >
                <Modal.Title>Add client</Modal.Title>
            </Modal.Header>

            <Modal.Body>


                <div> title:<input className="input-class" required name="title" defaultValue={title} onChange={handleChange} /></div>
                <div> content:<textarea className="input-class" name="content" defaultValue={content} onChange={handleChange} /></div>
                <div> time:<input type="time" className="input-class" name="time" defaultValue={time} onChange={handleChange} /></div>
                <div> date:<input type="date" pattern="\d{1,2}/\d{1,2}/\d{4}" className="input-class" name="date" defaultValue={date} onChange={handleChange} /></div>
                <label>
                    <span> notification:</span>
                    <Switch onChange={handleChangeNotification} checked={notification.checked} />
                </label>
                <div>  <label for="html">favourite</label><input type="checkbox" className="input-class" name="favourite" defaultValue={favourite} onChange={handleChange} />
                </div>



            </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={addTask}>Add</Button>
                </Modal.Footer>

        </Modal>
            );
};

            export default inject("list")(observer(MyModal))



