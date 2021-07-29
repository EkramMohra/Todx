import React, {useState} from 'react'
import NavBar from '../NavBar/NavBar'
import List from './List'
import Pusher from 'pusher-js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { inject, observer } from 'mobx-react';

const MySwal = withReactContent(Swal)
const Container = (props) => {
    const [flag, setFlag] = useState(false)

    Pusher.logToConsole = true;
    // let flag = false
    let userId = JSON.parse(sessionStorage.getItem('user'))[0].id

    let channel =`share_task_recevier_id_${userId}`
    var pusher = new Pusher('5b82386d16e4fe295409', {
        cluster: 'eu'
    })
    
    var channelPusher = pusher.subscribe(channel);
    channelPusher.bind('my-event', function(data) {
        // setFlag(true)
        // console.log(flag)
        MySwal.fire({
            icon: "warning",
            title: JSON.stringify(data.message),
            showConfirmButton: false,
            timer: 2000
        })
        props.todolist.addTask(data.task)
    })
    console.log('Container')
    return (
        [ 
            console.log(flag),
            <NavBar flag={flag}/>,
            <List />
        ] 
    )
}

export default inject("todolist", "dailylist", "timedlist")(observer(Container))