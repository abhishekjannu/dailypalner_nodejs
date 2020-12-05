var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
const http = require('http');

// connection to mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dailyplanner",
});




var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Restful running on port 3000");
});

app.post("/register/", (req, res, next) => {
  var sqldata = req.body;
  var fname = sqldata.fname;
  var phone = sqldata.phone;  
  var email = sqldata.email;
  var password = sqldata.password;
 
  

      var sql = "INSERT INTO table_user (fname,phone,email,password) VALUES (?,?,?,?)";
      var values = [fname,phone,email,password];

      console.log(sql, values);

      con.query(sql, values, function (err, result, fields) {
        con.on("error", (err) => {
          console.log("[MySQL ERROR]", err);
        });
        res.json("User registered Successfully");
        console.log("Registered" + sqldata);
      });
    
  });


app.post("/addschedule/", (req, res, next) => {
  var sqldata = req.body;
  var sdate = sqldata.sdate;
  var stime = sqldata.stime;
  var description = sqldata.description;
  
      var sql = "INSERT INTO table_schedule (sdate,stime,description) VALUES (?,?,?)";
      var values = [sdate, stime, description];

      console.log(sql, values);

      con.query(sql, values, function (err, result, fields) {
        con.on("error", (err) => {
          console.log("[MySQL ERROR]", err);
        });
        res.json("Schedule Added Successfully");
        console.log("Added" + sqldata);
      });
    
  });



