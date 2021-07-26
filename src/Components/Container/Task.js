import React from 'react';
import { inject, observer } from 'mobx-react';
import MyModal from './popup';
import { useState } from 'react';
import Card from 'react-bootstrap/Card'

const Task = (props) => {


    const [modalShow, setModalShow] = useState(false);

    const deleteTask = () => props.list.deleteTask(props.task.id)

    console.log(props.task)


    return (
        <>
            <MyModal show={modalShow}
                task={props.task} onHide={() => setModalShow(false)} />

            <div class='card'>
                <Card bg={'primary'}  style={{ width: '18rem' }} className="mb-2" >
                    <Card.Header>{props.task.date} - {props.task.time} </Card.Header>
                    <Card.Body>
                        <Card.Title> {props.task.title} </Card.Title>
                        <Card.Text> {props.task.content} </Card.Text>
                        <Card.Text> {props.task.favourite} </Card.Text>
                        <Card.Text> {props.task.notification} </Card.Text>
                        <button onClick={() => setModalShow(true)}>edit</button>
                        <button onClick={deleteTask}>remove</button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default inject("list")(observer(Task));

