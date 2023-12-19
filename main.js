let ingresoInput = document.getElementById("ingresaTuVehículo")
let boton = document.getElementById("seleccionCliente")
let eleccionDelCliente = document.getElementById("eleccion")
let elementoLeyenda = document.getElementById("leyenda")
let resultadodeBusquedas = document.getElementById("buscaBat")
let arraydeElecciones = []

ingresoInput.addEventListener("keyup", (eventoEnter) => {
    eventoEnter.key === "Enter" ? boton.click() : null
})

window.onload = () => {
    let traerDatodeLocalS = localStorage.getItem("vehiculo")
    let datosVehiculo = traerDatodeLocalS ? JSON.parse(traerDatodeLocalS) : []

    
    arraydeElecciones = datosVehiculo.concat(arraydeElecciones)

    eleccionDelCliente.innerHTML = datosVehiculo.length > 0
        ? datosVehiculo.map(obj => `Elegiste esto: ${obj.vehiculo}. La fecha de hoy es: ${obj.fecha} Esto es traído del localStorage`).join("<br/> ")
        : "No hay cadenas de texto guardadas en localStorage"
}

boton.addEventListener("click", () => {
    let valueInput = ingresoInput.value
    eleccion.innerHTML = valueInput

    let objetoValueInput = {
        vehiculo: valueInput,
        fecha: new Date().toLocaleString()
    }


    arraydeElecciones.push(objetoValueInput)

    elementoLeyenda.innerHTML = ""

    localStorage.setItem("vehiculo", JSON.stringify(arraydeElecciones))
    ingresoInput.value = ""

    visualizarArraydeElecciones()
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

    document.getElementById("resultadodeBusqueda").innerHTML = resultadosHTML
})