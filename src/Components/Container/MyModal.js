import React, { useState, useRef, useEffect } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import {TextField, Switch} from '@material-ui/core';
import "./popup.css"
import { Editor } from '@tinymce/tinymce-react';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './sweetAlertStyle.css'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%'
      },
    },
    body: {
        fontSize: '17px',
        fontWeight: '700'
    }
}))
const MySwal = withReactContent(Swal)

const MyModal = (props) => {

    const classes = useStyles()
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [date, setDate] = useState(props.DateOfTheDay)
    const [time, setTime] = useState("--:--")
    const [priority, setPriority] = useState({ checked: false })
    const [notification, setNotification] = useState({ checked: false })
    
    useEffect(() => {
        setDate(props.DateOfTheDay)
    },[date])

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
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your task has been successfully added',
            showConfirmButton: false,
            timer: 2500
             
        } )
        props.onHide()
        emptyInputs()
    }

    const emptyInputs = () => {
        setTitle("")
        setContent("")
        setDate("")
        setPriority("")
        setNotification("")
        setTime("")
    }

    function handleChangePriority(event) {
        setPriority({ checked: event.target.checked })
    }

    function handleChangeNotification(event) {
        setNotification({ checked: event.target.checked })
    }

    function handleChange(e) {
        let name = e.target.name
        name === "title" ? setTitle(e.target.value)
                : name === "time" ? setTime(e.target.value)
                    : setDate(e.target.value)
    }

    const handleEditorChange = e =>{
        setContent(e.target.getContent())
        console.log(content)
    }

    return (
        <Modal {...props} size="lg" centered aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header>
                <Modal.Title>New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body className={classes.body}>
            <form className={classes.root} noValidate autoComplete="off">
                        <>
                        Title
                        <TextField
                            id="outlined-title-input"
                            type="text"
                            name="title" 
                            defaultValue={title}
                            onChange={handleChange}
                            autoComplete="current-title"
                            size="small"
                        />
                        </>

                        <>
                        Content
                        <Editor
                            apiKey='fbw7pxuu068kh25s5vxlv8scegnbfb5dy6e8ffjktuhgqo60'
                            onInit={(evt, editor) => editorRef.current = editor}
                            init={{
                                skin: "outside",
                                icons: "thin",
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'lists checklist advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: ' fontsizeselect | fontselect | forecolor | ' +
                                'bold italic backcolor |  bullist numlist checklist|' +
                                ' alignleft aligncenter alignright alignjustify | outdent indent | ' +
                                'removeformat |  formatselect | undo redo | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                
                            }}
                            name="content"
                            onChange={handleEditorChange}
                        />
                        </>
                        {props.time 
                            ?
                            <>
                            Time
                            <TextField
                                id="outlined-time-input"
                                name="time"
                                defaultValue={time}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                            </>
                            :
                            null
                        }
                        {
                            props.date
                            ?
                            <>
                            Date
                            
                                <TextField
                                    id="outlined-password-input"
                                    type="date" 
                                    pattern="\d{1,2}/\d{1,2}/\d{4}"
                                    autoComplete="current-password"
                                    size="small"
                                    name="date" 
                                    defaultValue={date}
                                    onChange={handleChange}
                                />
                            </>
                            :
                            null
                        }
                        {
                        props.priority !== undefined 
                        ? 
                        <>
                            Priority 
                            <Switch
                                checked={priority.checked}
                                onChange={handleChangePriority}
                                name="priority"
                                color="secondary"
                            />
                        </>
                        : null}

                        {   
                        props.notification !== undefined 
                        ? 
                        <>
                            Notification 
                            <Switch
                                checked={notification.checked}
                                onChange={handleChangeNotification}
                                name="priority"
                                color="secondary"
                            />
                        </>
                        : null}

                </form>
                {/* <div>
                    title:
                    <input
                        className="input-class" name= "title" required defaultValue={title} onChange={handleChange}
                    />
                </div> */}
                {/* <div>
                    content:
                    <Editor
                        apiKey='fbw7pxuu068kh25s5vxlv8scegnbfb5dy6e8ffjktuhgqo60'
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                            skin: "outside",
                            icons: "thin",
                            height: 300,
                            menubar: false,
                            plugins: [
                                'lists checklist advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: ' fontsizeselect | fontselect | forecolor | ' +
                            'bold italic backcolor |  bullist numlist checklist|' +
                            ' alignleft aligncenter alignright alignjustify | outdent indent | ' +
                            'removeformat |  formatselect | undo redo | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        name="content"
                        onChange={handleEditorChange}
                    />
                </div> */}
                {/* {
                    props.time ? <div> time:<input type="time" className="input-class" name="time"
                        defaultValue={time} onChange={handleChange} /> </div> : null
                } */}
                {/* {
                    props.date ?
                    
                    <div> date:
                        <input type="date" pattern="\d{1,2}/\d{1,2}/\d{4}" className="input-class"
                            name="date" defaultValue={date} onChange={handleChange} /> </div> : null
                } */}
                {/* {props.priority ? <label> <span> priority:</span>
                    <Switch onChange={handleChangePriority} checked={priority.checked}
                    />
                </label> : null
                } */}
                {/* {props.notification ? <label> <span> notification:</span>
                    <Switch onChange={handleChangeNotification} checked={notification.checked}
                    />
                </label> : null} */}
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

export default MyModal
