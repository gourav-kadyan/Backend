//importing express 
import express from "express"
import path from "path"

//creating a server named "app" --> industry standard 
const app = express();

//like if we want to make or get a specific route we can use
app.get("/",(req,res)=>{
    // res.send("Send normal data") // it send normal

    //if you want to send json data 
    // res.json({
    //     name : "Gourav",
    //     Age : 21,
    // })

    //if you want to send statuscode
    // res.sendStatus(200)

    //you can send files too
    // res.sendFile("./index.html") //we cannot direclty send a file we need path

    //so we use path module
    console.log(path.resolve());
    res.sendFile(path.join(path.resolve(),"index.html")) //thats how we can send the file
})

//listening in server 
app.listen(5000, ()=>{
    console.log("Server is working")
})