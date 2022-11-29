const hash = location.hash.substring(1); // effectively remove the # from the hash so it's only text
const cp = new URLSearchParams(location.search).has("cp")
const html = cp?`<textarea autofocus>${decodeURIComponent(hash)}</textarea>`:atob(decodeURIComponent(hash))

document.body.onload=_=>{
    document.write(html)
    cp?document.querySelector('textarea').select():0
}