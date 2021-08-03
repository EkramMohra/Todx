import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { Card, Spinner } from 'react-bootstrap'

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
        <Card className="workspace-card-style shadow">
        <Card.Body>
            <Card.Title>
                Todo list
                <select value={dateToPresent} style={{margin: '5px'}} onChange={handleChange}>
                    <option value="daily"> Last Day</option>
                    <option value="monthly">Last Month</option>
                </select> 
            </Card.Title>
        </Card.Body>
            <Chart
                width={'100%'}
                height={'300px'}
                chartType="PieChart"
                loader={<Spinner animation="border" variant="warning" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
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
        </Card>  
    )
}

export default inject("users")(observer(Todocharts));