const lodingscreen = document.getElementById("lodingscrenid");
function load() {
  lodingscreen.style.display = "none";
}

const clock = document.getElementById("clock");
const date = new Date().toDateString();
const mobnavshow = document.getElementById("nav_links_show");
const noteform = document.getElementById("noteform");
const alert_container = document.querySelector(".alert-container");
const alert_cont = document.querySelector(".alert-container2");

clock.innerText = date;
const nav_show = () => {
  mobnavshow.classList.remove("hidden");
};
const mobnavhide = () => {
  mobnavshow.classList.add("hidden");
};
const addnote = () => {
  noteform.classList.remove("hidden");
  mobnavshow.classList.add("hidden");
};
const noteremove = () => {
  noteform.classList.add("hidden");
};
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const darktheme = () => {
  if (moon.classList.contains("hidden")) {
    moon.classList.remove("hidden");
    sun.classList.add("hidden");
    mobnavshow.classList.add("hidden");
  } else {
    sun.classList.remove("hidden");
    moon.classList.add("hidden");
    mobnavshow.classList.add("hidden");
  }
};
const removeall = () => {
  alert_cont.classList.remove("hidden");
};
const alertok = () => {
  localStorage.removeItem("notes");
  location.reload();
  alert_cont.classList.add("hidden");
};
const alertclose = () => {
  alert_container.classList.add("hidden");
};
const alertcl = () => {
  alert_cont.classList.add("hidden");
};

const notesArray = [];

// Load notes from localStorage on page load
window.addEventListener("load", () => {
  const savedNotes = JSON.parse(localStorage.getItem("notes"));
  if (savedNotes) {
    notesArray.push(...savedNotes);
    renderNotes();
  }
});

function saveNotesToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notesArray));
}
function renderNotes() {
  const appendnote = document.getElementById("appendnote");
  appendnote.innerHTML = ""; // Clear previous notes

  notesArray.forEach((note, index) => {
    const li = document.createElement("li");
    li.innerHTML = note.html;
    appendnote.appendChild(li);

    // Add event listeners for delete and edit buttons
    const deleteBtn = li.querySelector(".fa-trash");
    const editBtn = li.querySelector(".fa-pen-to-square");

    deleteBtn.addEventListener("click", () => {
      notesArray.splice(index, 1);
      saveNotesToLocalStorage();
      renderNotes();
    });
   
     
  });
}
// const alertwr = document.getElementById('alertclose')

const notesubmit = document.getElementById("notesubmit");
notesubmit.addEventListener("click", (e) => {
  e.preventDefault();
  var title = document.getElementById("notetitle");
  var desc = document.getElementById("notedescription");
  if (title.value == "" || desc.value == "") {
    alert_container.classList.remove("hidden");
  } else {
    const dateli = new Date().toLocaleDateString();
    const timeli = new Date().toLocaleTimeString();
    var htmldata = `<div class="flex flex-col gap-2">
        <div class="flex justify-between border-b px-2 pt-2">
        <h4 class="font-medium capitalize overflow-hidden" id="notetileshow">${title.value}</h4>
        <div class="flex gap-3">
            <i class="fa-solid fa-trash text-red-500"></i>
        </div>
        </div>
        <div class="text-sm font-semibold px-2 capitalize overflow-hidden" id="notedescshow">
        ${desc.value}
        </div>
        <div id="clockpost" class="px-2 text-sm flex justify-between"><span>${dateli}</span><span>${timeli}</span></div>
    </div>`;
    // li.insertAdjacentHTML("afterbegin",htmldata)
    notesArray.push({ title, description: desc, html: htmldata });
    saveNotesToLocalStorage();
    renderNotes();

    title.value = "";
    desc.value = "";
  }
});
