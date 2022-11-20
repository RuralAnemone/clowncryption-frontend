var crypt = "encrypt";
document.querySelector('#form').onchange = () => {
  crypt = document.querySelector('input[name = "method"]:checked').value;
  
  document.querySelector('#text-input').placeholder = `message to ${document.querySelector('input[name = "method"]:checked').value}`;
  
  document.querySelector('input[type = "submit"]').value = `${crypt.substring(0,1).toUpperCase()}${crypt.substring(1)}!`;

  document.querySelector('#key-input').placeholder = `${crypt}ion key`;
}

function submit () {
  var method = document.querySelector('input[name = "method"]:checked').value;
  var key = document.querySelector('#key-input').value;
  var iv = document.querySelector('input[name = "iv"]').value;
  var message = document.querySelector('#text-input').value;
  var salt = document.querySelector('input[name = "salt"]').value; // hehe pepper
  var xhr = new XMLHttpRequest();
  xhr.open('POST', )
}