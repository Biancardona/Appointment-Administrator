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
export default Appointments;
