//importing express 
import express from "express"
import path from "path"

//creating a server named "app" --> industry standard 
const app = express();

//setting a view engine and its extension
app.set("view engine","ejs")

const user = []; // working database 

//to make static folder just use express.static and use with server name
//here express.static is middleware
app.use(express.static(path.join(path.resolve(),"public")));
//another middle for post data to get in res.body else give undefined
app.use(express.urlencoded({extended : true}))


app.get("/success",(req,res)=>{
    res.render("success")
})

//handling post data
//at first para need to same as action of form in index.html file
app.post("/contact",(req,res)=>{
    user.push({username : req.body.name,email:req.body.email});
    res.redirect("/success");
})

//like if we want to make or get a specific route we can use
app.get("/",(req,res)=>{
   //how to get the data of ejs file
//    res.render("index",{name : "Gourav Kadyan"});

    // need to send the file
    res.sendFile("index.html");
})

app.get("/users",(req,res)=>{
    res.json({user})
})


//listening in server 
app.listen(5000, ()=>{
    console.log("Server is working")
})