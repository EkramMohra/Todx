import React, { useState } from "react";
import $ from "jquery";
const axios = require("axios");
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const handleInputChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    }
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }

    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const addUser = () => {
    let mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!username || !email || !password) {
      seterrorMsg("please fill in all inputs");
      return;
    }
    if (!email.match(mailformat)) {
      seterrorMsg("please enter a valid email");
      return;
    }
    axios
      .post("http://localhost:3005/users", {
        user: {
          username: username,
          email: email,
          password: password,
        },
      })
      .then(() => {
        setUsername("");
        setEmail("");
        setPassword("");
        seterrorMsg("");
      });
  };
  return (
    <div>
      <div className="overlay" id="overlay"></div>

      <div className="box" id="box">
        <a
          className="boxclose"
          id="boxclose"
          onClick={() => {
            $("#box").animate({ top: "-400px" }, 500, function () {
              $("#overlay").fadeOut("fast");
            });
            setUsername("");
            setEmail("");
            setPassword("");
            seterrorMsg("");
          }}
        ></a>
        <h3>Sign Up</h3>
        <label>username</label>
        <br />
        <input
          type="text"
          id="username"
          className="input"
          name="username"
          value={username}
          onChange={handleInputChange}
        />
        <br />
        <label>email</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          className="input"
          value={email}
          onChange={handleInputChange}
        />
        <br />
        <label>password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          className="input"
          value={password}
          onChange={handleInputChange}
        />
        <br />
        <button className="signUp-btn" onClick={addUser}>
          Sign Up
        </button>
        <br />
        <span>{errorMsg}</span>
      </div>
    </div>
  );
};

export default SignUp;
