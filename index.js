const newNoteLink = document.querySelector(".new-note-link");
const body = document.querySelector("body");
const today = dayjs().format("YYMMDD");
const currentTime = Number(dayjs().format("HHmm"));

console.log(localStorage);

// if changes are made in settings, reload:
window.addEventListener("storage", () => {
    if (localStorage.getItem("reload") === "true" || localStorage.getItem("reloadIndex") === "true") {
        localStorage.removeItem("reloadIndex");
        localStorage.removeItem("reload");
        location.reload();
    }
});

// setting greeting:
if (currentTime < 500 || currentTime > 2100){
  document.querySelector("h1").innerHTML += "Night";
} else if (currentTime < 1200) {
  document.querySelector("h1").innerHTML += 'Morning';
  if (localStorage.getItem("tim") != "false") {
    document.querySelector("h1").innerHTML += ' <a href="https://www.youtube.com/watch?v=RqYCdGs9ivk" target="_blank"><img class="tim" src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"/></a>';
  }
} else if (currentTime < 1700) {
  document.querySelector("h1").innerHTML += "Afternoon";
} else {
  document.querySelector("h1").innerHTML += "Evening";
} 

// getting savedNotes:
const savedNotes = JSON.parse(localStorage.getItem("savedNotes"));

// settings URL for new note:
let biggestNoteNum = 0;
for (let key in savedNotes) {
    if (key > biggestNoteNum) {
        biggestNoteNum = Number(key);
    }
}

newNoteLink.href = `note.html?note-num=${biggestNoteNum + 1}`;

// setting the note links:
for (let key in savedNotes) {
    if (savedNotes[key].includes("deleted") === false) {
        let noteName = savedNotes[key][0];
        if (noteName.length > 15) {
            noteName = noteName.substring(0, 15) + "...";
        } 

        console.log(savedNotes[key][1])        
        
        document.querySelector(".notes-con").innerHTML += `      
        <div class="note-con">
            <a href="note.html?note-num=${key}" class="note-link-link"><div class="note-link">
            
            ${savedNotes[key][1].replace("48px", "12px").replace("32px", "8px").replace("24px", "6px").replace("16px", "4px").replace("13.3px", "3.325px")}
            
            </div></a>
            <h4 class="note-label">${noteName}</h4>
            <div class="delete-buttons-con">
                <img src="https://cdn-icons-png.freepik.com/512/1345/1345874.png" class="delete-btn delete-btn-${key}" />
                <button class="second-delete-btn second-delete-btn-${key}">DELETE ?</button>
            <div>
        </div>`;
    }
}

// if there are no saved notes, display text:
if (document.querySelector(".notes-con").innerHTML.trim() === "") {
    document.querySelector(".notes-con").innerHTML += "No saved notes"
}

// delete buttons:
let secondDeleteBtnDisplayed = false
document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {

        button = document.querySelector(`.${button.classList[1]}`);
        const noteNum = button.classList[1].substring(11);
        const secondDeleteBtn = document.querySelector(`.second-delete-btn-${noteNum}`);

        if (secondDeleteBtnDisplayed === false) {
            secondDeleteBtnDisplayed = true
            secondDeleteBtn.style.opacity = "1";
            secondDeleteBtn.style.transform = "translateY(0)";
            secondDeleteBtn.style.cursor = "pointer";
        } else {
            secondDeleteBtnDisplayed = false;
            secondDeleteBtn.style.opacity = "0";
            secondDeleteBtn.style.transform = "translateY(-20px)";
            secondDeleteBtn.style.cursor = "default";
        }

        secondDeleteBtn.addEventListener("click", () => {
            savedNotes[noteNum].push("deleted");
            savedNotes[noteNum].push(JSON.stringify([Number(today.substring(0, 2)), Number(today.substring(2, 4)), Number(today.substring(4, 6))]));
            console.log(savedNotes);
            localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
            location.reload();
        }); 
    });
});

// setting the theme:
if (localStorage.getItem("theme") === "dark") {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    body.style.backgroundImage = "none";
    document.querySelectorAll(".note-link-link").forEach((note) => {
        note.style.border = "1px solid white";
    });
} else if (localStorage.getItem("theme") === "peach") {
    body.style.backgroundColor = "#ffabd1";
    body.style.color = "#bf608b";
    document.querySelectorAll(".note-link-link").forEach((note) => {

    });
}

// setting same or new tab:
document.querySelectorAll(".note-link-link").forEach(link => {
    link.target = (localStorage.getItem("tab") === "_blank") ? "_blank" : "_self";
});