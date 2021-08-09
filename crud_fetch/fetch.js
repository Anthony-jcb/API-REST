const D = document,
  $table = D.querySelector(".crud_table tbody"),
  $form = D.querySelector(".crud_form"),
  $title = D.querySelector(".crud_title"),
  $template = D.getElementById("crud_template").content,
  $fragment = document.createDocumentFragment();

async function getCars() {
  try {
    let options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    let res = await fetch("http://localhost:3000/lamborghini", options);
    let result = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText }

    result.forEach((car) => {
      $template.querySelector(".model").textContent = car.model;
      $template.querySelector(".cost").textContent = car.cost;
      $template.querySelector(".edit").dataset.id = car.id;
      $template.querySelector(".delete").dataset.id = car.id;

      let $clone = D.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $table.appendChild($fragment);
  } catch (err) {
    let message = err.statusText || "Ocurró un error";
    $table.insertAdjacentHTML("beforeend",
      `<tr><td><strong>Error ${err.status, message}</strong></td></tr>`
    );
  }
}

D.addEventListener('DOMContentLoaded', () => {
  getCars();
})