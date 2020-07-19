const express = require('express');
const bodyParser = require("body-parser");
const Register = require("./Register");
const mongoose = require("mongoose");
const { register } = require('ts-node');

const app = express();
const router = express.Router();

//pass : USMKM1qQj29gRIVo
mongoose.connect("mongodb+srv://jaygandhi_49:USMKM1qQj29gRIVo@cluster0-h7ape.mongodb.net/angular_node?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('connected');
    })
    .catch(() => {
        console.log('issue with connect');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH,PUT,DELETE, OPTIONS");

    next();


})

router.post("/api/postsuser", (req, res, next) => {
    var jsonData = req.body;

    console.log('bodyyy....', req.body);
    const register = new Register({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        pass: req.body.pass,
        cpass: req.body.cpass
    });

    register.save().then((respnsedata) => {
        res.status(201).json({
            postedid: respnsedata._id,
            message: 'data post successfully..'
        });
    });
    console.log(register);


    next();
});

// router.patch({ _id: id }, (req, res, next) => {


// });

router.get("/api/getById/:id", (req, res, next) => {
    console.log('getbyidfor edit....', req.params.id);
    Register.findById(req.params.id).then(response => {
        if (response) {
            res.status(200).json(response);
        } else {
            res.send.json({
                message: 'record not found pls try other serach criteria..'
            })
        }
    })
    next();
})

router.get("/api/user", (req, res, next) => {
    console.log('data fetchhh...');

    Register.find().then(documents => {
        res.status(200).json({
            message: 'data fetch successfully',
            userdata: documents

        });
    });
    next();
});

router.put("/api/put/:id", (req, res, next) => {

    const register = new Register({
        _id : req.params.id,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        pass: req.body.pass,
        cpass: req.body.cpass

    });
    console.log('edit data set for ...', req.params.id);
    Register.updateOne({ _id: req.params.id }, register).then((response) => {
        res.status(200).json({
            postdata: register,
            message: 'Record update successfully..'
        });
    });
    next();
})

router.delete("/api/delete/:id", (req, res, next) => {

    Register.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: 'delete successfully...'
        })
    });

})

app.use("/", router);

app.use((req, res, next) => {
    console.log('this is second app...');
    //next();
});


module.exports = app;