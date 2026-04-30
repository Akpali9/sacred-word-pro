const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.post("/sermon",async(req,res)=>{

  const r = await fetch("https://api.openai.com/v1/responses",{
    method:"POST",
    headers:{
      "Authorization":"Bearer YOUR_KEY",
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      model:"gpt-4.1-mini",
      input:"Write sermon on: " + req.body.text
    })
  });

  const d = await r.json();
  res.json(d);
});

app.listen(4000);
