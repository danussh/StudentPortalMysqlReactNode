const express = require("express");
const {sign} = require("jsonwebtoken")
const router = express.Router();
const db = require("../models");

const {validateToken} = require("../Middlewares/Auth")

//Registerion For  NewUser/Check existing user ------------Post

router.post("/register", (req, res) => {
  db.Register.findAll({
    where: {
      Username: req.body.Username,
    },
  }).then((reg) => {
    console.log(reg);
    if (reg.length>0) {
      res.status(200).json({ message: "Username Exists Password Wrong!" });
    } else {
      db.Register.create({
        Username: req.body.Username,
        Password: req.body.Password,
      })
        .then((datas) => {
          console.log(datas);
          res.send(datas);
        })
    }
  }).catch((err)=>{
    res.send(err)
  })
  // db.Register.create({
  //   Username: req.body.Username,
  //   Password: req.body.Password,
  // })
  //   .then((datas) => {
  //     console.log(datas);
  //     res.send(datas);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.send(err);
  //   });
});

// For Login
router.post("/login", (req, res) => {
  db.Register.findAll({
    where: {
      Username: req.body.Username,
      Password: req.body.Password,
    },
  })
    .then((result) => {
      console.log(result);

      if (result.length > 0) {

        const acessToken = sign({id:result.id},"SecretKey");

        res.send(acessToken);
      } else {
        res.status(200).json({ message: "Wrong username or Password" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get Students Data
router.get("/lists", (req, res) => {
  db.Students.findAll()
    .then((datas) => {
      res.send(datas);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Get a paticular Students Data
router.get("/lists/:id", (req, res) => {
  db.Students.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Create Student data
router.post("/create",validateToken ,(req, res) => {
  db.Students.create({
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    DateofBirth: req.body.DateofBirth,
    Class: req.body.Class,
  })
    .then((datas) => {
      console.log(datas);
      res.send(datas);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//Delete a Student Data

router.delete("/delete/:id", (req, res) => {
  console.log(req.params.id);
  db.Students.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.send("DELETED");
    })
    .catch((err) => {
      res.send(err);
    });
});

//Update a Student data

router.put("/update/:id", (req, res) => {
  db.Students.update(
    {
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      DateofBirth: req.body.DateofBirth,
      Class: req.body.Class,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((datas) => {
      res.send(datas);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
