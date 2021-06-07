import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Addstudents from "./Components/Addstudents";
import Fileupload from "./Components/Fileupload";
import Register from "./Components/Register";
import Login from "./Components/Login";

import { Link, Route, Switch } from "react-router-dom";
import Navbarc from "./Components/Navbarc";

function App() {

  const [chage,setchange]=useState("")
  const [val,setval]=useState("")
  const [record,setrecord]=useState([]);

  const Change = (e) =>{

  }
  return (
    <input type="text" onChange={(e)=>setchange(e.target.value)}></input>
  );
}

export default App;

      {/* <Register />
        <Login /> */}

      {/* <Fileupload/> */}
      {/* <h2 className="text-center">STUDENT RECORDS</h2>
      <div className="row mt-5" >
        <Addstudents/>
      </div> */}

      // <div className="container">
      // <Navbarc/>
      // <Switch>
      // <Route exact path="/" component={Register} />
      // <Route exact path="/login" component={Login} />
      // <Route exact path="/dashboard" component={Addstudents} />
      // </Switch>
