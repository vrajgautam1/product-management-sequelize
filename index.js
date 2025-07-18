const express = require("express");
const app = express();
const db = require('./models'); 
const config = require('./src/config/config')
const testConnection = require("./testConnection")
const mainRouter = require("./routes/index")

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(mainRouter)

let port = process.env.PORT || 3000;
app.listen(port, (err)=>{
    if(!err){
        console.log("server is running")
        console.log("http://localhost:"+config.port);
    }
})