
fetch("footer.html")
    .then(response => response.text())
    .then(data => {
    document.getElementById("footer").innerHTML = data;
});
fetch("nav.html")
    .then(response => response.text())
    .then(data => {
    document.getElementById("nav").innerHTML = data;
});