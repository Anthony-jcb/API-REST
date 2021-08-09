const D = document,
  $table = D.querySelector(".crud_table tbody"),
  $form = D.querySelector(".crud_form"),
  $title = D.querySelector(".crud_title"),
  $template = D.getElementById("crud_template").content,
  $fragment = document.createDocumentFragment();


async function ajax(options) {
  const { method, url, data, success, error } = options;
  try {
    const request = new Request(
      url,
      {
        method: method || 'GET',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })

    let res = await fetch(request);
    let json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText }
    success(json);
  } catch (err) {
    error(`Error ${err.status} ${err.statusText}`);
  }
}

function getCars() {
  ajax({
    url: 'http://localhost:3000/lamborghini',
    success: (cars) => {
      cars.forEach((car) => {
        $template.querySelector(".model").textContent = car.model;
        $template.querySelector(".cost").textContent = car.cost;
        $template.querySelector(".edit").dataset.id = car.id;
        $template.querySelector(".delete").dataset.id = car.id;

        let $clone = D.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $table.appendChild($fragment);
    },
    error: (error) => {
      $table.insertAdjacentHTML("afterend", `<p><b>${error}</b></p>`);
    }
  })
}

D.addEventListener('DOMContentLoaded', () => {
  getCars();
})