const hash = location.hash.substring(1); // effectively remove the # from the hash so it's only text

const html = UrlSearchParams(location.search).has("cp")?`<textarea autofocus>${decodeURIComponent(hash)}</textarea>`:decodeURIComponent(hash)

setTimeout(_=>{document.write(html)},420.69)