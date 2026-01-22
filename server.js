require('dotenv').config(); //package that helps you manage environment variables
const express = require("express");
const cors = require("cors");
const app = express(); //imports the express framework
//brawl stars test id = #209P09L8

const PORT = 3000;

app.use(cors()); //cors is cross origin resource sharing, that allows us to make requests from different domains
app.use(express.static("public")); //tells express to serever all html,css,js files in public fodler
//app.use is a method that sets up middle ware, their like instructions
const API_KEY = process.env.API_KEY; //safe
if (!API_KEY) {
    console.error("ERROR: API_KEY not found in .env file!");
}

//get is for retreiving data, post would be for sending
app.get("/player/:tag", async (req, res) => {
    const playerTag = encodeURIComponent(req.params.tag); //grabs the value from the url and formats for API
    try{ //the ":" tells express that this part changes based on user
        const response = await fetch(`https://api.brawlstars.com/v1/players/${playerTag}`, { //await is so it doesnt activiate without fetching first
            headers: {"Authorization": `Bearer ${API_KEY}`} //Bearer std way of sending API auntentication 
        });
        const data = await response.json();
        res.json(data); //response json is a method on the fetch response not express
        //sends data back to browser
    }
    catch (error){
        res.status(500).json({ error : error.message });
    }
});

const path = require("path");
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html")); //serve static files
});
 
app.listen(PORT, () => console.log(`Server running at on port: ${PORT}`)); //to know which port i am