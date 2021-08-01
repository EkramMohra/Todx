import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";

const Todocharts = (props) => {

    const [dateToPresent,setDateToPresent] = useState('daily')
    const [dataTochart, setDataTochar] = useState({all:1,done:1})

    const handleChange = (event) =>{
        setDateToPresent(event.target.value)
    }
    useEffect(  () => {

        (async () => { 
            const res = await props.users.getdailyToDoTasks()
            {dateToPresent === 'daily' ? setDataTochar(res) 
            : setDataTochar(await props.users.getMonthlyToDoTasks())}
        })()
    }, [dateToPresent]);

    return (    
        <div>

            <label>Todo list </label>
            <select value={dateToPresent} onChange={handleChange}>
                <option value="daily"> Last Day</option>
                <option value="monthly">Last Month</option>
            </select>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Task', 'Hours per Day'],
                    ['Done Tasks',dataTochart.done],
                    ['Pending Tasks', dataTochart.all - dataTochart.done]
                ]}
                options={{
                    title: 'All To do Tasks',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    );
};

export default inject("users")(observer(Todocharts));