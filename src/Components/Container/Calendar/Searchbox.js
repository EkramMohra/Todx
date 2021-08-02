import React from 'react';
import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';

const Searchbox = (props) => {

    const [allTasks, setAllTasks] = useState([])
    const [title, setitle] = useState('')
    const [date, setDate] = useState('')

    const handleChange = (event) => {
        const myArr = event.target.value.split(" ");
        let i = 1
        setitle(myArr[0])
        let result = myArr[1].match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}");
        while(result == null ){
            result = myArr[i].match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}");
            myArr[0] = myArr[0] + myArr[1]
            i++
        }
        setDate(myArr[i])
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