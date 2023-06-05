import { datosCita, validaInputs } from "../funciones.js";
import {
  namePet,
  date,
  owner,
  phoneNumber,
  hour,
  symptoms,
  form,
} from "../selectores.js";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    namePet.addEventListener("input", datosCita);
    owner.addEventListener("input", datosCita);
    phoneNumber.addEventListener("input", datosCita);
    date.addEventListener("input", datosCita);
    hour.addEventListener("input", datosCita);
    symptoms.addEventListener("input", datosCita);
    //Formulario para nuevas citas
    form.addEventListener("submit", validaInputs);
  }
}
export default App;
