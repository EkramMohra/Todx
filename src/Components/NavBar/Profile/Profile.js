import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import { Card, Image, Button } from 'react-bootstrap'
import './Profile.css'
import Charts from './Charts/Charts'
import { Chart } from "react-google-charts";
import imageProfile from './profile.png'
import { AiOutlineEdit } from "react-icons/ai";
import Popup from 'reactjs-popup';


const Profile = (props) => {

    const photoid = []

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const [updatedClient, setUpdatedClient] = useState({
        first: props.users.first,
        last: props.users.last,
        password: props.users.password,
        photo: props.users.photo_id
    })

    function handleChange(event) {
        const value = event.target.value;
        setUpdatedClient({
            ...updatedClient,
            [event.target.name]: value
        });
    }

    const updateClient = () => {
        setOpen(o => !o)
        console.log(updatedClient)
        props.users.updateUserInfo(updatedClient)
    }
    
    return (
        <div >
            <Card>
                <Card.Header> </Card.Header>
                <Card.Body>
                    <Card.Title> <Image src={imageProfile} className="profile-image" roundedCircle /> </Card.Title>
                    <Card.Text >
                        {updatedClient.first}  {updatedClient.last}
                    </Card.Text>
                    <Card.Text >
                        <button onClick={() => setOpen(o => !o)}> <AiOutlineEdit /></button>
                    </Card.Text>
                </Card.Body>
            </Card>

            <br />
            <Charts />
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <label>First Name</label><input name="first" onChange={handleChange} value={updatedClient.first} />
                <br></br>
                <label>Surname</label><input name="last" onChange={handleChange} value={updatedClient.last} />
                <br></br>
                <label>Password</label>
                <input name="password" type="password" onChange={handleChange} value={updatedClient.password} />

                <button onClick={updateClient}>update</button>
            </Popup>

        </div>
    );
};

export default inject("users")(observer(Profile));