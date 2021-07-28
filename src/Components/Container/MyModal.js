import React from "react"
import { observer, inject } from "mobx-react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import Switch from "react-switch"
import "./popup.css"

const MyModal = (props) => {

    console.log(props.task)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [priority, setPriority] = useState({ checked: false })
    const [notification, setNotification] = useState({ checked: false })

    const addTask = () => {

        let data = {
            title: title,
            content: content,
            priority: priority.checked,
            date: date,
            notification: notification.checked,
            time: time
        }

        props.addTask(data)
        props.onHide()
        emptyInputs()
    }

    const emptyInputs = () => {
        setTitle("")
        setContent("")
        setDate("")
        setPriority("")
        setNotification("")
    }

    function handleChangePriority(checked) {
        setPriority({ checked })
    }

    function handleChangeNotification(checked) {
        setNotification({ checked })
    }

    function handleChange(e) {
        let name = e.target.name
        name === "title" ? setTitle(e.target.value)
            : name === "content" ? setContent(e.target.value)
                : name === "time" ? setTime(e.target.value)
                    : setDate(e.target.value)
    }

    return (
        <Modal {...props} centered aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    title:
                    <input
                        className="input-class" required name="title"
                        defaultValue={title} onChange={handleChange}
                    />
                </div>
                <div>
                    content:
                    <textarea
                        className="input-class" name="content"
                        defaultValue={content} onChange={handleChange}
                    />
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
                {props.priority  ? <label> <span> priority:</span>
                    <Switch onChange={handleChangePriority} checked={priority.checked}
                    />
                </label> : null
                }

                {props.notification ? <label> <span> notification:</span>
                    <Switch onChange={handleChangeNotification} checked={notification.checked}
                    />
                </label> : null}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="warning" onClick={addTask}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default inject("todolist")(observer(MyModal))
