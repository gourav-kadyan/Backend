const http = require("http"); // importing the module name http for creating server

const server = http.createServer((req,res) => { //req -- request and res as respond
    console.log("server worked");
    // res.end("<h1>Noice</h1>")
    //we can use html in it 
    //with the help of req we can access the routes or end points 
    //when we do res.end it shows on server/localhost in it 
    //if we dont do res.end then that server infinitly in loading state
    if(req.url === "/")
        res.end("<h1>Home Page</h1>");
    else if(req.url === "/about")
        res.end("<h1>About Page</h1>");
    else if(req.url === "/contact")
        res.end("<h1>Contact Page</h1>");
    else 
        res.end("<h1>Page Not found</h1>")
});

server.listen(5000,() => {
    console.log("listening server");
});
