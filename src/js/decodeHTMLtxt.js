function decodeHTMLtxt(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

export default decodeHTMLtxt