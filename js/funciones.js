import Appointments from "./classes/Appointments.js";
import UI from "./classes/ui.js";
import {
  namePet,
  owner,
  phoneNumber,
  date,
  hour,
  symptoms,
  form,
} from "./selectores.js";

/*** INSTANCIANDO LAS CLASES ***/
const appointments = new Appointments();
const ui = new UI();

let edicion;

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

export function datosCita(e) {
  //Se accede al atributo name (con los corchetes) y se le asigna el valor
  //de lo que se va escribiendo en cada campo
  campos[e.target.name] = e.target.value;
}
export function validaInputs(e) {
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

export function validarPhone(phone) {
  const regex = /^\d{10}$/;
  const phoneno = regex.test(phone);
  console.log(phoneno);
  return phoneno;
}

//Se quedan guardados los valores a pesar de que se borren de pantalla, entonces cada vez que se da click en crear cita
//Tambien se debe limpiar el objeto para que marque error si no hay nada en pantalla
export function reiniciarObjeto() {
  campos.mascota = "";
  campos.propietario = "";
  campos.telefono = "";
  campos.fecha = "";
  campos.hora = "";
  campos.sintomas = "";
  //Para borrar los campos
  form.reset();
}

export function borrarCita(id) {
  //Eliminar los gastos del objeto con el metodo deleteAppointments que esta en la clase principal
  appointments.deleteAppointment(id);

  //Mensaje de Eliminado Correctamente
  ui.mostrarAlerta("Cita Eliminada Correctamente");

  //Eliminar los gastos del HTML
  //Pasa el metodo de mostrar cita con la instancia de appointments que  ya trae todo el objeto como referencia
  ui.mostrarCita(appointments);
}

export function editarCita(elem) {
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
