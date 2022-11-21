// create the editor
const container = document.getElementById("jsoneditor")
const options = {
mode: ["text"]
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