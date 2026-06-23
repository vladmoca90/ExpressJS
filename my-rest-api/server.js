// REST API demo in Node.js
const express = require("express"); // Import the Express framework
const app = express();
const fs = require("fs"); // Import the file system module
const path = require("path"); // Import the path module for handling file paths

const usersEndpoint = "/getUsers";

// Endpoint to get a list of users
app.get(usersEndpoint, function (req, res) {
    const filePath = path.join(__dirname, "users.json");

    fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
            console.error("Error reading users.json:", err);
            res.status(500).send("Error reading users data.");
            return;
        }

        console.log("Data fetched from users.json:", data);
        res.header("Content-Type", "application/json"); // Set response type to JSON
        res.send(data); // Send data as response
    });
});

// Create a server to listen on port 8080
const port = 8080;
app.listen(port, function () {
    console.log(`REST API demo app listening at http://localhost:${port}${usersEndpoint}`);
});
