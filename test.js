const ClownCryption = require('clowncryption').default
const Clown = new ClownCryption({
  key: "key",
  iv: "iv"
})

const encryptedString = Clown.encrypt({
  message: "among us"
})

console.log(Clown.decrypt({
  message: encryptedString
}))

// i love broken code