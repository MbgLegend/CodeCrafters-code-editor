const output = document.getElementById("output");

const HTML = CodeMirror.fromTextArea(document.getElementById("HTML-code"), {
    mode: "htmlmixed",
    lineNumbers: true,
    theme: "default",
});

const CSS = CodeMirror.fromTextArea(document.getElementById("CSS-code"), {
    mode: "css",
    lineNumbers: true,
    theme: "default",
});

const JavaScript = CodeMirror.fromTextArea(document.getElementById("JavaScript-code"), {
    mode: "javascript",
    lineNumbers: true,
    theme: "default",
});

function updateOutput() {
    const iframeDocument = output.contentDocument || output.contentWindow.document;

    const sanitizedHTML = HTML.getValue().replace(/<!--[\s\S]*?-->/g, "")

    iframeDocument.open()
    iframeDocument.write(sanitizedHTML)
    iframeDocument.close()

    const styleElement = iframeDocument.createElement("style")
    styleElement.textContent = CSS.getValue()
    iframeDocument.head.appendChild(styleElement)

    const scriptElement = iframeDocument.createElement("script")
    scriptElement.textContent = JavaScript.getValue()
    iframeDocument.body.appendChild(scriptElement)
}

HTML.on("change", updateOutput)
CSS.on("change", updateOutput)
JavaScript.on("change", updateOutput)

window.onload = () => {
    updateOutput()
}