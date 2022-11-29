// --------------------------------------------------------------------
// --------------------------------------------------------------------

var crypt = "encrypt";
var charsetType = "hexLiteral";

document.querySelectorAll('input[name="method"]').forEach(_=>_.onchange = () => {
  crypt = document.querySelector('input[name="method"]:checked').value;
  document.querySelector('#text-input').placeholder = `message to ${document.querySelector('input[name="method"]:checked').value}`;
  document.querySelector('input[type="submit"]').value = `${crypt.substring(0,1).toUpperCase()}${crypt.substring(1)}!`;
  document.querySelector('#key-input').placeholder = `${crypt}ion key`;
  console.log(crypt);
})

document.querySelectorAll('input[name="charset"]').forEach(_=>_.onchange = () => {
  charsetType = document.querySelector('input[name="charset"]:checked').value;
  console.log(charsetType)
  editor.set(defaultCharset())
})

function submit () {
  const method = document.querySelector('input[name="method"]:checked').value;
  const key = document.querySelector('#key-input').value;
  const iv = document.querySelector('input[name="iv"]').value;
  const message = document.querySelector('#text-input').value;
  const salt = document.querySelector('input[name="salt"]').value; // hehe pepper
  const charset = JSON.stringify(editor.get());
  fetch(`./crypt?method=${crypt}&message=${message}&key=${key}&iv=${iv}&charsetType=${charsetType}&charset=${charset}`).then(res => {res.text().then(text => {
    if (text.startsWith("<!")) { // if it's html, you see
      document.querySelector('iframe').className = 'hidden\'t';
      document.querySelector('#result').className = 'hidden';
      document.querySelector('iframe').src = `./iframe#${text}`
    } else {
      document.querySelector('iframe').className = 'hidden';
      document.querySelector('#result').className = 'hidden\'t';
      document.querySelector('#result').innerHTML = text;
    }
  })})
}


// --------------------------------------------------------------------
// pwa, except it's funny because I'm not doing this

if ('serviceWorker' in navigator) console.log("[ServiceWorker] install");
else alert(`please upgrade your browser! you seem to be either using a potato or a really low version of ${bowser.getParser(window.navigator.userAgent).parsedResult.browser.name}. please for the love of everything holy upgrade from v${bowser.getParser(window.navigator.userAgent).parsedResult.browser.version}`);



// --------------------------------------------------------------------
// jsoneditor

// I'M NOT READY FOR THE DARK MAGIC YET AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// const defaultCharsetJson = async ()=>{
//   const res = await fetch('./json/hexLiteralCharset.json')
//   return res.json()
// }

function defaultCharset() {

  fetch(`./json/${charsetType}Charset.json`).then(res=>res.json().then(_=>{
    editor.set(_);
    return _;
  }))
}


// // footer

// document.body.onscroll =_=> {
//   if ((window.scrollY / window.innerHeight) < 0.5 /* if user scrolls less than 50% */ ) document.querySelector('footer').style="display:none;"
//   else document.querySelector('footer').style="position:fixed;display:block;bottom:0;"
//   console.log(window.scrollY / window.innerHeight)
// }

// css
var css = document.querySelector('link[rel="stylesheet"]')
document.querySelectorAll('input').forEach(e => e.onclick =_=> {
  if (e.value.includes("water")) {
    css.href = `https://cdn.jsdelivr.net/npm/water.css@2/out/${e.value.includes("default") ? "water" : e.value.includes("dark") ? "dark" : "light"}.css`
  } else {
    css.href = "https://bouncecss.bookie0.repl.co/bounce.css"
  }
})



// you go down here because you're throwing errors and this script won't run 🤡

// --------------------------------------------------------------------
// jsoneditor boilerplate

// create the editor
const container = document.getElementById("jsoneditor")
const options = {
  mode: "code"
}
const editor = new JSONEditor(container, options)

// set json
editor.set(defaultCharset())

// get json
const updatedJson = editor.get()