import React, { useState } from "react"
import $ from "jquery";
import axios from 'axios'

const SignUp = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [errorMsg, seterrorMsg] = useState("");

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
      return
    }

    if (!email.match(mailformat)) {
      seterrorMsg("please enter a valid email")
      return
    }

    if(!confirmPassword(password, passwordConfirm)){
      seterrorMsg("Password Not Matched")
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
      })
  }

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
  );
};

export default SignUp;

// <div className="box" id="box">
//         <h3>Sign Up</h3>
//         <label>first</label>
//         <br />
//         <input
//           type="text"
//           id="first"
//           className="input"
//           name="first"
//           value={first}
//           onChange={handleInputChange}
//         />
//         <br />
//         <label>last</label>
//         <br />
//         <input
//           type="text"
//           id="last"
//           className="input"
//           name="last"
//           value={last}
//           onChange={handleInputChange}
//         />
//         <br />
//         <label>email</label>
//         <br />
//         <input
//           type="text"
//           id="email"
//           name="email"
//           className="input"
//           value={email}
//           onChange={handleInputChange}
//         />
//         <br />
//         <label>password</label>
//         <br />
//         <input
//           type="password"
//           id="password"
//           name="password"
//           className="input"
//           value={password}
//           onChange={handleInputChange}
//         />
//         <br />
//         <label>password Confirmation</label>
//         <br />
//         <input
//           type="password"
//           id="password-confirm"
//           name="password-confirm"
//           className="input"
//           value={passwordConfirm}
//           onChange={handleInputChange}
//         />
//         <br />
//         <button className="signUp-btn" onClick={addNewUser}>
//           Sign Up
//         </button>
//         <br />
//         <span>{errorMsg}</span>
//       </div>