import { editarCita, borrarCita } from "../funciones.js";
import { citasContainer, sp1, sp2 } from "../selectores.js";

class UI {
  //Pasar el objeto que se usa en appontments, que es la referencia del objeto
  mostrarCita({ data }) {
    this.limpiarHTML();
    //Iterar sobre el arreglo
    data.forEach((elem) => {
      //Dentro de la iteracion, destructurar el ojeto, agregar el id
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        elem;

      const divElem = document.createElement("DIV");
      divElem.classList.add("cita", "p-3");
      divElem.dataset.id = id;

      //Scripting de los elementos de las citas
      const mascotaDiv = document.createElement("h2");
      mascotaDiv.classList.add("card-title", "font-weight-bolder");
      mascotaDiv.textContent = mascota;

      const propietarioDiv = document.createElement("p");
      propietarioDiv.innerHTML = `<span class = "font-weight-bolder"> Propietario: </span>${propietario}`;
      const telefonoDiv = document.createElement("p");
      telefonoDiv.innerHTML = `<span class = "font-weight-bolder"> Telefono: </span>${telefono}`;
      const fechaDiv = document.createElement("p");
      fechaDiv.innerHTML = `<span class = "font-weight-bolder"> Fecha: </span>${fecha}`;
      const horaDiv = document.createElement("p");
      horaDiv.innerHTML = `<span class = "font-weight-bolder"> Hora: </span>${hora}`;
      const sintomasDiv = document.createElement("p");
      sintomasDiv.innerHTML = `<span class = "font-weight-bolder"> Sintomas: </span>${sintomas}`;
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
`;
      const btnEditar = document.createElement("button");
      btnEditar.classList.add("btn", "btn-info");
      btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>

`;
      btnEditar.onclick = () => {
        //Se podran editar todos los elementos entonces se pasa todo lo que conforma el objeto, en la desustructuracion
        editarCita(elem);
        console.log(elem);
      };

      btnEliminar.onclick = () => {
        borrarCita(id);
      };

      //Agregar parrafos
      divElem.appendChild(mascotaDiv);
      divElem.appendChild(propietarioDiv);
      divElem.appendChild(telefonoDiv);
      divElem.appendChild(fechaDiv);
      divElem.appendChild(horaDiv);
      divElem.appendChild(sintomasDiv);
      divElem.appendChild(btnEliminar);
      divElem.appendChild(btnEditar);

      //Agregar al contenedor HTML
      citasContainer.appendChild(divElem);
    });

    //Insertar el objeto en el HTML
  }

  mostrarAlerta(mensaje, tipo) {
    const error = document.createElement("DIV");
    error.classList.add("text-center", "alert", "d-block", "col-12");
    //Agregar clase em base al tipo
    if (tipo === "error") {
      error.classList.add("alert-danger");
    } else {
      error.classList.add("alert-success");
    }
    error.textContent = mensaje;

    sp1.insertBefore(error, sp2);
    setTimeout(() => {
      error.remove();
    }, 2000);
  }

  limpiarHTML() {
    while (citasContainer.firstChild) {
      citasContainer.removeChild(citasContainer.firstChild);
    }
  }
}
export default UI;
