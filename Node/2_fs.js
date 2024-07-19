import http from "http"
import fs from "fs"
import path from "path"
// read the file synchornously means until that line doesnot execute
// it not going to other line
const f1 = fs.readFileSync("./index.html") 

console.log(path)

const server = http.createServer( (req,res) => {
    if(req.url == "/")
        res.end(f1);
    else 
        res.end("<h1>Page Not Found</h1>");
})

server.listen(5000,()=>{
    console.log("listening server")
})

