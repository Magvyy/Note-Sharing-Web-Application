function switchMode() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/darkmode", true);
    xhttp.send();
    document.querySelectorAll(".notes-link").forEach(element => {
        var display = element.style.display;
        element.style.display = "none";
        element.style.display = display;
    });
}

var loadNew = false;
window.onscroll = function() {
    var windHeight = window.innerHeight;
    var scroll = Math.round(scrollY);
    var bodyHeight = document.body.offsetHeight;
    if ((windHeight + scroll) >= bodyHeight) {
        loadNew = true;
    }
}

var frontPage = setInterval(function() {
    if (loadNew) {
        loadNew = false;
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            try {
                var notes = JSON.parse(this.response);
                notes.forEach(note => {
                    note = frontPageNote(note);
                    var pageNotes = document.querySelector("#notes");
                    pageNotes.appendChild(note);
                });
            }
            catch (e) {
                console.log(e);
                clearInterval(frontPage);
            }
        }
        var notes = document.querySelectorAll("#header a");
        var noteIds = [];
        for (let i = 0; i < notes.length; i++) {
            var note = notes[i];
            var href = note.getAttribute("href");
            var temp = href.split("/");
            var noteId = Number(temp[temp.length - 1]);
            noteIds.push(noteId);
        }
        var params = `notes=${noteIds}`;
        xhttp.open("GET", "/new_notes" + "?" + params, true);
        xhttp.send();
    }
}, 100);

function frontPageNote(noteInfo) {
    var note = document.createElement("div");
    note.setAttribute("class", "card text-white bg-dark mb-3");
    note.setAttribute("id", "note");
    note.innerHTML = 
    `<div class="card text-white bg-dark" id="author">` +
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">` +
            `<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>` +
            `<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>` +
        `</svg>` +
        `<a class="card-text text-white bg-dark" href = "/profile/${noteInfo["user_name"]}">` +
            `${noteInfo["user_name"]}` +
        `</a>` +
        `<p class="card-text text-white bg-dark">${noteInfo["created"]}</p>` +
    `</div>` +
    `<div id="header">` +
        `<a href = "/note/view/${noteInfo["note_id"]}">` +
            `<h5 class="card-text text-white bg-dark">` +
                `${noteInfo["note_name"]}` +
            `</h5>` +
        `</a>` +
    `</div>` +
    `<div class="card-text text-white bg-dark" id="body">` +
        `<a href = "/note/view/${noteInfo["note_id"]}">` +
            `${noteInfo["note_content"]}` +
        `</a>` +
    `</div>` +
    `<hr>` +
    `<div class="card text-white bg-dark" id="interact">` +
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">` +
            `<path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>` +
        `</svg>` +
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">` +
            `<path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>` +
        `</svg>` +
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">` +
            `<path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>` +
        `</svg>` +
    `</div>`;
    return note;    
}