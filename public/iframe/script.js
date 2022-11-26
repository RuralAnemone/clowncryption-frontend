const hash = location.hash.substring(1); // effectively remove the # from the hash so it's only text

setTimeout(_=>{document.write(decodeURIComponent(hash))},420.69)