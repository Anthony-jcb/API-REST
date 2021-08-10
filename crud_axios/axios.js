const D = document,
  $table = D.querySelector(".crud_table tbody"),
  $form = D.querySelector(".crud_form"),
  $title = D.querySelector(".crud_title"),
  $template = D.getElementById("crud_template").content,
  $fragment = document.createDocumentFragment();

async function getCars() {
  try {
    const res = await axios.get("http://localhost:3000/mazda");
    const json = await res.data;

    json.forEach((car) => {
      $template.querySelector(".model").textContent = car.model;
      $template.querySelector(".cost").textContent = car.cost;
      $template.querySelector(".edit").dataset.id = car.id;
      $template.querySelector(".delete").dataset.id = car.id;

      let $clone = D.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $table.appendChild($fragment);
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    $table.insertAdjacentHTML("beforeend",
      `<tr><td><strong>Error ${err.status, message}</strong></td></tr>`
    );
  }
}

async function postCars(data) {
  try {
    const res = await axios.post('http://localhost:3000/mazda', data);
    location.reload()
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    $form.insertAdjacentHTML("beforeend",
      `<span><strong>Error ${err.status, message}</strong></span>`
    );
  }
}

async function putCars(data) {
  try {
    const res = await axios.put(`http://localhost:3000/mazda/${data.id}`, data);
    location.reload();
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
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

async function deleteCars(data) {
  try {
    const res = await axios.delete(`http://localhost:3000/mazda/${data}`);
    location.reload()
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
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

D.addEventListener("DOMContentLoaded", () => {
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