const newNoteLink = document.querySelector(".new-note-link");
const body = document.querySelector("body");
const today = dayjs().format("YYMMDD");
const currentTime = Number(dayjs().format("HHmm"));
const theme = localStorage.getItem("theme");

console.log(localStorage);

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

// parsing savedNotes:
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
        if (noteName.length > 14) {
            noteName = noteName.substring(0, 12) + "...";
        } 

        document.querySelector(".notes-con").innerHTML += `      
        <div class="note-con">
            <div class="note-link" id="${key}">
                    ${savedNotes[key][1].replace("48px", "12px").replace("32px", "8px").replace("24px", "6px").replace("16px", "4px").replace("13.3px", "3.325px")}
            </div>
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

// when clicked on note link, open note:
document.querySelectorAll(".note-link").forEach((note) => {
    note.addEventListener("click", () => {
        window.location.href = `note.html?note-num=${note.id}`;
    });
})

// delete buttons:
let secondDeleteBtnDisplayed = false
document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {

        button = document.querySelector(`.${button.classList[1]}`);
        const noteNum = button.classList[1].substring(11);
        const secondDeleteBtn = document.querySelector(`.second-delete-btn-${noteNum}`);

        const backToOriginal = () => {
                        secondDeleteBtnDisplayed = false;
            secondDeleteBtn.style.opacity = "0";
            secondDeleteBtn.style.transform = "translateY(-20px)";
            secondDeleteBtn.style.cursor = "default";

            // making close icon turn into trash can icon:
            document.querySelector(`.delete-btn-${noteNum}`).style.opacity = 0.1;
            setTimeout(() => {
                document.querySelector(`.delete-btn-${noteNum}`).style.opacity = 0.85;
                document.querySelector(`.delete-btn-${noteNum}`).src ="https://cdn-icons-png.freepik.com/512/1345/1345874.png";
            }, 200);
        }

        if (secondDeleteBtnDisplayed === false) {
            secondDeleteBtnDisplayed = true
            secondDeleteBtn.style.opacity = "1";
            secondDeleteBtn.style.transform = "translateY(0)";
            secondDeleteBtn.style.cursor = "pointer";

            // making trash can icon turn into close icon:
            document.querySelector(`.delete-btn-${noteNum}`).style.opacity = 0.1;
            setTimeout(() => {
                document.querySelector(`.delete-btn-${noteNum}`).style.opacity = 0.85;
                document.querySelector(`.delete-btn-${noteNum}`).src = "https://www.shareicon.net/data/512x512/2015/09/17/642337_close_512x512.png";
            }, 200);

            setTimeout(backToOriginal, 4000); // bring button layout back to original after 4 seconds. 
        } else {
            backToOriginal();
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
if (theme === "dark") {
    document.querySelectorAll(".note-link").forEach(note => {
        note.style.color = "white";
    });
    body.style.backgroundColor = "black";
    body.style.color = "white";
    document.querySelectorAll(".note-link").forEach(note => {
        note.style.borderColor = "white";
    });
} else if (theme === "peach") {
    body.style.backgroundColor = "#ffabd1";
    body.style.color = "#bf608b";
        document.querySelectorAll(".note-link").forEach(note => {
        note.style.borderColor = "#bf608b";
    });
}

// setting same or new tab:
document.querySelectorAll(".note-link-link").forEach(link => {
    link.target = (localStorage.getItem("tab") === "_blank") ? "_blank" : "_self";
});
