import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Chart } from "react-google-charts";
import { Card, Spinner } from 'react-bootstrap'

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

        <Card className="workspace-card-style shadow">
        <Card.Header className="profile-header-card"> 
            Busiest hours 
            <select value={dateToPresent} style={{margin: '5px'}} onChange={handleChange}>
                <option value="daily"> Last Day</option>
                <option value="monthly">Last Month</option>
            </select>
        </Card.Header>
        <Card.Body>
            <Card.Title> 
            </Card.Title>
        </Card.Body>
            <Chart
                width={'100%'}
                height={'400px'}
                chartType="LineChart"
                loader={<Spinner animation="border" variant="warning" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
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
        </Card>
    );
};

export default inject("users")(observer(Timedcharts));
