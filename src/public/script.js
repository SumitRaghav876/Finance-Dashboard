function go(id, el) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".nav-item")
    .forEach((n) => n.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  el.classList.add("active");
}
function tog(id) {
  document.getElementById(id).classList.toggle("open");
}
function search(val) {
  const v = val.toLowerCase();
  document.querySelectorAll(".nav-item").forEach((el) => {
    const t = el.querySelector(".nav-item-text");
    if (!t) return;
    el.style.display =
      !v || t.textContent.toLowerCase().includes(v) ? "flex" : "none";
  });
}
