//importing express 
import express from "express"
import path from "path"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
//creating a server named "app" --> industry standard 
const app = express();

//setting a view engine and its extension
app.set("view engine", "ejs")

//connecting to database
mongoose.connect("mongodb://localhost:27017/", { dbName: "backend", })
.then(()=>{console.log("Database is connected")})
.catch((e) => { console.log(e) })

//creating a schema
const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
})

//creating a model means collections
const User = mongoose.model("Users",UserSchema)



//to make static folder just use express.static and use with server name
//here express.static is middleware
app.use(express.static(path.join(path.resolve(), "public")));
// console.log(path.join(path.resolve(),"public"))
//another middle for post data to get in res.body else give undefined
app.use(express.urlencoded({ extended: true }))

//middleware for token
app.use(cookieParser())


app.get("/register", (req,res)=>{
    res.render("register")
})
app.get("/login", (req,res)=>{
    res.render("login")
})

//making post for register button
app.post("/register", async (req,res)=>{

    // console.log(req.body)
    const {name ,email, password} = req.body;

    let user = await User.findOne({email});

    if(user)
    {
        return res.redirect("/login");
    }

    //encrypt the password
    const hpass = await bcrypt.hash(password,10);
    //adding data in mongodb
    user = await User.create({
        name, email,
        password : hpass,
    })
    res.redirect("/")
})

app.post("/login", async (req,res)=>{

    const {email ,password} = req.body;
    const user = await User.findOne({email});

    if(!user)
    {
        return res.redirect("/register");
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch)
    {
        return res.render("login", {email, message : "Incorrect Password"})
    }

    const token = jwt.sign({id : user._id},"Luffy");

    //Learn cookies
    res.cookie("token",token,{
        httpOnly:true, //httponly for protection security purposes
        expires:new Date(Date.now() + 60*1000) // current date + 60 sec after expire
    })
    res.redirect("/")
})

app.get("/logout",(req,res) =>
{
    res.cookie("token",null,{
        httpOnly:false, //httponly for protection security purposes
        expires:new Date(Date.now()) // current date + 60 sec after expire
    })
    res.redirect("/")
})

//making a function to understand next()
const isAuthenticate = async (req, res, next) => {
    const {token} = req.cookies;
    if(token)
    {
        const decodedToken = jwt.verify(token,"Luffy")
        console.log(decodedToken.id)
        req.user = await User.findById(decodedToken.id);
        next();
    }
    else
    {
        res.render("login")
    }
}


//like if we want to make or get a specific route we can use
app.get("/",isAuthenticate, (req, res) => {
    // console.log(req.body)
    console.log(req.user)
    res.render("logout", {name : req.user.name})
})




//listening in server 
app.listen(5000, () => {
    console.log("Server is working")
})