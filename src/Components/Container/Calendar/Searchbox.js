import React from 'react';
import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
       
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
    },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        // pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    input:{
        width: '70%',
        marginTop: '10px',
        height: '35px',
        borderRadius: '4px',
        border: '1px gray solid'
    },
    btn: {
        marginLeft: '7px'
    },
    inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
           
            [theme.breakpoints.up('md')]: {
            width: '20ch',
            border: '1px gray solid',
            borderRadius: '5px',
            margin: '5px'
        }
    }
}))

const Searchbox = (props) => {
    const classes = useStyles()
    const [allTasks, setAllTasks] = useState([])
    const [title, setitle] = useState('')
    const [searchFull, setSearchFull] = useState('')
    const [date, setDate] = useState('')

    const handleChange = (event) => {
        const myArr = event.target.value.split(" ");
        console.log(myArr)
        let i = 1
        setitle(myArr[0])
        
        let result = myArr[1] ? myArr[1].match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}") : ""
        while(result == null ){
            result =  myArr[i] ? myArr[i].match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}") : ""
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
    }, [title])

    const changeDisplay = async ()  => {
        console.log(date)
        { props.todolist.getData(date) }
        { props.dailylist.getData(date) }
        { props.timedlist.getData(date) }

    }

    return (
        <div>
            {/* <div className={classes.search}> */}
             
            
              
              {/* <InputBase
                placeholder="Search…"
                type="text" 
                list="data"
                onChange={handleChange} 
                value={title}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div> */}
            {/* <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search..."
                    aria-label="Search..."
                    aria-describedby="basic-addon2"
                    type="text" l
                    ist="data" 
                    onChange={handleChange} value={title} 
                />
                <Button variant="outline-secondary"  onClick={changeDisplay} id="button-addon2">
                    <SearchIcon /> Search
                </Button>
            </InputGroup> */}
            <input type="text" 
                    className={classes.input} 
                    list="data" 
                    onChange={handleChange} 
                    value={title} 
                    placeholder="Search..."
            />
            <datalist id="data">
                {allTasks.map((item, key) =>
                    <option key={key} value={`${item.title} ${item.date}`} /> 
                )}
            </datalist>
            <Button size="sm"  className={classes.btn} variant="outline-secondary" onClick={changeDisplay}><SearchIcon /></Button>
        </div>
    );
};

export default inject('users','dailylist','todolist','timedlist')(observer(Searchbox));