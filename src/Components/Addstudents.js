import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-bootstrap";
import Showstudents from "./Showstudents";

const Addstudents = () => {
  // useState for Adding Data
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Dob, setDob] = useState("");
  const [Standard, setStandard] = useState(0);
  const [Datas, setDatas] = useState([]);

  // useState for Editing Data

  const [Fnameedit, setFnameedit] = useState("");
  const [Lnameedit, setLnameedit] = useState("");
  const [Dobedit, setDobedit] = useState("");
  const [Standardedit, setStandardedit] = useState(0);

  const [count,setCount]=useState(0)

  //use state for Error

  const [errmessage, seterrmessage] = useState(null);

  //useState For Modal

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Display Form Data From DB
  useEffect(async () => {
    await axios
      .get("http://localhost:4200/api/lists")
      .then((res) => {
        console.log(res.data)
        setDatas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const validate = () => {
    //console.log(typeof(Standard))
    if (Standard == 10 || Standard == 11 || Standard == 12) {
      seterrmessage(null);
      return true;
    }
    seterrmessage("Enter a Class from (10-12)");
    return false;
  };
  // post Form Data to DB
  const formSubmitted = (e) => {
    e.preventDefault();

    const isValid = validate();
    // console.log(isValid);

    if (isValid) {
      axios
        .post("http://localhost:4200/api/create", {
          Firstname: Fname,
          Lastname: Lname,
          DateofBirth: Dob.target.value,
          Class: Standard,
        },{
          headers:{
            accesToken:sessionStorage.getItem("accesToken")
          }
        })
        .then((res) => {
          console.log(res.data)
          if(res.data.err){
            toast.error("LOGIN FIRST TO ADD DATA", {
              position: "top-center",
              autoClose: 3000,
            });
            setFname("");
            setLname("");
            setStandard("");
            setDob("");

          }else{
            toast.success("Data Added Sucessfully", {
              position: "top-center",
              autoClose: 3000,
            });
            setDatas([
              ...Datas,
              {
                Firstname: res.data.Firstname,
                Lastname: Lname,
                DateofBirth: res.data.DateofBirth,
                Class: Standard,
              },
            ]);
  
            setFname("");
            setLname("");
            setStandard("");
            setDob("");

          }
        })
        .catch((err) => {
          toast.error(err, {
            position: "top-center",
          });
        });
    }
    //  console.log(Fname);
    //  console.log(Dob.target.value);
    // console.log(Standard);
  };

  // Delete a data From DB
  const deleteData = (i) => {
    axios
      .delete(`http://localhost:4200/api/delete/${i}`)
      .then(() => {
        toast.error("Deleted Sucessfully", {
          position: "top-right",
          autoClose: 2000,
        });
        const Filterdata = Datas.filter((val, index) => {
          return i !== val.id;
        });
        setDatas(Filterdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Edit data from db 

  const editDataid = (i) => {
    setShow(true);
    console.log(i);
    sessionStorage.setItem("id", i);
    sessionStorage.setItem("ide", i);
    setCount(count + 1)
  };
  useEffect(async () => {
    const idedit = parseInt(sessionStorage.getItem("id"));
    await axios
      .get(`http://localhost:4200/api/lists/${idedit}`)
      .then((res) => {
        //  console.log(res.data[0].Firstname);
        //  console.log(res.data[0])
         setFnameedit(res.data[0].Firstname);
         setLnameedit(res.data[0].Lastname)
         setStandardedit(res.data[0].Class)
        // setLname(res.data[0].Lastname);
        // setStandard(res.data[0].Class);
      })
      .catch((err) => {
       // console.log(err);
      });
  }, [count]);

  const editData = (e) => {
    e.preventDefault();
    const ide = parseInt(sessionStorage.getItem("ide"));
     //console.log(ide)
    // console.log(Fnameedit)
    // console.log(Standardedit)
    // console.log(Dobedit.target.value)

    axios
      .put(`http://localhost:4200/api/update/${ide}`, {
        Firstname: Fnameedit,
        Lastname: Lnameedit,
        DateofBirth: Dobedit.target.value,
        Class: Standardedit,
      })
      .then((res) => {
        //console.log(res)
        toast.success("Updated Sucessfully", {
          position: "top-center",
          autoClose: 3000,
        });
        handleClose()
        setDatas(
          Datas.map((val, index) => {
            return val.id === ide
              ? {
                  Firstname: Fnameedit,
                  Lastname: Lnameedit,
                  DateofBirth: Dobedit.target.value,
                  Class: Standardedit,
                }
              : val;
          })
        );
        // setDatas(Updatedata)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <h2 className="text-center">STUDENT RECORDS LIST</h2>
      <form className="row g-3" onSubmit={formSubmitted}>
        <div className="col-md-3">
          <label htmlFor="validationDefault01" className="form-label">
            First name
          </label>
          <input
            type="text"
            value={Fname}
            className="form-control"
            id="validationDefault01"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="validationDefault02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            value={Lname}
            className="form-control"
            id="validationDefault02"
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="validationDefault03" className="form-label">
            Date Of Birth
          </label>
          <input
            type="date"
            className="form-control"
            id="validationDefault03"
            onClick={setDob}
            required
          />
        </div>
        <div className="col-md-3">
          {/* <small>{errmessage}</small> */}
          {errmessage ? (
            <label>{errmessage}</label>
          ) : (
            <label htmlFor="validationDefault02" className="form-label">
              Standard
            </label>
          )}

          <input
            type="number"
            value={Standard}
            className="form-control"
            id="validationDefault02"
            onChange={(e) => setStandard(e.target.value)}
            required
          />
        </div>
        <div className="col-12 mt-2">
          <button className="btn btn-primary float-right" type="submit">
            Submit form
          </button>
        </div>
      </form>
      <Showstudents
        Datas={Datas}
        editDataid={editDataid}
        deleteData={deleteData}
      />
      {/* <!-- Modal PopUP--> */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Students Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row " onSubmit={editData}>
            <div className="col-6">
              <label htmlFor="validationDefault01" className="form-label">
                First name
              </label>
              <input
                type="text"
                // value={Fname}
                value={Fnameedit}
                placeholder="Enter Firstname"
                className="form-control"
                id="validationDefault01"
                onChange={(e) => setFnameedit(e.target.value)}
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="validationDefault02" className="form-label">
                Last name
              </label>
              <input
                type="text"
                placeholder="Enter Lastname"
                value={Lnameedit}
                className="form-control"
                id="validationDefault02"
                onChange={(e) => setLnameedit(e.target.value)}
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="validationDefault03" className="form-label">
                Date Of Birth
              </label>
              <input
                type="date"
                placeholder="Enter DateofBirth"
                className="form-control"
                id="validationDefault03"
                onClick={setDobedit}
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="validationDefault02" className="form-label">
                Standard
              </label>
              <input
                type="number"
                placeholder="Enter Class Studying"
                value={Standardedit}
                // value={Standard}
                className="form-control"
                id="validationDefault02"
                onChange={(e) => setStandardedit(e.target.value)}
                required
              />
            </div>
            <div className="col-12 mt-2  ">
              <button className="btn btn-success " type="submit" >
                Submit form
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Addstudents;
