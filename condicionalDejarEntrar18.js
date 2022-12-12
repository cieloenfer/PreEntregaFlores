
//Control de acceso para mayores de edad//
let edad = prompt ("Ingresa tu edad");

if(edad>=18){
    
    alert("Puedes empezar tu aventura");
}else{
   alert("Debes ser mayor de edad para ingresar");
   
}

if (edad>=18){
let entrada = prompt ("ingresa tu destino de viaje o responde no sé si no lo has elegido");
while(entrada != "ESC") {
    switch (entrada) {
        case "destino1":
            alert("Vamos a viajar a + texto");
            break;
        case "destino2":
            alert();
            break;
    }
}
entrada=prompt("Coloque nombre de destino")
}
else{
    
}

//fin de contrrol de edad //

//lista de tareas para itinerario de viaje //
const formulario = document.querySelector("#formulario");
const tareas = document.querySelector("#tareas");
const total = document.querySelector("#total");
const completadas = document.querySelector("#completadas");
let task = [];
/* EVENTOS */
(() => {
    formulario.addEventListener('submit', validarFormulario);
    tareas.addEventListener("click", eliminarTarea);
    tareas.addEventListener("click", completarTarea);
    document.addEventListener("DOMContentLoaded", () => {
        let datosLS = JSON.parse(localStorage.getItem("tareas")) || [];
        task = datosLS;
        agregarHTML();
    })
})()

/* FUNCIONES */
function validarFormulario(e) {
    e.preventDefault();
    //validar los campos
    const tarea = document.querySelector("#tarea").value;
    if (tarea.trim().length === 0) {
        console.log('vacio');
        return
    }

    //creamos el objeto tarea
    const objTarea = { id: Date.now(), tarea: tarea, estado: false };
    //agregamos al array sin mutar dicho arreglo
    task = [...task, objTarea];
    formulario.reset();

    //agregamos al HTML
    agregarHTML();

}


function agregarHTML() {

    //limpiar el HTML
    while (tareas.firstChild) {
        tareas.removeChild(tareas.firstChild)
    }

    if (task.length > 0) {
        task.forEach(item => {
            const elemento = document.createElement('div');
            elemento.classList.add('item-tarea');
            elemento.innerHTML = `
                <p>${item.estado ? (
                    `<span class='completa'>${item.tarea}</span>`
                ) : (
                    `<span>${item.tarea}</span>`
                )}</p>
                <div class="botones">
                    <button class="eliminar" data-id="${item.id}">x</button>
                    <button class="completada" data-id="${item.id}">?</button>
                </div>
            `
            tareas.appendChild(elemento)
        });

    } else {
        const mensaje = document.createElement("h5");
        mensaje.textContent = "~SIN TAREAS~"
        tareas.appendChild(mensaje)
    }

    let totalTareas = task.length;
    let tareasCompletas = task.filter(item => item.estado === true).length;

    total.textContent = `Total tareas: ${totalTareas}`;
    completadas.textContent = `Tareas Completadas: ${tareasCompletas}`;

    //persistir los datos con localStorage
    localStorage.setItem("tareas", JSON.stringify(task))

}

function eliminarTarea(e) {
    if (e.target.classList.contains("eliminar")) {
        const tareaID = Number(e.target.getAttribute("data-id"));
        //eliminamos con el array method filter
        const nuevasTareas = task.filter((item) => item.id !== tareaID);
        task = nuevasTareas;
        agregarHTML();
    }
}


//completar tarea
function completarTarea(e) {
    if (e.target.classList.contains("completada")) {
        const tareaID = Number(e.target.getAttribute("data-id"));
        const nuevasTareas = task.map(item => {
            if (item.id === tareaID) {
                item.estado = !item.estado;
                return item;
            } else {
                return item
            }
        })

        //editamos el arreglo
        task = nuevasTareas;
        agregarHTML();
    }
}

//fin de lista de tareas//

//Calculadora de viaje//

function limpiar(){
  document.getElementById("alojamiento").value = null;
  document.getElementById("comida").value = null;
  document.getElementById("tourOCircuitos").value = null;
  document.getElementById("transporte").value = null;
  document.getElementById("resultado").value = null;
}

function calcular(){
  
  let resultado;
  let alojamiento = +document.getElementById("alojamiento").value;
  let comida = +document.getElementById("comida").value;
  let tourOCircuitos = +document.getElementById("tourOCircuitos").value;
  let transporte = +document.getElementById("transporte").value;
  
  let operacion = document.getElementById("operacion").value;

  console.log("DATOS A CALCULAR:");
  console.log("alojamiento = " + alojamiento);
  console.log("comida = " + comida);
  console.log("tourOCircuitos = " + tourOCircuitos);
  console.log("transporte = " + transporte);
  console.log("Operación = " + operacion);

  switch(operacion){
      case "+":
          resultado = alojamiento + comida + tourOCircuitos + transporte
          console.log("resultado = " + resultado);
          document.getElementById("resultado").value = resultado;
          break;

      case "-":
          resultado = alojamiento - comida - tourOCircuitos - transporte
          console.log("resultado = " + resultado);
          document.getElementById("resultado").value = resultado;
          break;
  }    
}
  
