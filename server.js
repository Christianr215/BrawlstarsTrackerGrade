require('dotenv').config();

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
//brawl stars test id = #209P09L8

const PORT = 3000;

app.use(cors());
const API_KEY = process.env.API_KEY; //safe

app.get("/player/:tag", async (req, res) => {
    const playerTag = encodeURIComponent(req.params.tag);
    try{
        const response = await fetch(`https://api.brawlstars.com/v1/players/${playerTag}`, {
            headers: {"Authorization": `Bearer ${API_KEY}`} //what is bearer 
        });
        const data = await response.json();
        response.json(data);
    }
    catch (error){
        response.status(500).json({ error : error.message });
    }
});
 
app.listen(PORT, () => console.log(`Server running at on port: ${PORT}`));