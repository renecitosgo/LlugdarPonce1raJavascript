/** Se colocó lo mínimo de CSS.
 * Se vinculó con Bootstrap
 * Se Vinculó con SweetAlert2 mediante Swal.fire.
 * Se integró una Api del Clima intentando ofrecer datos super detallados del clima e iteración sobre las descripciones pero la API no nos permitía usar toda su base de datos GRATUITAMENTE. Entonces nos tuvimos que conformar con lo básico. Temperatura y alguna descripción del tiempo para la ciudad Elegida.
 * Se utilizó Fetch y .catch.
 * Se trabajó creando elementos y los agregandolos al DOM sin necesidad de colocar código directamente en el HTML
 * Se crearon ventos.
 * Se creó un botón de HISTORIAL para recuperar las busquedas anteriores.
 */


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
    mostrarHistorialFlag = true
    mostrarHistorial()
})

window.onload = () => {
    historialdeBusquedasBtn.addEventListener("click", () => {
        mostrarHistorialFlag = true
        mostrarHistorial()
    })  
}

boton.addEventListener("click", () => {
    let valueInput = ingresoInput.value

    if (valueInput.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡No ingresaste ningún valor!",
        })
    } else {
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
    } else {
        eleccionDelCliente.innerHTML = "No hay elecciones guardadas."
    }
}

// Buscador

resultadodeBusquedas.addEventListener("input", () => {
    let stringdeResultadodeBusquedas = resultadodeBusquedas.value.toLowerCase()

    if (stringdeResultadodeBusquedas.trim() === "") {
        document.getElementById("resultadodeBusqueda").innerHTML = ""
        return
    }

    let bateriasFiltradas = arraydeElecciones.filter(baterfilter => {
        return baterfilter.vehiculo.toLowerCase().includes(stringdeResultadodeBusquedas)
    })

    let resultadosHTML = bateriasFiltradas.length > 0
        ? bateriasFiltradas.map(obj => `<li>Elegiste esto: ${obj.vehiculo}. La fecha de hoy es: ${obj.fecha}</li>`).join("")
        : "No se encontraron coincidencias"

    sessionStorage.setItem("resultadosSesion", JSON.stringify(resultadosHTML))

    document.getElementById("resultadodeBusqueda").innerHTML = resultadosHTML
})

// Buscar Hisorial

let mostrarHistorial = () => {
    let traerDatodeLocalS = localStorage.getItem("vehiculo")
    let datosVehiculo = traerDatodeLocalS ? JSON.parse(traerDatodeLocalS) : []

    let listaHTML = "<ul>"

    if (datosVehiculo.length > 0) {
        datosVehiculo.forEach((batx) => {
            listaHTML += `<li>Elegiste esto (Historial): ${batx.vehiculo}. La fecha de hoy es: ${batx.fecha}</li>`
        })
    }

    listaHTML += "</ul>"

    eleccionDelCliente.innerHTML = listaHTML
}

//API del CLIMA con generación del DOM

const climaApi = "miClimaId"
const apiKey = "fd5687836016bc12b1864d32093f176d"

let divClima = document.createElement("div")
divClima.id = climaApi

let inputBusqueda = document.createElement("input")
inputBusqueda.type = "text"
inputBusqueda.placeholder = "Escribe tu ciudad"
inputBusqueda.classList.add("miInputBusqueda")


let botonClima = document.createElement("input")
botonClima.type = "button"
botonClima.value = "Vel Clima"
botonClima.classList.add("miBotonClima")

let resultadosdelClima = document.createElement("div")

divClima.appendChild(inputBusqueda)
divClima.appendChild(botonClima)
divClima.appendChild(resultadosdelClima)

document.body.appendChild(divClima)


botonClima.addEventListener("click", ()=>{

    let ciudad = inputBusqueda.value

    if (!ciudad) {
        Swal.fire({
            title: "Por favor, escribe una ciudad 🤗",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/images/trees.png)",
            backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
            `
        });
    }

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=${1}&appid=${apiKey}`)
        .then(respClima => respClima.json())
        .then(datosdeApi=>{
            if (datosdeApi.length === 0 || !datosdeApi[0]) {
                Swal.fire({
                    title: "Que pasó?",
                    text: "Lo que escribiste no es una ciudad, intenta nuevamente",
                    icon: "question"
                })
            }
            let lat = datosdeApi[0].lat
            let lon = datosdeApi[0].lon
            obtenerClima(lat, lon, ciudad)
        })
        .catch(error =>{
            console.error("error al obtener datos del clima:", error)
        })
})

function obtenerClima(lat, lon, ciudad){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`)
    .then(respClima=> respClima.json())
    .then(datosdeApi=>{
        let temperatura = datosdeApi.main.temp
        let descripciones = datosdeApi.weather.map(tiempoDevuelto => tiempoDevuelto.description)
        resultadosdelClima.textContent = `La temperatura actual en ${ciudad} es: ${temperatura} Grados Celsius. Las condiciones climaticas son: ${descripciones.join(',')} `
    })
    .catch(error=>{
        console.error("error al obtener datos del clima", error)
    })
}

















