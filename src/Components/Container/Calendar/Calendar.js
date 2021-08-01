import React from 'react'
import Calendar from 'react-calendar';
import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import Popup from 'reactjs-popup';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'
// import Button from 'react-bootstrap/esm/Button';
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal'
import {IoCalendarOutline} from 'react-icons/io5'
import {MdClose} from 'react-icons/md'
import EventIcon from '@material-ui/icons/Event'

const InCalendar = (props) => {

        const [date, setDate] = useState(new Date())
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);


        const changeFormatDate = (string) => {
                string = string.toString().split(" ");
                var stringArray = new Array();
                for (var i = 0; i < string.length; i++) {
                        stringArray.push(string[i]);
                        if (i != string.length - 1) {
                                stringArray.push(" ");
                        }
                }
                let month = {
                        'Jan': '01',
                        'Feb': '02',
                        'Mar': '03',
                        'Apr': '04',
                        'May': '05',
                        'Jun': '06',
                        'Jul': '07',
                        'Aug': '08',
                        'Sep': '09',
                        'Oct': '10',
                        'Nov': '11',
                        'Dec': '12',
                }
                return `${stringArray[6]}-${month[stringArray[2]]}-${stringArray[4]}`
        }

        const onChange = async date => {
                setDate(date)
                let newDate = changeFormatDate(date)
                { props.todolist.getData(newDate) }
                { props.dailylist.getData(newDate) }
                { props.timedlist.getData(newDate) }
                handleClose()

        }


        return (
                <>
                <Button variant="contained" onClick={handleShow}   className="btn-calendar-style">
                        <IoCalendarOutline className="calendar-icon-style"/>
                </Button>

                <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        centered
                        keyboard={true}
                >
                        <Modal.Header className="modal-header-calendar-style">
                                <Modal.Title> Choose Date to display your tasks</Modal.Title>
                                <Button variant="outline-secondary" size="sm" className="rounded-circle" onClick={handleClose}><MdClose/></Button>
                        </Modal.Header>
                        <Modal.Body className="mx-auto myModal-calendar-body-style">
                                <Calendar showNeighboringMonth={false} onClickDay={onChange} value={date} />
                        </Modal.Body>
                </Modal>
                
                {/* <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                        <Calendar showNeighboringMonth={false} onClickDay={onChange} value={date} />
                </Popup> */}
                </>
        )

}

export default inject("todolist", "dailylist", "timedlist")(observer(InCalendar));
