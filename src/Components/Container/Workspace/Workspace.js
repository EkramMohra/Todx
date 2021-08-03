import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Card, Image } from 'react-bootstrap'
import Charts from '../../NavBar/Profile/Charts/Charts'
import { Chart } from "react-google-charts"
import {FaUserEdit} from 'react-icons/fa'
import {RiUploadCloud2Fill} from 'react-icons/ri'
import {TextField, Button, OutlinedInput} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const Workspace = () => {
    return (
        <div >
            <div className="profile-main-section">
                <Charts />
            </div>
        </div>
    );
};

export default Workspace