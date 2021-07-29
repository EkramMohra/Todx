import React from 'react'
import Calendar from 'react-calendar';
import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import Popup from 'reactjs-popup';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'
import Button from 'react-bootstrap/esm/Button';

const InCalendar = (props) => {

        const [date, setDate] = useState(new Date())
        const [open, setOpen] = useState(false);
        const closeModal = () => setOpen(false);


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
                setOpen(o => !o)

        }


        return (
                <div>
                        <Button onClick={() => setOpen(o => !o)}>Calendar</Button>
                        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                                <Calendar showNeighboringMonth={false} onClickDay={onChange} value={date} />

                        </Popup>


                </div>
        )

}

export default inject("todolist", "dailylist", "timedlist")(observer(InCalendar));
