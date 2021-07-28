import React, { useState } from "react"
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import './styles/login.css'
import background from './images/login-todx.jpeg'
import logo from '../../images/logo.png'
import { withRouter } from "react-router";

const SignUp = (props) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [errorMsg, seterrorMsg] = useState("");
  const [show, setShow] = useState(false)

  const handleInputChange = (event) => {
    const target = event.target
    const name = target.name 
    const value = target.value
    
    if (name === "first") {
      setFirst(value);
    }
    if (name === "last") {
      setLast(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "password-confirm"){
      setPasswordConfirm(value)
    }

  }

  const confirmPassword = (firstPassword, secondPassword) => {
    return firstPassword === secondPassword
  }

  const addNewUser = () => {
    let mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!first || !last || !email || !password) {
      seterrorMsg("please fill in all inputs")
      setShow(true)
      return
    }

    if (!email.match(mailformat)) {
      seterrorMsg("please enter a valid email")
      setShow(true)
      return
    }

    if(!confirmPassword(password, passwordConfirm)){
      seterrorMsg("Password Not Matched")
      setShow(true)
      return
    }

    axios
      .post("http://localhost:3005/users", {
        user: {
          first: first,
          last: last,
          email: email,
          password: password,
        },
      })
      .then(() => {
        setFirst("")
        setLast("")
        setEmail("")
        setPassword("")
        seterrorMsg("")
        props.history.push(`/`)
      })
  }

  const login = () =>  props.history.push('/')
  return (
    <Row className="row-style" >
              
        <Col sm={6} className="col-style left-side">
          <img  className="logo-login" src={logo}  alt="img login"/>
          <Card className="login-todx">
            <Card.Header as="h5" className="header-card">SignUp TO TODX</Card.Header>
            <Card.Body className="body-card">
              <Card.Title> { show ? <Alert key="error" variant="danger" > {errorMsg} </Alert> : null } </Card.Title>
              <Card.Text>
              <Form >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control 
                        type="text"  
                        name="first" 
                        value={first} 
                        onChange={handleInputChange} 
                        placeholder="Please enter your first name" 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control 
                        type="text"  
                        name="last" 
                        value={last} 
                        onChange={handleInputChange} 
                        placeholder="Please enter your last name" 
                  />
                </Form.Group>

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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control 
                      type="password" 
                      name="password-confirm"
                      className="input"
                      value={passwordConfirm}
                      onChange={handleInputChange} 
                      placeholder="Password" 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  If you already have an account   <Button variant="outline-success" key="loginBtn" size="sm" onClick={login}>Login</Button>
                </Form.Group>
              </Form>
              </Card.Text>
              <Button variant="outline-primary" onClick={addNewUser} className="button-login">SignUp</Button>
            </Card.Body>

          </Card>
        </Col>
        <Col sm={6} className="col-style"> <img  className="image-side" src={background}  alt="img login"/> </Col>
      </Row>
  );
};

export default withRouter(SignUp)
