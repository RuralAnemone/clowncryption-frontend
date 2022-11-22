// ---------------------------------

// variables and prototypes
const express = require('express');
const path = require('path');
const app = express();
const port = process.env['PORT'] || 42069;
const ClownCryption = require('clowncryption');

// https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
String.prototype.toHHMMSS = function() {
  var sec_num = parseInt(this, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return hours + ':' + minutes + ':' + seconds;
}

// ---------

// server
app.use("/", express.static(path.join(__dirname, 'public')));

app.get("/crypt", (req, res) => {
  const usp = new URLSearchParams(req.query);
  if (usp.has("method") && usp.has("message") && usp.has("key") && usp.has("iv") && usp.has("charset") && usp.toString().split("&").length == 5) { // if it has and only has URLSearchParams from the frontend
    if (usp.get("method") == "encrypt") {
      res.send(ClownCryption.encrypt({
        message: usp.get("message"),
        key: usp.get("key"),
        iv: usp.get("iv"),
        charset: atob(usp.get("charset"))
      }))
    } else if (usp.get("method") == "decrypt") {
      res.send(ClownCryption.decrypt({
        message: usp.get("message"),
        key: usp.get("key"),
        iv: usp.get("iv"),
        charset: atob(usp.get("charset"))
      }))
    }
  } else res.send('improper parameters; try again :)')
});

app.all('/uptime', (req, res) => {
  var usp = new URLSearchParams(req.query);
  usp.has("hhmmss") ? res.send(process.uptime().toString().toHHMMSS()) : res.send(parseInt(process.uptime()).toString());
});

app.all('/charset', (req, res) => {
  res.send(ClownCryption);
})

app.use((req, res, next) => {
  res.status(404).sendFile(`${process.cwd()}/public/404.html`)
})
 
app.listen(port, () => {
  setInterval(() => {
    console.clear();
    console.log(`Uptime: ${process.uptime().toString().toHHMMSS()}

online!
listening on port: ${port}

frontend:
http://localhost:${port}


replit url (if applicable):`)
    if (process.env.REPL_ID) {
      console.log(`https://${process.env.REPL_SLUG.toLowerCase()}.${process.env.REPL_OWNER.toLowerCase()}.repl.co/`)
    } else console.log(process.env.REPL_ID)
  }, 1000);
});