const fs = require("fs");

const SOURCES = {
  enoch: "https://example.com/enoch.txt",
  jasher: "https://example.com/jasher.txt",
  jubilees: "https://example.com/jubilees.txt",
  thomas: "https://example.com/thomas.txt"
};

async function convert(name,url){

  const txt = await fetch(url).then(r=>r.text());

  const chapters = txt
    .split("\n\n")
    .map(block =>
      block.split("\n").filter(Boolean)
    );

  const data = {
    book: name,
    chapters
  };

  fs.writeFileSync(`./data/${name}.json`, JSON.stringify(data,null,2));

  console.log(name + " DONE");
}

async function run(){
  await convert("enoch", SOURCES.enoch);
  await convert("jasher", SOURCES.jasher);
  await convert("jubilees", SOURCES.jubilees);
  await convert("thomas", SOURCES.thomas);
}

run();
