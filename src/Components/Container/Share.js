import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './popup.css'
import axios from 'axios'

const Share = props => {

    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState("")
    const [senderId, setSenderId] = useState(JSON.parse(sessionStorage.getItem('user'))[0].id)

    useEffect(() => {

        (async () => {
            let users = await axios.get(`http://localhost:3005/users`, { senderId })
            setUsers(users.data)
            setSenderId(JSON.parse(sessionStorage.getItem('user'))[0].id)
        })()



    }, [])

    function handleChange(event) {
        let target = event.target
        let value = target.value
        setUserId(value)
    }

    async function shareTask() {

        let data = {
            sender_id: senderId,
            recevier_id: userId,
            task_id: props.task.id,
            task_type: props.task_type
        }

        let response = await axios.post(`http://localhost:3005/shares`, data)
        props.onHide()
    }
    return (
        <Modal  {...props} centered aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header >
                <Modal.Title>Share Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <select id="dropdown-item-button-client" className="form-control" name="owner" onChange={handleChange}>
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
export default Share
