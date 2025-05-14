const savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
const today = dayjs().format("YYMMDD");

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
        if (noteName.length > 8) {
            noteName = noteName.substring(0, 8) + "...";
        }

        document.querySelector(".notes-con").innerHTML += `      
        <div class="note-con">
            <div class="note-link"></div>
            <div class="note-labels-con">
                <h4 class="note-label">${noteName}</h4>
                <h4 class="note-label-days important-span">${daysLeft} days left<h4>
            </div>
            <button class="final-delete-btn final-delete-btn-${key}">DELETE</button>
            <button class="restore-btn restore-btn-${key}">RESTORE</button>
        </div>`;

    }
}

if (document.querySelector(".notes-con").innerHTML.trim() === "") {
    document.querySelector(".notes-con").innerHTML += "No recently deleted notes";
}

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

document.querySelectorAll(".restore-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const noteNum = button.classList[1].substring(12);

        savedNotes[noteNum].pop();
        savedNotes[noteNum].pop();
        localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
        location.reload();

    });
});
