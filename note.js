const note = document.querySelector(".note");
const noteNameInput = document.querySelector(".note-name");
const body = document.querySelector("body");

const updateNoteMargin = () => {
  note.style.marginTop = String(document.querySelector(".toolbar").offsetHeight + 80) + "px";
}
updateNoteMargin();

const noteNum = window.location.search.substring(10);

// if changes are made in settings, reload:
window.addEventListener("storage", () => {
  if (localStorage.getItem("reload") === "true") {
      localStorage.removeItem("reload");
      location.reload();
  }
});

// theme:
if (localStorage.getItem("theme") === "dark") {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    note.style.border = "1px solid white";
    body.style.backgroundImage = "none";
    document.querySelector(".none").value = "black";
} else if (localStorage.getItem("theme") === "peach") {
    body.style.backgroundColor = "#ffabd1";
    note.style.backgroundColor = "#f6b1d0";
    document.querySelector(".none").value = "#f6b1d0";
}

// getting savedNotes from local storage:
const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || {};

// setting the text:
for (let key in savedNotes) {
  if (key === noteNum) {
    noteNameInput.value = savedNotes[key][0];
    note.innerHTML = savedNotes[key][1];

    document.querySelector("title").innerHTML = savedNotes[key][0];
  }
}

// saving to local storage on type.
const saveToLocalStorage = () => {
  let biggestNum = 0;
  for (let key in savedNotes) {
    if (key > biggestNum) {
      biggestNum = Number(key);
    }
  }
   
  savedNotes[noteNum] = ([`${(noteNameInput.value != "") ? noteNameInput.value : "Note " + String(noteNum)}`, `${note.innerHTML}`]);
  localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
  localStorage.setItem("reloadIndex", "true");
}

noteNameInput.addEventListener("input", () => {
  saveToLocalStorage();
});

note.addEventListener("input", () => {
  saveToLocalStorage();
});

let noteNameInputInFocus = false;
noteNameInput.addEventListener("focus", () => {
  noteNameInputInFocus = true;
});
noteNameInput.addEventListener("blur", () => {
  noteNameInputInFocus = false;
});



// making toolbar appear and disappear and setting the right text for selectors:
body.addEventListener("mousemove", () => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0 && selection.toString().length > 0) {
    document.querySelector(".toolbar").style.opacity = "1";
    document.querySelector(".toolbar").style.pointerEvents = "auto";

    const range = window.getSelection().getRangeAt(0);
    const node = range.commonAncestorContainer.parentNode;
    
    console.log(window.getComputedStyle(node).fontSize);
    console.log(window.getComputedStyle(node).fontFamily);
    console.log(window.getComputedStyle(node).backgroundColor);

    document.querySelector(".font-size").value = window.getComputedStyle(node).fontSize;
    document.querySelector(".font-family").value = window.getComputedStyle(node).fontFamily;
    document.querySelector(".highlight").value = window.getComputedStyle(node).backgroundColor.replace("rgba(0, 0, 0, 0)", "white");

    console.log(node);

  } else {
    if (!noteNameInputInFocus) {
      document.querySelector(".toolbar").style.opacity = "0";
      document.querySelector(".toolbar").style.pointerEvents = "none";
    }
  }
});

// customizeability:
document.querySelectorAll(".style").forEach((style) => {
  style.addEventListener("change", () => {

    const range = window.getSelection().getRangeAt(0);
    const span = document.createElement("span");

    switch (style.classList[1]) {
      case 'font-size':
        span.style.fontSize = document.querySelector('.font-size').value;
        break;
      case 'font-family':
        span.style.fontFamily = document.querySelector('.font-family').value;
        break;
      case 'highlight':
        span.style.backgroundColor = document.querySelector('.highlight').value;
        
        if (localStorage.getItem("theme") === "dark") {
          span.style.color = "black";
        }
        if (document.querySelector('.highlight').value === "black") {
          span.style.color = "white";
        }
    }
  
    try {
      range.surroundContents(span); 
    } catch (error) {
      console.log(error);
    }

    saveToLocalStorage();
   }
  )
});

document.querySelectorAll("button.style").forEach((button) => {
  button.addEventListener("click", () => {

    const range = window.getSelection().getRangeAt(0);
    const node = range.commonAncestorContainer.parentNode;
    const span = document.createElement("span");

    switch (button.classList[1]) {
      case 'bold':
        const isBold = window.getComputedStyle(node).fontWeight === "800";
        span.style.fontWeight = (isBold) ? "400" : "800" ;
        break;
      case 'italic':
        const isItalic = window.getComputedStyle(node).fontStyle === "italic";
        span.style.fontStyle = (isItalic) ? "normal" : "italic";
    }

    try {
      range.surroundContents(span); 
    } catch (error) {
      console.log(error);
    }

    saveToLocalStorage();
  });
});


// more options:
document.querySelector(".more-button").addEventListener("click", () => {
  document.querySelector(".more-options-con").style.display = document.querySelector(".more-options-con").style.display === "none" ? "flex" : "none";
});

// outrageous border radius:
document.querySelector(".border-radius input").addEventListener("click", () => {
  if (document.querySelector(".border-radius input").checked) {
    note.style.borderRadius = "20px";
    document.querySelector(".toolbar").style.borderRadius = "20px";
    document.querySelectorAll("input").forEach((input) => {
      input.style.borderRadius = "10px";
    });
    document.querySelectorAll("select").forEach((select) => {
      select.style.borderRadius = "5px";
    });
  } else {
    note.style.borderRadius = "0";
    document.querySelector(".toolbar").style.borderRadius = "0";
    document.querySelectorAll("input").forEach((input) => {
      input.style.borderRadius = "0";
    });
    document.querySelectorAll("select").forEach((select) => {
      select.style.borderRadius = "0";
    });  
    document.querySelectorAll(".switch input").forEach((toggle) => {
      toggle.style.borderRadius = "10px";
    });
  }
});