import { inject, observer } from 'mobx-react';
import React from 'react';
import List from './List'
const Container = (props) => {

    console.log(props.list.list[0])
    return (
        <div>
           <List tasks={props.list.list}/>
        </div>
    );
};

export default inject("list")(observer(Container));