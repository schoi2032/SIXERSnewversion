
fetch("../footer.html")
    .then(response => response.text())
    .then(data => {
    document.getElementById("footer").innerHTML = data;
});
fetch("../nav.html")
    .then(response => response.text())
    .then(data => {
    document.getElementById("nav").innerHTML = data;
    switch (type) {
    case "0":
        document.querySelector("#nav a[href='index.html']").classList.add("active");
        break;
    case "1":
        document.querySelector("#nav a[href='news.html']").classList.add("active");
        break;
    case "2":
        document.querySelector("#nav a[href='comedy.html']").classList.add("active");
        break;
    case "3":
        document.querySelector("#nav a[href='fun-facts.html']").classList.add("active");
        break;
    case "4":
        document.querySelector("#nav a[href='spotlight.html']").classList.add("active");
        break;
    case "5":
        document.querySelector("#nav a[href='about.html']").classList.add("active");
        break;
    case "6":
        document.querySelector("#nav a[href='Boom-trip-photos.html']").classList.add("active");
        break;  
}
});

const script = document.currentScript;
const type = script.getAttribute("setting");

