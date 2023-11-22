// including all the dependcies to the app.js
//this is main file that runs server and format all the logic here....

const express = require("express");
//we are importing the routes from authRoutes.js
const authRoutes = require("../recipe/routes/authRoutes");
const cookieparser = require("cookie-parser");

const mongoose = require("mongoose");

const app = express();

// middleware

app.use(express.static("public"));
app.use(express.json());
app.use(cookieparser());

//server
app.listen(8080, () => {
  console.log(`Server is running on port 8080...`);
});

//configuration of embeded javsacript template....
app.set("view engine", "ejs");

// database connection with mongodb

//url is for making database connection..........
const dbURI =
  "mongodb+srv://siddharthkhurangale8087:Pass123@cluster0.g1zec7k.mongodb.net/node-auth";

//connecting to the mongodb databse
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then((result) => {
    // app.listen(3000);
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// mongoose.set("useCreateIndex", true);

app.get("/", (req, res) => {
  res.render("home");
});

//routes
app.get("/smoothies", (req, res) => {
  res.render("smoothies");
});
//we are kind of placing the authenctication routes here by importing the routes in the means of authroutes.js
app.use(authRoutes);
