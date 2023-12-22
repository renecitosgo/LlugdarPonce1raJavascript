let ingresoInput = document.getElementById("ingresaTuVehículo")
let boton = document.getElementById("seleccionCliente")
let eleccionDelCliente = document.getElementById("eleccion")
let resultadodeBusquedas = document.getElementById("buscaBat")
let historialdeBusquedasBtn = document.getElementById ("historialdeBusquedas")
let mostrarHistorialFlag = false
let arraydeElecciones = []


ingresoInput.addEventListener("keyup", (eventoEnter) => {
    eventoEnter.key === "Enter" ? boton.click() : null  
})

historialdeBusquedasBtn.addEventListener("click", () => {
    mostrarHistorialFlag = true;
    mostrarHistorial();
});


window.onload = () => {
    historialdeBusquedasBtn.addEventListener("click", () => {
        mostrarHistorialFlag = true;
        mostrarHistorial();
    })
    
};

// al mostrar el historial solo lo hace desde la ultia sesion... quisiera que vaya compilando todas las sesiones...!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!







boton.addEventListener("click", () => {
    let valueInput = ingresoInput.value

    if (valueInput.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡No ingresaste ningún valor!",
        });
        
    }else{
        eleccion.innerHTML = valueInput

    let objetoValueInput = {
        vehiculo: valueInput,
        fecha: new Date().toLocaleString()
    }


    arraydeElecciones.push(objetoValueInput)

    
    localStorage.setItem("vehiculo", JSON.stringify(arraydeElecciones))
    ingresoInput.value = ""

    visualizarArraydeElecciones()



    }

    

})






let visualizarArraydeElecciones = () => {
    
    if (arraydeElecciones.length > 0) {
        
        let listaHTML = "<ul>"

            arraydeElecciones.forEach((batx) => {
                listaHTML += `<li>Elegiste esto: ${batx.vehiculo}. La fecha de hoy es: ${batx.fecha}</li>`
        })

        listaHTML += "</ul>"

        eleccionDelCliente.innerHTML = listaHTML

    } else {eleccionDelCliente.innerHTML = "No hay elecciones guardadas."
    }
}




// Buscador



// Modifica tu función de búsqueda para mostrar en tiempo real y guardar en el historial
resultadodeBusquedas.addEventListener("input", () => {
    let stringdeResultadodeBusquedas = resultadodeBusquedas.value.toLowerCase();

    if (stringdeResultadodeBusquedas.trim() === "") {
        document.getElementById("resultadodeBusqueda").innerHTML = "";
        return;
    }

    let bateriasFiltradas = arraydeElecciones.filter(baterfilter => {
        return baterfilter.vehiculo.toLowerCase().includes(stringdeResultadodeBusquedas);
    });

    let resultadosHTML = bateriasFiltradas.length > 0
        ? bateriasFiltradas.map(obj => `<li>Elegiste esto: ${obj.vehiculo}. La fecha de hoy es: ${obj.fecha}</li>`).join("")
        : "No se encontraron coincidencias";

    // Almacena los resultados actuales en sessionStorage
    sessionStorage.setItem("resultadosSesion", JSON.stringify(resultadosHTML));

    document.getElementById("resultadodeBusqueda").innerHTML = resultadosHTML;
});

let mostrarHistorial = () => {
    let traerDatodeLocalS = localStorage.getItem("vehiculo");
    let datosVehiculo = traerDatodeLocalS ? JSON.parse(traerDatodeLocalS) : [];

    let listaHTML = "<ul>";

    if (datosVehiculo.length > 0) {
        datosVehiculo.forEach((batx) => {
            listaHTML += `<li>Elegiste esto (Historial): ${batx.vehiculo}. La fecha de hoy es: ${batx.fecha}</li>`;
        });
    }

    listaHTML += "</ul>";

    eleccionDelCliente.innerHTML = listaHTML;
}

// -----------------------------------------API del CLIMA--------------------------------------------------------
// ---Trabajo creando elementos y los agrego al DOM sin necesidad de colocar código directamente en el HTML-----

const climaApi = "miClimaId"
const apiKey = "fd5687836016bc12b1864d32093f176d"

let divClima = document.createElement("div")
divClima.id = climaApi

let inputBusqueda = document.createElement("input")
inputBusqueda.type = "text"
inputBusqueda.placeholder = "Escribe tu ciudad"

let botonClima = document.createElement("input")
botonClima.type = "button"
botonClima.value = "Vel Clima"

let resultadosdelClima = document.createElement("div")



divClima.appendChild(inputBusqueda)
divClima.appendChild(botonClima)
divClima.appendChild(resultadosdelClima)

document.body.appendChild(divClima)




botonClima.addEventListener("click", ()=>{

    let ciudad = inputBusqueda.value

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=${1}&appid=${apiKey}`)
        .then(respClima => respClima.json())
        .then(datosdeApi=>{
            let lat = datosdeApi[0].lat
            let lon = datosdeApi[0].lon
            obtenerClima(lat, lon, ciudad)
        })
        .catch(error =>{
            console.error("error al obtener datos del clima:", error)
        })
})


function obtenerClima(lat, lon, ciudad){
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}`)
    .then(respClima=> respClima.json())
    .then(datosdeApi=>{
        console.log(datosdeApi)
        let temperatura = datosdeApi.current.temp
        let descripciones = datosdeApi.current.weather.map(tiempoDevuelto => tiempoDevuelto.description)
        resultadosdelClima.textContent = `La temperatura actual en ${ciudad} es: ${temperatura} Grados. Las condiciones climaticas son: ${descripciones.join(',')} `
    })
    .catch(error=>{
        console.error("error al obtener datos del clima", error)
    })
}


















