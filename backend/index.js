const express = require("express");
const cors = require("cors")
const app = express();
const db = require("./models")
const PORT = 4200;

app.use(cors({}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const apiRoutes = require("./routes/apiRoutes");

app.use("/api",apiRoutes);



db.sequelize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server started`)
    })

})
//   File Upload Logic

// const express = require("express");
// const fileUpload = require("express-fileupload")
// const path = require('path'); 

// const cors = require("cors")
// const app = express();
// app.use(fileUpload())
// app.use(express.static("files"))
// const dir = path.join(__dirname, "../");

// const PORT = 4200;

// app.use(express.urlencoded({extended:true}));
// app.use(express.json());
// app.use(cors({}));


// app.get("/",(req,res)=>{
//     res.send("Started")
// })

// app.post("/upload",(req,res)=>{
//     const file=req.files.file
//     console.log(req.files.file)
//     const filename = req.files.file.name
//     // console.log(dir)
//     const newpath= dir + "Frontend/crud/public/uploads/";
//     // console.log(newpath)
//     file.mv(`${newpath}${filename}`,(err)=>{
//         if(err){
//             console.log(`${newpath}${filename}`)
//             res.status(500).send({message:"Failed"})
//         }
//         const p=`${newpath}${filename}`
//         console.log(p)
//         res.status(200).send({message:"Uploaded",p,filename})
//     })
    
// })
// app.listen(PORT,()=>{
//     console.log(`server started at works ${PORT}`)
// })