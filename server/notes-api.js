const express = require("express");
const app = express();
app.use(express.json());

let NOTES = {};

app.post("/note",(req,res)=>{
  const {user,ref,text} = req.body;
  if(!NOTES[user]) NOTES[user]={};
  NOTES[user][ref]=text;
  res.json({ok:true});
});

app.get("/note/:user",(req,res)=>{
  res.json(NOTES[req.params.user]||{});
});

app.listen(3000);
