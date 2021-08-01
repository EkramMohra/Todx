import React from 'react';
import Popup from './popup';
import { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Share from './Share'
import './task.css'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './sweetAlertStyle.css'
import Animate from 'animate.css-react'
import 'animate.css/animate.css'

const MySwal = withReactContent(Swal)

const moment = require("moment");
let today = moment().format("YYYY-MM-DD", true)

const Task = (props) => {

    const [modalShow, setModalShow] = useState(false)
    const [shareModalShow, setShareModalShow] = useState(false)

    const deleteTask = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33 ',
            cancelButtonColor: '#99c1b9',
            confirmButtonText: 'Yes, delete it!',
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOut'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                )
                props.deleteTask(props.task.id)
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    'Your task is safe ☺️',
                    'error'
                )
            }
        })
    }
    const doneTask = () => props.doneTask(props.task.id)
    const pattern = new RegExp('^(https?|ftp)://');

    return (
        <>
            <Popup show={modalShow}
                task={props.task} updateTask={props.updateTask}
                onHide={() => setModalShow(false)} time={props.task.time}
                priority={props.task.priority} notification={props.task.notification}
                date={props.task.date} />



            <Share
                show={shareModalShow}
                task={props.task}
                task_type={props.task_type}
                onHide={() => setShareModalShow(false)} />
            <Accordion className={`${props.task.status == "pending" ? "pending" : "done"}`}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions3-content"
                    id="additional-actions3-header"
                >
                    <Row className="row-task-style">
                        <Col sm={8}>
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={<Checkbox
                                    onClick={doneTask}
                                    disabled={props.task.status === "done" ? true : false}
                                    checked={props.task.status === "done" ? true : false}
                                />}
                                label={props.task.title}
                            />
                        </Col>
                        <Col sm={4}>
                            <AccordionActions>
                                <IconButton className="btn-action-style" size="small" size="small" color="primary" onClick={() => setModalShow(true)}>
                                    <EditIcon className="icon-style" />
                                </IconButton>

                                <IconButton aria-label="delete" className="btn-action-style" size="small" size="small" color="primary" onClick={deleteTask} >
                                    <DeleteRoundedIcon className="icon-style" />
                                </IconButton>

                                {props.task_type === "dailylist"
                                    ? null :
                                    <IconButton className="btn-action-style" size="small" size="small" color="primary" onClick={() => setShareModalShow(true)} >
                                        <ShareIcon className="icon-style" />
                                    </IconButton>
                                }
                            </AccordionActions>
                        </Col>
                    </Row>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography color="textSecondary" dangerouslySetInnerHTML={{ __html: props.task.content }}>

                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* <Card style={{ width: '90%' }} className={`mb-2 ${props.task.status=="pending"?"pending":"done"}`} >
            <Share show={shareModalShow}
                task={props.task} task_type={props.task_type}
                onHide={() => setShareModalShow(false)} />

            <Card style={{ width: '90%' }} className={`mb-2 ${props.task.status == "pending" ? "pending" : "done"}`} >
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
                    <Button disabled={props.date < today} onClick={() => setModalShow(true)}>edit</Button>
                    <Button disabled={props.date < today} onClick={deleteTask}>remove</Button>
                    <Button onClick={doneTask} disabled={props.task.status === "done" ? 'disabled' : null  || props.date === today?false:true}>Done</Button>
                    {props.task_type === "dailylist"||props.task.content.length>100 ? null : <button onClick={() => setShareModalShow(true)}>share</button> }
                </Card.Body>
            </Card> */}
        </>
    )
}

export default Task
