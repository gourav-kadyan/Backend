//importing express 
import express from "express"
import path from "path"
import mongoose from "mongoose";
//creating a server named "app" --> industry standard 
const app = express();

//setting a view engine and its extension
app.set("view engine", "ejs")

//connecting to database
mongoose.connect("mongodb://localhost:27017/", { dbName: "backend", })
.then(()=>{console.log("Database is connected")})
.catch((e) => { console.log(e) })

//creating a schema
const MessageSchema = new mongoose.Schema({
    name : String,
    email : String,
})

//creating a model means collections
const Message = mongoose.model("Message",MessageSchema)



//to make static folder just use express.static and use with server name
//here express.static is middleware
app.use(express.static(path.join(path.resolve(), "public")));
// console.log(path.join(path.resolve(),"public"))
//another middle for post data to get in res.body else give undefined
app.use(express.urlencoded({ extended: true }))


app.get("/success", (req, res) => {
    res.render("success")
})

//handling post data
//at first para need to same as action of form in index.html file
//using async await so that data must store in mongodb
app.post("/contact", async (req, res) => {
    const {name, email} = req.body; //getting the data in that way for readablility
    console.log(name + email);
    await Message.create({name,email})
    res.redirect("/success");
})

//like if we want to make or get a specific route we can use
app.get("/", (req, res) => {
    //how to get the data of ejs file
    //    res.render("index",{name : "Gourav Kadyan"});

    // need to send the file
    res.sendFile("index.html");
})

app.get("/users", (req, res) => {
    // console.log(Message.find({}))
    // res.send("nice")

    //chat gpt
    Message.find({})
        .then(messages => {
            console.log(messages);
            res.json(messages); // Send the retrieved messages as JSON response
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Error retrieving messages");
        });
})


//listening in server 
app.listen(5000, () => {
    console.log("Server is working")
})