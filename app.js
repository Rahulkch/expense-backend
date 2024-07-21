const express = require("express");
const app = express();
  //connect to the database
  const dbConnect = require("./config/databse");
  dbConnect();


require("dotenv").config();
const PORT = process.env.PORT || 4000;
app.use(express.json());


const cors=require("cors");
app.use(cors());


const x=require("./route/route");

app.use("/route",x);


//start server
app.listen(PORT, () => {
    console.log(`Susseful to ho gya but unabel to insert  at ${PORT}`);
  });



app.get("/", (req, res) => {
    res.send(`<h1> This is HOMEPAGE </h1>`);
  });