const nameEl = document.getElementById("nameToggle");

function toggleName() {
  const expanded = nameEl.classList.toggle("expanded");
  nameEl.setAttribute("aria-expanded", String(expanded));
}

nameEl.addEventListener("click", toggleName);
nameEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleName();
  }
});
