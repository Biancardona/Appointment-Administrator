const namePet = document.querySelector("#mascota");
const owner = document.querySelector("#propietario");
const phoneNumber = document.querySelector("#telefono");
const date = document.querySelector("#fecha");
const hour = document.querySelector("#hora");
const symptoms = document.querySelector("#sintomas");
const form = document.querySelector("#nueva-cita");
const citasContainer = document.querySelector("#citas");
const sp2 = document.querySelector("#contenido");
const sp1 = document.querySelector(".container");
let edicion;

form.addEventListener("submit", validaInputs);
listeners();
function listeners() {
  namePet.addEventListener("input", datosCita);
  owner.addEventListener("input", datosCita);
  phoneNumber.addEventListener("input", datosCita);
  date.addEventListener("input", datosCita);
  hour.addEventListener("input", datosCita);
  symptoms.addEventListener("input", datosCita);
}

//Al ir escribiendo en los inputs, se ira llenando este objeto.
//En el HTML se debe tener un atributo "name" que el valor coincida con el key del objeto:
const campos = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};
function datosCita(e) {
  //Se accede al atributo name (con los corchetes) y se le asigna el valor
  //de lo que se va escribiendo en cada campo
  campos[e.target.name] = e.target.value;
}
/*** CLASES ***/
//Agregar citas, editarlas o borrarlas
class Appointments {
  constructor() {
    this.data = [];
  }
  //Metodo para almacenar los datos
  newAppointment(elem) {
    this.data = [...this.data, elem];
    console.log(this.data);
  }
  deleteAppointment(id) {
    //filter retorna un nuevo array con los elementos que cumplan la condicion
    //Todos los elementos que no coincian con el id seleccionado
    const appointmentDeleted = this.data.filter((elem) => {
      elem.id !== id;
    });
    this.data = [...appointmentDeleted];
    console.log(this.data);
  }
  editAppointment(camposActualizados) {
    //Usar metodo .map
    //Recorre el arreglo y map crea el nuevo arreglo que se asignara a campos
    //Cuando el id del arreglo que se esta editando sea el mismo que el de la cita aactualizada
    //Compara los campos del arreglo y si hay un id que es igual actializa el array, sino retorna
    //el anterior array
    this.data = this.data.map((elem) =>
      elem.id === camposActualizados.id ? camposActualizados : elem
    );

    //The spread operator expands an iterable object into the list of arguments
  }
}
//Todo lo que se imprime, eliminar elementos, parte visual
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

/*** INSTANCIANDO LAS CLASES ***/
const appointments = new Appointments();
const ui = new UI();

function validaInputs(e) {
  e.preventDefault();
  //Extraer la info del objeto campos
  //DESTRUCTURING
  const { mascota, propietario, telefono, fecha, hora, sintomas } = campos;

  //VALIDACION
  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.mostrarAlerta("Se detecto un campo vacio, intenta de nuevo", "error");
    validarPhone();
    return;
  }

  validarPhone();

  if (!validarPhone(telefono)) {
    ui.mostrarAlerta("Formato de telefono erroneo", "error");

    return;
  }
  //la variable edicion se hace true cuando se da click en el boton de guardar cambios despues de haber entrado al modo edicion;
  if (edicion) {
    //Pasar el objeto a Edicion
    appointments.editAppointment({ ...campos });
    ui.mostrarAlerta("Editado correctamente");
    form.querySelector("button[type=submit]").textContent = "Guardar Cita";
    //Desabilitar el mopdo edicion
    edicion = false;
    console.log("esta en modo edicion");
  } else {
    //Sino, solo se dio click en el boton de crear cita
    //GENERAR ID UNICO PARA CADA ENTRADA
    campos.id = Date.now();
    //Como el objeto campos es un objeto que esta de manera global, se reescriben los valores
    //Cada vez que se agrega un campo ---->  appointments.newAppointment(campos);

    //Para evitar que se reescriban los valores se tiene que instanciar una copia
    //del objeto, no se pasa la referencia completa de todo el objeto
    //SPREAD OPERATOR.-> Evita que se modifique el valor global, pudiendo acceder a la copia
    appointments.newAppointment({ ...campos });
    ui.mostrarAlerta("Guardado correctamente");
    console.log("nueva cita");
  }

  reiniciarObjeto();
  //appointments contiene el arreglo que se pasará al metodo para mostrar el HTML
  ui.mostrarCita(appointments);
}

function validarPhone(phone) {
  const regex = /^\d{10}$/;
  const phoneno = regex.test(phone);
  console.log(phoneno);
  return phoneno;
}

//Se quedan guardados los valores a pesar de que se borren de pantalla, entonces cada vez que se da click en crear cita
//Tambien se debe limpiar el objeto para que marque error si no hay nada en pantalla
function reiniciarObjeto() {
  campos.mascota = "";
  campos.propietario = "";
  campos.telefono = "";
  campos.fecha = "";
  campos.hora = "";
  campos.sintomas = "";
  //Para borrar los campos
  form.reset();
}

function borrarCita(id) {
  //Eliminar los gastos del objeto con el metodo deleteAppointments que esta en la clase principal
  appointments.deleteAppointment(id);

  //Mensaje de Eliminado Correctamente
  ui.mostrarAlerta("Cita Eliminada Correctamente");

  //Eliminar los gastos del HTML
  //Pasa el metodo de mostrar cita con la instancia de appointments que  ya trae todo el objeto como referencia
  ui.mostrarCita(appointments);
}

function editarCita(elem) {
  //DESTRUCTURING DEL OBJETO

  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = elem;

  //Pasar los valores a los INPUTS
  namePet.value = mascota;
  owner.value = propietario;
  phoneNumber.value = telefono;
  date.value = fecha;
  hour.value = hora;
  symptoms.value = sintomas;

  //Al objeto pasarle los valores tmabien
  campos.mascota = mascota;
  campos.propietario = propietario;
  campos.telefono = telefono;
  campos.fecha = fecha;
  campos.hora = hora;
  campos.sintomas = sintomas;
  campos.id = id;

  //Modificar el boton de crear cita a -> "Guardar Cambios"

  form.querySelector("button[type=submit]").textContent = "Guardar Cambios";
  edicion = true;

  console.log(elem);
}
