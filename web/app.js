let DB;
let SEARCH = new MiniSearch({
  fields:["text"],
  storeFields:["ref"]
});

let STATE = {
  book:null,
  chapter:1
};

/* INIT */
init();

async function init(){
  DB = await openDB();
  await loadBooksUI();
  await buildSearchIndex();
  registerSW();
}

/* DB */
function openDB(){
  return new Promise(res=>{
    const req = indexedDB.open("sacred",1);

    req.onupgradeneeded=e=>{
      e.target.result.createObjectStore("chapters",{keyPath:"id"});
    };

    req.onsuccess=()=>res(req.result);
  });
}

/* LOAD DATA */
async function loadBooksUI(){
  const books = await fetch("../data/kjv.json").then(r=>r.json());

  const el = document.getElementById("books");

  books.forEach(b=>{
    const div = document.createElement("div");
    div.className="book";
    div.textContent=b.book;
    div.onclick=()=>loadBook(b);
    el.appendChild(div);
  });
}

/* LOAD CHAPTER */
async function loadBook(book){
  STATE.book = book;
  STATE.chapter = 1;

  renderChapter(book.chapters[0]);
}

/* RENDER */
function renderChapter(ch){
  const el = document.getElementById("content");

  el.innerHTML = ch.map((v,i)=>`
    <div class="verse">${i+1}. ${v}</div>
  `).join("");
}

/* SEARCH INDEX */
async function buildSearchIndex(){
  const data = await fetch("../data/kjv.json").then(r=>r.json());

  let docs = [];

  data.forEach(b=>{
    b.chapters.forEach((ch,i)=>{
      ch.forEach((v,j)=>{
        docs.push({
          id:`${b.book}-${i+1}-${j+1}`,
          text:v,
          ref:`${b.book} ${i+1}:${j+1}`
        });
      });
    });
  });

  SEARCH.addAll(docs);
}

/* SEARCH */
function doSearch(){
  const q = document.getElementById("search").value;
  if(!q) return;

  const res = SEARCH.search(q,{prefix:true});

  document.getElementById("content").innerHTML =
    res.map(r=>`
      <div class="verse"><b>${r.ref}</b><br>${r.text}</div>
    `).join("");
}

/* SW */
function registerSW(){
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js");
  }
}
