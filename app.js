const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "798557121a532921585012f0e1cc4982";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric#"
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){

      // parse is used for converting the data which is in bytes to javaScript
      const weatherData = JSON.parse(data);
      // now if we want to access the particular data
      const temp = weatherData.main.temp;
      console.log(temp);

      const des = weatherData.weather[0].description;
      console.log(des);

      const icon = weatherData.weather[0].icon;

      const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

      res.write("<p>The weather is currently: "+ des+"</p>");

      res.write("<h1>The temperature in " +query+ " is: "+temp+"</h1>");
      res.write("<img src="+imgUrl+">");

      res.send();
  //  stringify is used for converting data into a string formate
      // const weatherData2 = JSON.stringify(data);
      // console.log(weatherData2);
    });
  });
})

// const query = "London";
// const apiKey = "798557121a532921585012f0e1cc4982";
// const unit = "metric";
// const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="++apiKey"&units="+unit+"#"
// https.get(url, function(response){
//   console.log(response.statusCode);
//
//   response.on("data", function(data){
//
//     // parse is used for converting the data which is in bytes to javaScript
//     const weatherData = JSON.parse(data);
//     // now if we want to access the particular data
//     const temp = weatherData.main.temp;
//     console.log(temp);
//
//     const des = weatherData.weather[0].description;
//     console.log(des);
//
//     const icon = weatherData.weather[0].icon;
//
//     const imgUrl = "https://openweathermap.org/img/wn"+icon+"@2x.png";
//
//     res.write("<p>The weather is currently: "+ des+"</p>");
//
//     res.write("<h1>The temperature in Udaipur is: "+temp+"°C.</h1>");
//     res.write("<img src="+imgUrl+">");
//
//     res.send();
// //  stringify is used for converting data into a string formate
//     // const weatherData2 = JSON.stringify(data);
//     // console.log(weatherData2);
//   });
// });

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
