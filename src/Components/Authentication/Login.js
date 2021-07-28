import React, { useState } from "react";
import {Link} from 'react-router-dom';
import Container from '../Container/Container'
import NavBarSide from '../NavBar/NavBarSide'
import axios from 'axios'
import { withRouter } from "react-router";

import './styles/login.css'
import background from './images/login-todx.jpeg'
import logo from '../../images/logo.png'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const Login = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, seterrorMsg] = useState("")
  const [show, setShow] = useState(false)

  const handleInputChange = (event) => {
    let target =event.target
    let name = target.name
    let value = target.value

    if (name === "email") {
      setEmail(value)
    }

    if (name === "password") {
      setPassword(value)
    }
    
  }

  const login = async () => {
    let mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email || !password) {
      seterrorMsg("Please fill in all inputs")
      setShow(true)
      return
    }
    if (!email.match(mailformat)) {
      seterrorMsg("Please enter a valid email")
      setShow(true)
      return
    }

   

    let user = await axios.get(`http://localhost:3005/users?email=${email}&password=${password}`)
    console.log(user.data[0])
    if (!user.data[0]) {
      seterrorMsg("user not found")
      setShow(true)
      return
    }else{
      localStorage.setItem('user', user.data);
      props.history.push(`/container/${user.data[0].id}`)
    }

  }

  const signup = () =>  props.history.push(`/signup`)
  return (
      <Row className="row-style" >  
        <Col sm={6} className="col-style left-side">
          <img  className="logo-login" src={logo}  alt="img login"/>
          <Card className="login-todx">
            <Card.Header as="h5" className="header-card">LOGIN TO TODX</Card.Header>
            <Card.Body className="body-card">
              <Card.Title> { show ? <Alert key="error" variant="danger" > {errorMsg} </Alert> : null } </Card.Title>
              <Card.Text>
              <Form >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                        type="email"  
                        name="email" 
                        value={email} 
                        onChange={handleInputChange} 
                        placeholder="Please enter your email" 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                      type="password" 
                      name="password"
                      className="input"
                      value={password}
                      onChange={handleInputChange} 
                      placeholder="Password" 
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  If you don't have an account yet,  <Button variant="outline-success" size="sm" onClick={signup}>Sign Up</Button>
                </Form.Group>
              </Form>
              </Card.Text>
              <Button variant="outline-primary" onClick={login} className="button-login">Login</Button>
            </Card.Body>

          </Card>
        </Col>
        <Col sm={6} className="col-style"> <img  className="image-side" src={background}  alt="img login"/> </Col>
      </Row>
  )
}

export default withRouter(Login)








{/* <div className="login-background" style={{background: `url(${background}) no-repeat center center fixed`}}>
<Card className="login-todx">
  <Card.Header as="h5" className="header-card">LOGIN TO TODX</Card.Header>
  <Card.Body className="body-card">
    <Card.Title> { show ? <Alert key="error" variant="danger" > {errorMsg} </Alert> : null } </Card.Title>
    <Card.Text>
    <Form >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
              type="email"  
              name="email" 
              value={email} 
              onChange={handleInputChange} 
              placeholder="Please enter your email" 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
            type="password" 
            name="password"
            className="input"
            value={password}
            onChange={handleInputChange} 
            placeholder="Password" 
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        If you don't have an account yet,  <Button variant="outline-success" size="sm" onClick={signup}>Sign Up</Button>
      </Form.Group>
    </Form>
    </Card.Text>
      <Button variant="outline-primary" onClick={login} className="button-login">Login</Button>
    </Card.Body>
</Card>
</div> */}