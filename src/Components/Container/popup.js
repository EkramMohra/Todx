import React , {useRef} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import './popup.css'
import {TextField, Switch, FormControlLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './sweetAlertStyle.css'
import { Editor } from '@tinymce/tinymce-react';

const MySwal = withReactContent(Swal)

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

const PopUp = props => {
    const classes = useStyles()

    const editorRef = useRef(null);
    // const log = () => {
    //     if (editorRef.current) {
    //     console.log(editorRef.current.getContent());
    //     }
    // };

    const [title, setTitle] = useState(props.task.title)
    const [content, setContent] = useState(props.task.content)
    const [date, setDate] = useState(props.task.date)
    const [priority, setPriority] = useState({ checked: props.task.priority ? true : false })
    const [notification, setNotification] = useState({ checked: props.task.notification ==1?true : false  })
    const [time, setTime] = useState(props.task.time)
    
    function handleChangePriority(event) {
        setPriority({ checked:  event.target.checked });
    }

    function handleChangeNotification(event) {
        setNotification({ checked: event.target.checked })
    }
    function updateTask() {
        let id = props.task.id
        let data = {
            id: id,
            title: title,
            content: content,
            priority: priority.checked?true:false,
            date: date,
            notification: notification.checked==1?true:false,
            time: time
        }
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your task has been successfully updated',
            showConfirmButton: false,
            timer: 2500
             
        } )
        props.updateTask(data)
        props.onHide()
    }

    const handleEditorChange = e =>{
        setContent(e.target.getContent())
    }

    function handleChange(e) {
        let name = e.target.name
        name === "title" ? setTitle(e.target.value)
            : name === "content" ? setContent(e.target.value)
                : name === "time" ? setTime(e.target.value)
                    : setDate(e.target.value)
    }
    return (
        <Modal  {...props}  size="lg" centered aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header >
                <Modal.Title>Update Task</Modal.Title>
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
                            initialValue={content}
                            name="content"
                            // dangerouslySetInnerHTML={{ __html: content }}
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
