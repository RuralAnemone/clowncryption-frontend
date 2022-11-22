// --------------------------------------------------------------------
// --------------------------------------------------------------------

var crypt = "encrypt";
Array.from(document.querySelectorAll('input')).forEach(e => {
  e.onchange = () => {
    crypt = document.querySelector('input[name = "method"]:checked').value;
    document.querySelector('#text-input').placeholder = `message to ${document.querySelector('input[name = "method"]:checked').value}`;
    document.querySelector('input[type = "submit"]').value = `${crypt.substring(0,1).toUpperCase()}${crypt.substring(1)}!`;
    document.querySelector('#key-input').placeholder = `${crypt}ion key`;
    console.log(crypt);
  }
})

function submit () {
  var method = document.querySelector('input[name = "method"]:checked').value;
  var key = document.querySelector('#key-input').value;
  var iv = document.querySelector('input[name = "iv"]').value;
  var message = document.querySelector('#text-input').value;
  var salt = document.querySelector('input[name = "salt"]').value; // hehe pepper
  fetch(`./crypt?method=${crypt}&message=${message}&key=${key}&iv=${iv}`).then(res => {res.text().then(text => {
    document.querySelector('#result').innerHTML = text;
  })})
}

// --------------------------------------------------------------------
// pwa, except it's funny because I'm not doing this :)

if ('serviceWorker' in navigator) {
  console.log("[ServiceWorker] install");
} else {
  alert(`please upgrade your browser! you seem to be either using a potato or a really low version of ${bowser.getParser(window.navigator.userAgent).parsedResult.browser.name}. please for the love of everything holy upgrade from v${bowser.getParser(window.navigator.userAgent).parsedResult.browser.version}`);
}


// --------------------------------------------------------------------
// jsoneditor

// create the editor
const container = document.getElementById("jsoneditor")
const options = {
  mode: "code"
}
const editor = new JSONEditor(container, options)

// set json
const initialJson = {
    "Array": [1, 2, 3],
    "Boolean": true,
    "Null": null,
    "Number": 123,
    "Object": {"a": "b", "c": "d"},
    "String": "Hello World"
}
editor.set(initialJson)

// get json
const updatedJson = editor.get()