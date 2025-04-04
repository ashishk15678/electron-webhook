const jwt = require('jsonwebtoken');
const fs = require('fs');
const axios = require("axios")
export async function GetToken(){

    const privateKey = fs.readFileSync('pem.pem', 'utf8'); // Private Key of the GitHub App
    const appId = 1197773; // App ID of the GitHub App

    const payload = {
    iat: Math.floor(Date.now() / 1000) - 60, // Issued at time
    exp: Math.floor(Date.now() / 1000) + (10 * 60), // Expiration time (10 minutes)
    iss: appId, // GitHub App ID
    };

    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
    
    const res = await fetch("https://api.github.com/app/installations/63611476/access_tokens", {
        headers:{
            "Authorization":`Bearer ${token}`, 
            "Accept": "application/vnd.github.v3+json"
        },
        method:"POST"

    })
    console.log({"response for token:":await res.body})
    // console.log({"json-response":await res.json()})
    // console.log({"res-text":await res.text()})
    return await(await(await res).json()).token
}