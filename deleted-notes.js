const savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
const today = dayjs().format("YYMMDD");
const body = document.querySelector("body");

// setting the notes:
for (let key in savedNotes) {
    if (savedNotes[key].includes("deleted")) {


        const deletedTime = JSON.parse(savedNotes[key][3]);

        let monthLength;
        switch (deletedTime[1]) { // setting the right month length.
            case 1:
                monthLength = 31;
                break;
            case 2:
                monthLength = 28; 
                break;
            case 3:
                monthLength = 31; 
                break;
            case 4:
                monthLength = 30; 
                break;
            case 5:
                monthLength = 31; 
                break;
            case 6:
                monthLength = 30; 
                break;
            case 7:
                monthLength = 31; 
                break;
            case 8:
                monthLength = 31; 
                break;
            case 9:
                monthLength = 30; 
                break;
            case 10:
                monthLength = 31; 
                break;
            case 11:
                monthLength = 30; 
                break;
            case 12:
                monthLength = 31; 
        }

        const years = (Number(today.substring(0, 2)) - deletedTime[0]) * 360;
        const months = (Number(today.substring(2, 4)) - deletedTime[1]) * 30;
        const days = Number(today.substring(4, 6)) - deletedTime[2];
        
        let daysLeft = (14 - years - months - days);

        if (deletedTime[0] - Number(today.substring(0, 2)) === -1) {  // if it was deleted last year, do a different calculation.
            daysLeft = (14 - days) * -1 -3;
        }

        console.log(daysLeft);
        
         
        if (daysLeft === 0) {
            delete savedNotes[key];
            localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
            location.reload();
        }

        let noteName = savedNotes[key][0];
        if (noteName.length > 14) {
            noteName = noteName.substring(0, 12) + "...";
        }

        document.querySelector(".notes-con").innerHTML += `      
        <div class="note-con">
            <div class="note-link">
                ${savedNotes[key][1].replace("48px", "12px").replace("32px", "8px").replace("24px", "6px").replace("16px", "4px").replace("13.3px", "3.325px")}
            </div>
            <div class="note-labels-con">
                <h4 class="note-label">${noteName}</h4>
                <h4 class="note-label important-span">${daysLeft} days left<h4>
            </div>
            <div class="delete-buttons-con">
                <button class="final-delete-btn final-delete-btn-${key}">DELETE</button>
                <button class="restore-btn restore-btn-${key}">RESTORE</button>
            </div>
        </div>`;
    }
}

// set text if there are no deleted notes:
if (document.querySelector(".notes-con").innerHTML.trim() === "") {
    document.querySelector(".notes-con").innerHTML += "No recently deleted notes";
}

// deletement process:
document.querySelectorAll(".final-delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const noteNum = button.classList[1].substring(17);
        if (confirm(`Are you sure you want to delete ${savedNotes[noteNum][0]} ?  This is irreversible.`)) {
            delete savedNotes[noteNum];
            localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
            location.reload();
        }
    })
})

// restore process:
document.querySelectorAll(".restore-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const noteNum = button.classList[1].substring(12);

        savedNotes[noteNum].pop();
        savedNotes[noteNum].pop();
        localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
        location.reload();

    });
});

// setting the theme:
const theme = localStorage.getItem("theme");
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
