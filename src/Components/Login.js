import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";

const Login = () => {

  let history = useHistory()
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [errlogin, seterrlogin] = useState(null);

  const login = () => {
    axios
      .post("http://localhost:4200/api/login", {
        Username: Username,
        Password: Password,
      })
      .then((res) => {
       // console.log(res)
        if (res.data.message === "Wrong username or Password") {
          seterrlogin(true);
        } else {
          sessionStorage.setItem("accesToken",res.data)
          toast.success("Login Sucessfully", {
            position: "top-center",
            autoClose: 5000,
          });
          seterrlogin(null);
          setUsername("")
          setPassword("")
          history.push("/dashboard")

        }
      });
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col-12 d-inline-flex flex-column justify-content-center">
            <h3>Login Page:</h3>
            <label>UserName:</label>
            <input
              type="text"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Password:</label>
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={login}>
              Login
            </button>
            <Link to = "/"> Click Here to Register</Link>
          </div>
        </div>
        {errlogin ? (
          <div class="alert alert-danger mt-2" role="alert">
            Wrong username or Password
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
