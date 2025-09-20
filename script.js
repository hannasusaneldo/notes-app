const input = document.getElementById("note-input");
const saveBtn = document.getElementById("save-btn");
const notesContainer = document.getElementById("notes-container");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
//display notes
function displayNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    let div = document.createElement("div");
    div.classList.add("note");
    div.innerHTML = `
      <p>${note.text}</p>
      <small>${note.date}</small><br>
      <button onclick="editNote(${index})">Edit</button>
      <button onclick="deleteNote(${index})">Delete</button>
    `;
    notesContainer.appendChild(div);
  });
}

function saveNote() {
  const text = input.value.trim();
  if (text !== "") {
    const now = new Date();
    const dateStr =` ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    notes.push({ text: text, date: dateStr });
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
//test
function editNote(index) {
  input.value = notes[index].text; // load note into input box
  saveBtn.textContent = "Update Note";

  // Temporary change save button to update function
  saveBtn.onclick = function () {
    const text = input.value.trim();
    if (text !== "") {
      const now = new Date();
      const dateStr =` ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      notes[index] = { text: text, date: dateStr }; // update note
      localStorage.setItem("notes", JSON.stringify(notes));
      input.value = "";
      saveBtn.textContent = "Save Note"; // revert button text
      saveBtn.onclick = saveNote; // revert button action
      displayNotes();
    }
  };
} 
saveBtn.addEventListener("click",saveNote);

displayNotes();
