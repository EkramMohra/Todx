import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Card, Image } from 'react-bootstrap'
import Charts from './Charts/Charts'
import { Chart } from "react-google-charts"
import imageProfile from './images/avatar.png'
import {FaUserEdit} from 'react-icons/fa'
import {RiUploadCloud2Fill} from 'react-icons/ri'
import {TextField, Button, OutlinedInput} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Popup from 'reactjs-popup'
import './Profile.css'


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))


const Profile = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [validation, setValidation] = useState(true)
    const [image, setImage] = useState({ preview: "", raw: "" })
    const photoid = []
    const [first, setFirstClient] = useState(props.users.first)
    const [last, setLastClient] = useState(props.users.last)
    const [password, setPasswordClient] = useState(props.users.password)
    const [email, setemailClient] = useState(props.users.email)

    const [updatedClient, setUpdatedClient] = useState({
        first: props.users.first,
        last: props.users.last,
        password: props.users.password,
        photo: props.users.photo_id
    })

    // useEffect(() => {
    //     setPasswordClient( props.users.password)
    //     setFirstClient( props.users.first)
    //     setLastClient( props.users.last)

    // }, [first, last, password])

    function handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        if(name === 'confirm-password')
            checkPassword(value)
        if(name === 'password')
            setPasswordClient(value)
        if(name === 'first')
            setFirstClient(value)
        if(name === 'last')
            setLastClient(value)

        // else
        //     setUpdatedClient({...updatedClient,[name]: value})
    }

    const handleChangeImage = e => {
        console.log(e.target.value)
        console.log(e.target.files)
        if (e.target.files.length) {
          setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
          });
        }
    }

    const handleUpload = async e => {
        e.preventDefault()

        await props.users.uploadImage(image)
        console.log(props.users.image)
        // await fetch("YOUR_URL", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "multipart/form-data"
        //   },
        //   body: formData
        // });
    };

    const checkPassword = value => {
        setValidation(password === value)
    }
    const updateClient = () => {
        setOpen(o => !o)

        console.log(validation)

        if(validation)
            props.users.updateUserInfo({
                first: first || props.users.first,
                last: last || props.users.last ,
                password: password || props.users.password,
                photo: photoid
            })
    }
    
    return (
        <div >
            <div className="profile-main-section">
                <Card className="profile-card-style">
                    <Card.Header className="profile-header-card"> 
                        <Button variant="outline-warning" onClick={() => setOpen(o => !o)} className="rounded shadow-sm user-edit-btn"> 
                            <FaUserEdit className="icon-edit-user-profile"/>
                        </Button> 
                    </Card.Header>
                    <Card.Body>
                        <Card.Title> 
                        {open 
                            ? 
                            <>
                                <label htmlFor="upload-button">
                                    {image.preview ? (
                                        <Image src={image.preview} alt="user" className="shadow profile-image" roundedCircle />
                                    ) : (
                                    <>
                                        <h5 className="text-center">Upload your photo</h5>
                                        <Image src={props.users.image} className="shadow profile-image" roundedCircle /> 
                                        {console.log( props.users.image)}
                                    </>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id="upload-button"
                                    style={{ display: "none" }}
                                    onChange={handleChangeImage}
                                />
                                <Button onClick={handleUpload}><RiUploadCloud2Fill/> Upload</Button>
                            </>
                            :<>
                            <Image src={props.users.image} className="shadow profile-image" roundedCircle /> 
                            {console.log(props.users.image)}
                            </>
                        }
                            
                        </Card.Title>
                        <Card.Text >
                            {
                                open 
                                ? 
                                <form className={classes.root} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-first-name-input"
                                        label="First Name"
                                        type="text"
                                        name="first"
                                        autoComplete="current-first-name"
                                        size="small"
                                        onChange={handleChange}
                                        defaultValue={props.users.first} 
                                    />
                                    <TextField
                                        id="outlined-last-name-input"
                                        label="Last Name"
                                        type="text"
                                        name="last"
                                        autoComplete="current-last-name"
                                        size="small"
                                        onChange={handleChange}
                                        defaultValue={props.users.last} 
                                    />
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Email"
                                        defaultValue={props.users.email}
                                        InputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
                                        size="small"
                                    />
                                    <TextField
                                        id="outlined-password-input"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        size="small"
                                        onChange={handleChange}
                                        defaultValue={props.users.password} 
                                    />

                                    <TextField
                                        id="outlined-password-input"
                                        label="Confirm Password"
                                        type="password"
                                        autoComplete="current-confirm-password"
                                        size="small"
                                        name="confirm-password"
                                        onChange={handleChange}
                                        defaultValue={props.users.password} 
                                    />
                                    <div>
                                    <Button variant="outlined" size="small" color="primary" onClick={updateClient} className={classes.margin}>
                                        Update
                                    </Button>
                                    </div>
                                </form>
                                :
                                <>
                                    <div className="name-user"> {props.users.first}  {props.users.last}</div>
                                    <div className="email-user"> {props.users.email} </div>
                                </>
                            }
                            
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

            <Charts />
            {/* <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <label>First Name</label><input name="first" onChange={handleChange} value={updatedClient.first} />
                <br></br>
                <label>Surname</label><input name="last" onChange={handleChange} value={updatedClient.last} />
                <br></br>
                <label>Password</label>
                <input name="password" onChange={handleChange} value={updatedClient.password} />

                <button onClick={updateClient}>update</button>
            </Popup> */}

        </div>
    );
};

export default inject("users")(observer(Profile));