const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparse = require('body-parser');

const port = 3000;

mongoose.connect('mongodb://localhost/danceDB', { useNewUrlParser: true });
var db = mongoose.connection;

var danceschema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String
});

var dancecontact = mongoose.model('dancecontact', danceschema);

app.use("/static", express.static('static'));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.status(200).render("index.pug");
});
app.get("/index", (req, res) => {
    res.status(200).render("home.pug");
});

app.get("/contact", (req, res) => {
    res.status(200).render("contact.pug");
});
app.post("/contact", (req, res) => {
    var mydata = new dancecontact(req.body);
    mydata.save().then(() => {
        console.log("We are connected successfully and Data stored in database");
        console.log(`Name:${req.body.name}`);
        console.log(`Phone:${req.body.phone}`);
        console.log(`Email:${req.body.email}`);
        console.log(`Address:${req.body.address}`);
        console.log(`Description:${req.body.desc}`);
        res.status(200).render("contact.pug");
    }).catch(() => {
        console.log("We are unable to connect and Data is not stored in database");
    });
});

app.listen(port, () => {
    console.log(`Server running succefully at port ${port}.`);
});