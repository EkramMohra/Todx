import React, { useState } from "react";
import $ from "jquery";
const axios = require("axios");
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const handleInputChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }

    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const checkUser = async () => {
    let mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email || !password) {
      seterrorMsg("please fill in all inputs");
      return;
    }
    if (!email.match(mailformat)) {
      seterrorMsg("please enter a valid email");
      return;
    }
    let user_check = axios.get(
      `http://localhost:3005/users?email=${email}&password=${password}`
    );
    if (!user_check) {
      seterrorMsg("user not found");
      return;
    } else {
      // render a button with the user name on it insted of the login/signup buttons
    }
  };
  return (
    <div>
      <div className="overlay" id="overlay_1"></div>

      <div className="box" id="box_1">
        <a
          className="boxclose"
          id="boxclose"
          onClick={() => {
            $("#box_1").animate({ top: "-400px" }, 500, function () {
              $("#overlay_1").fadeOut("fast");
            });
            setEmail("");
            setPassword("");
            seterrorMsg("");
          }}
        ></a>
        <h3>Log In</h3>
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
        <button className="signUp-btn" onClick={checkUser}>
          Login
        </button>
        <br />
        <span>{errorMsg}</span>
      </div>
    </div>
  );
};

export default Login;
