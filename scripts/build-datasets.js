const fs = require("fs");

async function build(){

  console.log("Downloading Bible datasets...");

  const kjv = await fetch(
    "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json"
  ).then(r=>r.json());

  fs.writeFileSync("./data/kjv.json",JSON.stringify(kjv));

  console.log("KJV ready");

  console.log("Now add apocrypha manually or via text imports.");
}

build();
