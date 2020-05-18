const lecturers = [
  {
    name: "Vytautas Valaitis",
    klevas: "http://klevas.mif.vu.lt/~valaitis/",
    mail: "valaitisv@gmail.com",
  },
  { name: "Karolis Petrauskas", klevas: "https://klevas.mif.vu.lt/~karolis" },
  { name: "Karolis Uosis", klevas: "https://klevas.mif.vu.lt/~kuosis/" },
  { name: "Romas Baronas", klevas: "http://klevas.mif.vu.lt/~baronas/" },
];

const fuse = new Fuse(lecturers, {
  shouldSort: true,
  threshold: 0.4,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["name"],
});

function addAppendDiv(appendTo, fn) {
  let div = document.createElement("div");
  fn(div);
  appendTo.appendChild(div);
}

function addAccordionElem(container, lect) {
  let accordion = document.createElement("div");
  accordion.className = "accordion";
  let button = document.createElement("button");
  button.className = "accordion-button";
  button.textContent = lect.name;
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    let panel = button.nextElementSibling;
    let display = panel.style.display;
    if (display === "" || display === "none") panel.style.display = "block";
    else panel.style.display = "none";
  });
  accordion.appendChild(button);

  let pane = document.createElement("div");
  pane.className = "accordion-pane";

  addAppendDiv(pane, (div) => {
    div.style.display = "flex";
    let browser_ico = document.createElement("i");
    browser_ico.className = "fad fa-browser accordion-icon";
    div.appendChild(browser_ico);

    let klevas = document.createElement("a");
    klevas.href = lect.klevas;
    klevas.textContent = "klevo puslapis";
    div.appendChild(klevas);
  });

  if (lect.mail)
    addAppendDiv(pane, (div) => {
      div.style.display = "flex";

      let email_ico = document.createElement("i");
      email_ico.className = "fad fa-at accordion-icon";
      div.appendChild(email_ico);

      let mail = document.createElement("a");
      mail.href = "mailto:" + lect.mail;
      mail.textContent = lect.mail;
      div.appendChild(mail);
    });

  accordion.appendChild(pane);
  container.appendChild(accordion);
}

function onLecturerInputChanged() {
  let input = document.getElementById("lecturerInput");
  let filter = input.value.toLowerCase();
  let container = document.getElementById("lecturerContainer");

  container.innerHTML = "";
  fuse.search(filter).forEach((l) => {
    addAccordionElem(container, l);
  });
}

function switchMode() {
  var element = document.body;
  element.classList.toggle("light");
  if (element.classList.contains("light")) {
    localStorage.setItem("mode", "light");
  } else {
    localStorage.setItem("mode", "dark");
  }
}

window.onload = () => {
  if (localStorage.getItem("mode"))
    if (localStorage.getItem("mode") == "light") {
      var element = document.body;
      element.classList.add("light");
    }
};
