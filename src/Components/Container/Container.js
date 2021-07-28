import { inject, observer } from 'mobx-react';
import {Route} from 'react-router-dom' 
import NavBar from '../NavBar/NavBar'

import React from 'react';
import List from './List'

// import MyModal from './MyModal';
import { useState } from 'react';

const Container = (props) => {

    const [modalShow, setModalShow] = useState(false)

    console.log(props.list.list)

    return (
    // <div> hello from container</div>
        [ 
            <NavBar />,
            <div>hellohellohellohellohellohellohellohellohellohellohellohellohellohellohello</div>,
            // <Route key="clients" exact path="/clients" render={() => <MyModal show={modalShow} onHide={() => setModalShow(false)}/>}  />,
            <Route key="lists" exact path="/lists" render={() => <List tasks={props.list.list} />}  />
        
        ] 
        // <>
        // <MyModal show={modalShow}
        //     onHide={() => setModalShow(false)}
        // />

        // <div>

        //    <List tasks={props.list.list}/>
        //    <button onClick={() => setModalShow(true)}>Add</button>
        // </div>
        // </>
    );
};

export default inject("list")(observer(Container));