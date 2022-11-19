const express = require('express');
const path = require('path');
const app = express();
const port = process.env['PORT'] || 42069;
const ClownCryption = require('clowncryption');
// as soon as it's on npm :)

// server
app.use("/", express.static(path.join(__dirname, "/")));

app.post("/crypt", (req, res) => {
  const usp = new URLSearchParams(req.query);
  if (usp.get(method)=="encrypt") {
    res.send(ClownCryption.encrypt({
      message: usp.get(message),
      key: usp.get(key),
      iv: usp.get(iv)
    }))
  } else if (usp.get(method)=="decrypt") {
    res.send(ClownCryption.decrypt({
      message: usp.get(message),
      key: usp.get(key),
      iv: usp.get(iv)
    }))
  }
});

app.use((req, res, next) => {
  res.status(404).sendFile('/home/runner/clowncryption-frontend/404.html')
})
app.listen(port, _=>console.log("online!"));