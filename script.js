import { Typer } from "./typer.js";

const nameEl = document.getElementById("nameToggle");
const nameSuffixEl = document.getElementById("nameSuffix");
const nameTyper = new Typer(nameSuffixEl, { stateDuration: 70, stagger: 35 });

function toggleName() {
  const expanded = nameEl.classList.toggle("expanded");
  nameEl.setAttribute("aria-expanded", String(expanded));
  if (expanded) {
    nameTyper.in("ametkaliyeva");
  } else {
    nameTyper.clear();
  }
}

nameEl.addEventListener("click", toggleName);
nameEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleName();
  }
});

document.querySelectorAll(".entry").forEach((entry) => {
  const row = entry.querySelector(".entry-row");
  const detail = entry.querySelector(".entry-detail");
  if (!row || !detail) return;

  row.setAttribute("role", "button");
  row.setAttribute("tabindex", "0");
  row.setAttribute("aria-expanded", "false");

  function toggleEntry() {
    const expanded = entry.classList.toggle("expanded");
    row.setAttribute("aria-expanded", String(expanded));
  }

  row.addEventListener("click", toggleEntry);
  row.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleEntry();
    }
  });
});

document.querySelectorAll(".entry-row a").forEach((link) => {
  link.addEventListener("click", (event) => event.stopPropagation());
});

document.querySelectorAll(".tip").forEach((tip) => {
  tip.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = tip.classList.contains("tip-open");
    document.querySelectorAll(".tip.tip-open").forEach((t) => t.classList.remove("tip-open"));
    if (!isOpen) tip.classList.add("tip-open");
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".tip.tip-open").forEach((t) => t.classList.remove("tip-open"));
});
