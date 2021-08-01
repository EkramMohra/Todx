import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './popup.css'
import axios from 'axios'

const Zoom = props => {

    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState("")
    const [senderId, setSenderId] = useState("1")
    const [zoomData, setZoomData] = useState({})
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")



    useEffect(() => {

        (async () => {
            // setSenderId(JSON.parse(sessionStorage.getItem('user'))[0].id)
            let users = await axios.get(`http://localhost:3005/users`, { senderId })
           let response = {}
           //await axios.get(`http://localhost:3005/newmeeting`)
           
            setZoomData(response.data)
            setUsers(users.data)

        })()



    }, [])

    function handleChange(event) {
        let target = event.target
        let value = target.value
        let name = target.name

        if (name === "date") setDate(value)
        if (name === "users") setUserId(value)
        if (name === "title") setTitle(value)
        if (name === "time") setTime(value)
    }

    async function shareTask() {

        let data = {
            sender_id: senderId,
            recevier_id: userId,
            title: title,
            time: time,
            date: date,
            task_type: props.task_type,
            zoom: zoomData
        }

        // await axios.post(`http://localhost:3005/shares`, data)
        props.onHide()

    }
    return (
        <Modal  {...props} centered aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header >
                <Modal.Title>Share Task</Modal.Title>
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
                    date:
                    <input type="date" pattern="\d{1,2}/\d{1,2}/\d{4}" className="input-class"
                        name="date" defaultValue={date} onChange={handleChange} />
                </div>
                <div>
                    time:
                    <input type="time" className="input-class" name="time"
                        defaultValue={time} onChange={handleChange} />
                </div>
                Send to:
                <select id="dropdown-item-button-client" className="form-control" name="users" onChange={handleChange}>
                    <option key="disabled" value={null} >Please Select User </option>
                    {users.map(user => user.id === senderId ? null : <option key={user.id} value={user.id} >{user.first} {user.last}</option>)}
                </select>
            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="warning" onClick={shareTask}>Share</Button>
            </Modal.Footer>
        </Modal >
    );
};
export default Zoom
