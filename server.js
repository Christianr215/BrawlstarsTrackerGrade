require('dotenv').config();

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
//brawl stars test id = #209P09L8

const PORT = 3000;

app.use(cors());
app.use(express.static("public"));
const API_KEY = process.env.API_KEY; //safe
if (!API_KEY) {
    console.error("ERROR: API_KEY not found in .env file!");
}

app.get("/player/:tag", async (req, res) => {
    const playerTag = encodeURIComponent(req.params.tag);
    try{
        const response = await fetch(`https://api.brawlstars.com/v1/players/${playerTag}`, {
            headers: {"Authorization": `Bearer ${API_KEY}`} //Bearer std way of sending API auntentication 
        });
        const data = await response.json();
        res.json(data); //response json is a method on the fetch response not express
    }
    catch (error){
        res.status(500).json({ error : error.message });
    }
});
 
app.listen(PORT, () => console.log(`Server running at on port: ${PORT}`)); //to know which port i am