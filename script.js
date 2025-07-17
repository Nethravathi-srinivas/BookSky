var popupoverlay = document.querySelector(".popup-overlay");
var popupbox = document.querySelector(".popup-box");
var addpopupbutton = document.getElementById("add-popup-button");

var cancelpopup = document.getElementById("cancel-popup");
var container = document.querySelector(".container");

var addbook = document.getElementById("add-book");
var booktitleinput = document.getElementById("book-title-input");
var bookauthorinput = document.getElementById("book-author-input");
var bookdescriptioninput = document.getElementById("book-description-input");

var formTitle = document.getElementById("form-title");
let editTarget = null; // To track which book is being edited

// Show popup to add book
addpopupbutton.addEventListener("click", function () {
    popupoverlay.style.display = "block";
    popupbox.style.display = "block";

    formTitle.innerText = "Add Book";
    addbook.innerText = "ADD";
    editTarget = null;

    // Clear input fields
    booktitleinput.value = "";
    bookauthorinput.value = "";
    bookdescriptioninput.value = "";
});

// Hide popup
cancelpopup.addEventListener("click", function (event) {
    event.preventDefault();
    popupoverlay.style.display = "none";
    popupbox.style.display = "none";
});

// Add or update book
addbook.addEventListener("click", function (event) {
    event.preventDefault();

    if (editTarget) {
        // UPDATE book
        editTarget.children[0].innerText = booktitleinput.value;
        editTarget.children[1].innerText = bookauthorinput.value;
        editTarget.children[2].innerText = bookdescriptioninput.value;
        editTarget = null;
    } else {
        // CREATE new book
        var div = document.createElement("div");
        div.setAttribute("class", "book-container");
        div.innerHTML = `
            <h2>${booktitleinput.value}</h2>
            <h5>${bookauthorinput.value}</h5>
            <p>${bookdescriptioninput.value}</p>
            <button onclick="deletebook(event)">Delete</button>
            <button onclick="editbook(event)">Edit</button>
        `;
        container.append(div);
    }

    popupoverlay.style.display = "none";
    popupbox.style.display = "none";
});

// DELETE book
function deletebook(event) {
    event.target.parentElement.remove();
}

// EDIT book
function editbook(event) {
    editTarget = event.target.parentElement;

    let title = editTarget.children[0].innerText;
    let author = editTarget.children[1].innerText;
    let description = editTarget.children[2].innerText;

    booktitleinput.value = title;
    bookauthorinput.value = author;
    bookdescriptioninput.value = description;

    formTitle.innerText = "Edit Book";
    addbook.innerText = "UPDATE";

    popupoverlay.style.display = "block";
    popupbox.style.display = "block";
}