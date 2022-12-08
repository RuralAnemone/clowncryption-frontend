const hash = location.hash.substring(1); // effectively remove the # from the hash so it's only text
const cp = new URLSearchParams(location.search).has("cp")
const html = cp?`<textarea autofocus>${atob(decodeURIComponent(hash))}</textarea>`:decodeURIComponent(hash)

document.body.onload=_=>{
    document.write(html)
    cp?document.querySelector('textarea').select():hash in location?alert('you seem to have done something wrong. 🤡. please try again!'):0
}