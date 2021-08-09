const D = document,
  $table = D.querySelector(".crud_table tbody"),
  $form = D.querySelector(".crud_form"),
  $title = D.querySelector(".crud_title"),
  $template = D.getElementById("crud_template").content,
  $fragment = document.createDocumentFragment();

async function getCars() {
  try {
    let options = { method: 'GET', headers: { 'Content-Type': 'application/json' } },
      res = await fetch("http://localhost:3000/lamborghini", options),
      result = await res.json();

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

async function postCars(data) {
  try {
    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    },
      res = await fetch("http://localhost:3000/lamborghini", options);

    if (!res.ok) throw { status: res.status, statusText: res.statusText }
  } catch (err) {
    let message = err.statusText || "Ocurró un error";
    $form.insertAdjacentHTML("beforeend",
      `<span><strong>Error ${err.status, message}</strong></span>`
    );
  }
}

async function putCars(data) {
  try {
    let options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    },
      res = await fetch(`http://localhost:3000/lamborghini/${data.id}`, options);

    if (!res.ok) throw { status: res.status, statusText: res.statusText }
    location.reload();
  } catch (err) {
    let message = err.statusText || "Ocurró un error";
    $table.insertAdjacentHTML("beforeend",
      `<span><strong>Error ${err.status, message}</strong></span>`
    );
  }
}

function editCarButton() {
  let data;
  D.addEventListener("click", (e) => {
    if (e.target.matches(".edit") || e.target.matches(".edit *")) {
      data = {
        id: e.target.dataset.id || e.target.parentElement.dataset.id,
        model: prompt("Escribe el modelo: "),
        cost: prompt("Escribe el costo: "),
      };
      putCars(data);
    }
  });
}

async function deleteCars(id) {
  try {
    let options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    },
      res = await fetch(`http://localhost:3000/lamborghini/${id}`, options);

    if (!res.ok) throw { status: res.status, statusText: res.statusText }
    location.reload();
  } catch (err) {
    let message = err.statusText || "Ocurró un error";
    $table.insertAdjacentHTML("beforeend",
      `<span><strong>Error ${err.status, message}</strong></span>`
    );
  }
}

function deleteCarButton() {
  let data;
  D.addEventListener("click", (e) => {
    if (e.target.matches(".delete") || e.target.matches(".delete *")) {
      data = e.target.dataset.id || e.target.parentElement.dataset.id;
      deleteCars(data);
    }
  });
}

D.addEventListener('DOMContentLoaded', () => {
  getCars();
  editCarButton();
  deleteCarButton();
})

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    model: e.target.model.value,
    cost: e.target.cost.value
  }

  postCars(data);
})