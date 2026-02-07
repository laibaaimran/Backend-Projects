//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
//to GET the html file
const __dirname = dirname(fileURLToPath(
    import.meta.url));

const app = express();
const port = 3000;
var userIsAuthorised = false;

//middleware
app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
    const password = req.body["password"];
    if (password === "ILoveProgramming") {
        userIsAuthorised = true;
    } //customise middleware
    next();
}
app.use(passwordCheck);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if (userIsAuthorised) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        //res.redirect("/public/index.html");
        res.sendFile(__dirname + "/public/index.html");
    }

});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//Step1: create a callback function for server running the port 
//to add redirect the html page from the public folder directory