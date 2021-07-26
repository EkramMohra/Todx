import { inject, observer } from 'mobx-react';
import React from 'react';
import List from './List'
import MyModal from './addpopup';
import { useState } from 'react';

const Container = (props) => {

    const [modalShow, setModalShow] = useState(false)


    return (
        <>
        <MyModal show={modalShow}
            onHide={() => setModalShow(false)}
        />

        <div>

           <List tasks={props.list.list}/>
           <button onClick={() => setModalShow(true)}>Add</button>
        </div>
        </>
    );
};

export default inject("list")(observer(Container));