const tabSelector = document.querySelector("#tab");
const themeSelector = document.querySelector("#theme");
const timSwitch = document.querySelector(".tim-switch");
const quoteSwitch = document.querySelector(".quote-switch");
const body = document.querySelector("body");

localStorage.setItem("reload", "true");


// setting the selected value of tab:
if (localStorage.getItem("tab") === "_self") {
    document.querySelectorAll("#tab option")[1].selected = true;
}

// setting tab to local storage:
tabSelector.addEventListener("click", () => {
    localStorage.setItem("tab", tabSelector.value);
    localStorage.setItem("reload", "true");
});

// setting the selected value of tim:
timSwitch.checked = true;

if (localStorage.getItem("tim") === "false") {
    timSwitch.checked = false;
}

// setting Tim to local storage:  
timSwitch.addEventListener("click", () => {
    localStorage.setItem("tim", String(timSwitch.checked));
    localStorage.setItem("reload", "true");
});


// setting the selected value of theme:
if (localStorage.getItem("theme") === "dark") {
    document.querySelectorAll("#theme option")[1].selected = true;
} else if (localStorage.getItem("theme") === "peach") {
    document.querySelectorAll("#theme option")[2].selected = true;
}

const setTheme = () => {
    if (localStorage.getItem("theme") === "dark") {
        body.style.backgroundImage = "none";
        body.style.backgroundColor = "black";
        body.style.color = "white";
        document.querySelector(".switch input").style.borderColor = "white";
    } else if (localStorage.getItem("theme") === "peach") {
        body.style.backgroundColor = "#ffabd1";
        body.style.color = "#e63674";
    } else {
        body.style.backgroundImage = "none";
        body.style.backgroundColor = "white";
        body.style.color = "black";
    }
}

// setting theme to local storage and changing the style:
themeSelector.addEventListener("click", () => {
    localStorage.setItem("theme", themeSelector.value);
    localStorage.setItem("reload", "true");
    
    setTheme();
})

// setting theme:
setTheme();

