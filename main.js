let maxIntentos = 3
let errorIngreso = 0
let personname = ""

for (let intentos = 1; intentos <= maxIntentos; intentos++) {
    personname = prompt ("Ingresa tu nombre").toLowerCase()

    if (personname === null || personname === "") {
      console.log("formato de nombre no reconocido")
        alert(`Formato de nombre no reconocido, intento ${intentos} de ${maxIntentos} 🙂`)
        errorIngreso++

    }else{
            alert(`Bienvenido, ${personname}, tienes que tener 18 años o mas para seguir`)
            break
    }
}
    if(errorIngreso === maxIntentos){
        alert ("Ha agotado la cantidad máxima de intentos, pruebe nuevamente más tarde 👌")
        
    }

    errorIngreso = 0 

    for(let intentos = 1; intentos <= maxIntentos; intentos++){
        let edad = parseFloat(prompt("Ingresa tu edad"))

    if (!isNaN(edad) && edad >= 18){

            venderProductos()  
            
    }else if(!isNaN(edad) && edad < 18) {
            alert(`Lo siento, ${personname}, debes tener al menos 18 años para comprar productos.`)
            break
    }else{
            alert("La edad ingresada no es válida.")
            errorIngreso++
    }
    if (errorIngreso === maxIntentos){
      alert ("Ha agotado la cantidad máxima de intentos, pruebe nuevamente mas tarde 👌")
        break
    }
    }
    
    let producto1 = notebook 
    let producto2 = monitor
    let producto3 = gabinete

    function venderProductos(){
      let productoElegido = prompt("escribe la opción que deseas comprar entre: notebook, monitor o gabinete")
  }