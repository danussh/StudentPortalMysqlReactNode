import axios from 'axios'
import React,{useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link} from "react-router-dom";


const Register = () => {

    const [Usernamereg,setUsernamereg]= useState("")
    const [Passwordreg,setPasswordreg]= useState("")
    const [errreg,seterrreg]=useState(null);

    const Register = ()=>{
        console.log(Usernamereg,Passwordreg)

        axios.post("http://localhost:4200/api/register",{
            Username:Usernamereg,
            Password:Passwordreg
        }).then((res)=>{
            console.log(res.data)
            if(res.data.message==="Username Exists Password Wrong!"){
                seterrreg(true)
                setUsernamereg("")
                setPasswordreg("")

            }else{
                toast.success("Register Sucessfully", {
                    position: "top-center",
                    autoClose: 5000,
                  });
                  setUsernamereg("")
                  setPasswordreg("")
                  seterrreg(null)

            }

        }).catch((err)=>{
            console.log(err)
        })

    }
    return (
        <>
        <div className="container mt-5">
            <div className="row mt-5">   
                <div className="col-12 d-inline-flex flex-column justify-content-center">
                <h3 >Register Page:</h3>
                <label>UserName:</label>
                <input type="text" value={Usernamereg} onChange={(e)=>setUsernamereg(e.target.value)}/>
                <label>Password:</label>
                <input type="text" value={Passwordreg} onChange={(e)=>setPasswordreg(e.target.value)}/>
                <button className="btn btn-primary mt-3"onClick={Register}>Register</button>
                <Link to = "/login">Already Register Click Here to Login</Link>
                </div>
            </div>     
            {errreg ? (
          <div className="alert alert-danger mt-2" role="alert">
            Username Exists Password Wrong!
          </div>
        ) : null}
        </div>
        <ToastContainer />
        </>
    )
}

export default Register
