import React, { useState } from "react";
import axios from "axios";

const Fileupload = () => {
  const [Image, SetImage] = useState("");
  const [Uploadedfile,setUploadedfile]=useState("")
 
  const upload = () => {
    const formData = new FormData();
    formData.append('file',Image);
    console.log(formData)
        axios.post("http://localhost:4200/upload",formData).then((res)=>{
          alert(res.data.message);
          console.log(res.data.filename)
          setUploadedfile("./uploads/"+res.data.filename)
         
      }).catch(err=>{
          console.log(err)
      })
  };
  return (
    <div>
      <input type="file" onChange={(e) => SetImage(e.target.files[0])} />
      <button className=" btn btn-primary" onClick={upload}>Upload Image</button>
         <img src={Uploadedfile} style={{height:"250px"}}/>
    </div>
  
  );
};

export default Fileupload;
