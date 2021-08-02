import React from 'react';
import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';

const Searchbox = (props) => {

    const [allTasks, setAllTasks] = useState([])
    const [title, setitle] = useState('')
    const [date, setDate] = useState('')

    const handleChange = (event) => {
        console.log(event.target.value)
        const myArr = event.target.value.split(" ");
        console.log(event.currentTarget)
        setitle(myArr[0])
        setDate(myArr[1])
    }

    useEffect(() => {
        (async () => {
            let data = await props.users.getAllTitles()
            setAllTasks(data)
        })()
    }, [title]);

    const changeDisplay = async ()  => {
        console.log(date)
        { props.todolist.getData(date) }
        { props.dailylist.getData(date) }
        { props.timedlist.getData(date) }

    }

    return (
        <div>
            <input type="text" list="data" onChange={handleChange} value={title} />
            <datalist id="data">
                {allTasks.map((item, key) =>
                    <option key={key} value={`${item.title} ${item.date}`} /> 
                )}
            </datalist>
            <button onClick={changeDisplay}>Search</button>
        </div>
    );
};

export default inject('users','dailylist','todolist','timedlist')(observer(Searchbox));