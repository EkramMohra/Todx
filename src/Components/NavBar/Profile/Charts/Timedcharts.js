import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";

const Timedcharts = (props) => {

    const [dateToPresent,setDateToPresent] = useState('daily')
    const [dataTochart, setDataTochar] = useState({all:1,done:1})

    const handleChange = (event) =>{
        setDateToPresent(event.target.value)
    }

    useEffect(  () => {

        (async () => { 
            {dateToPresent === 'daily' ? setDataTochar(await props.users.getDailyTimedTasks()) 
            : setDataTochar(await props.users.getMonthlyTimedTasks())}
            console.log(await props.users.getDailyTimedTasks())
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
                width={'600px'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={
                    dataTochart
                }
                options={{
                    hAxis: {
                        title: 'Time',
                    },
                    vAxis: {
                        title: 'Popularity',
                    },
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    );
};

export default inject("users")(observer(Timedcharts));
