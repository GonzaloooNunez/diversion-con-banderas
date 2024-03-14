const listaPaises = document.getElementById("contenedor");
const infoPais = document.createElement("div");
infoPais.id = "infoPais";
document.body.appendChild(infoPais);

document.addEventListener("DOMContentLoaded", function () {
  obtenerInfoPaises();
});

const obtenerInfoPaises = async () => {
  try {
    const response = await fetch(`https://restcountries.com/v3/all`);
    if (!response.ok) {
      throw new Error("Ha surgido un error", response.status);
    }
    const data = await response.json();
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    data.forEach((pais) => {
      let liPaises = document.createElement("li");
      let divImagen = document.createElement("div");
      divImagen.className = "image-box";
      let imagenes = document.createElement(`img`);
      let rutaImagen = pais.flags[0];
      imagenes.src = rutaImagen;
      let nameDOM = document.createElement("p");
      let nameText = document.createTextNode(pais.name.common);
      nameDOM.appendChild(nameText);
      divImagen.appendChild(imagenes);
      liPaises.appendChild(divImagen);
      divImagen.appendChild(nameDOM);
      listaPaises.appendChild(liPaises);

      divImagen.addEventListener("click", function () {
        let imagenPais = document.createElement("img");
        imagenPais.src = rutaImagen;

        infoPais.innerHTML =
          `<strong>${pais.name.common}</strong>` +
          "<br>" +
          "<br>" +
          "<strong>Capital: </strong>" +
          pais.capital +
          "<br>" +
          "<strong>Población: </strong>" +
          pais.population +
          "<br>" +
          "<strong> Lado de la carretera: </strong>" +
          pais.car.side;
        let botonCerrar = document.createElement("button");
        botonCerrar.textContent = "Cerrar";
        botonCerrar.addEventListener("click", function () {
          infoPais.classList.remove("mostrar");
        });
        infoPais.appendChild(imagenPais);
        infoPais.appendChild(botonCerrar);
        infoPais.classList.add("mostrar");
      });
    });
  } catch (error) {
    console.log("Error al obtener los datos", error);
  }
};

obtenerInfoPaises();
