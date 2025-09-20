const input = document.getElementById("note-input");
const saveBtn = document.getElementById("save-btn");
const notesContainer = document.getElementById("notes-container");

// Load notes from LocalStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function displayNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    let div = document.createElement("div");
    div.classList.add("note");
    div.innerHTML = `
      <p>${note}</p>
      <button onclick="deleteNote(${index})">Delete</button>
    `;
    notesContainer.appendChild(div);
  });
}

function saveNote() {
  if (input.value.trim() !== "") {
    notes.push(input.value);
    localStorage.setItem("notes", JSON.stringify(notes));
    input.value = "";
    displayNotes();
  }
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

saveBtn.addEventListener("click", saveNote);

displayNotes(); // show existing notes on page load
