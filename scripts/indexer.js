// converts text apocrypha into structured JSON

const fs = require("fs");

function convert(file){
  const txt = fs.readFileSync(file,"utf8");

  return txt.split("\n\n").map((c,i)=>({
    chapter:i+1,
    verses:c.split("\n")
  }));
}

console.log("Indexer ready");
