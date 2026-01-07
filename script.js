// Defining all variables
const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Function to show updated notes
function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
}

// Function to store notes in local storage
function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Function to attach listeners to all existing notes
function attachNoteListeners(){
    const notes = document.querySelectorAll(".input-box");
    notes.forEach(note => {
        note.onkeyup = function(){
            updateStorage();
        }
    });
}

// Load saved notes and attach listeners
showNotes();
attachNoteListeners();

// Function to create a new note
createBtn.addEventListener("click", ()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    
    // Attach listener to the new note
    inputBox.onkeyup = function(){
        updateStorage();
    }
});

// Function to delete notes
notesContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Function to create a line space with enter key
document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})