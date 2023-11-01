/*
++ Declaro las variables maxIntentos y errorIngreso para controlar el ingreso.
++ Declaro la variable personname sin asignar valor pues pretendo que el usuario lo haga mediante prompt. Quiero que tenga alcance global pues quiero llamarla luego y si no hago esto no podré por que mi prompt está dentro de mi Bucle For (local)
++Bucle For con condicionales y comillas de acento grave para incrustar variables
++ Control de flujo con Bucle y Break segun sea el caso
++ Reseteo de la Variable
++ Función para la venta
++ Do While para no dar paso de una instancia.
++ Uso de toFixed y conversión de la cadena a Number por resultados inesperados en el Alert con la cantidad de decimales mostrados


--------------------------------------------1ra Entrega Javascrip------------------------------------------------*/

let maxIntentos = 3
let errorIngreso = 0
let personname = ""

for (let intentos = 1; intentos <= maxIntentos; intentos++) {
    personname = prompt ("Ingresa tu nombre").toLowerCase()

    if (personname === null || personname === "") {
        console.log("formato de nombre no reconocido")
        alert(`Formato de nombre no reconocido, intento ${intentos} de ${maxIntentos} 🙂`)
        errorIngreso++;    
    }else{
            alert(`Bienvenido, ${personname}, tienes que tener 18 años o mas para seguir`)
            break
    }
    if(errorIngreso === maxIntentos){
        alert ("Ha agotado la cantidad máxima de intentos, pruebe nuevamente más tarde 👌")
        break
    } 
}

    errorIngreso = 0 

    let ventaRealizada = false
    let precioProducto = 200
    let precioFinal = 0

    for(let intentos = 1; intentos <= maxIntentos; intentos++){
        let edad = parseFloat(prompt("Ingresa tu edad"))

    if (!isNaN(edad) && edad >= 18){

            venderProductos()

            if (ventaRealizada) {
                break;
            }
            
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

    function venderProductos(){
    
        let respuestadeVentaL

        do { respuestadeVentaL = prompt ("¿Estás dispuesto a pagar USD 200 por este producto? Responde si o no.").toLowerCase()
        
        } while (respuestadeVentaL !== "si" && respuestadeVentaL !== "no")

        if(respuestadeVentaL == "si"){

            
            
            let mediodePagoL = prompt("Gracias por tu compra, elije A o B o C según sea tu medio de pago: A [Transferencia 10% de descuento.] B [Tarjeta de Cédito con 10% de Recargo.] C [Contado efectivo es el precio Publicado.]").toUpperCase()

            if(mediodePagoL === "A"){
                precioFinal = Number((precioProducto * 0.90).toFixed(2))
                console.log("Usuario eligió precio A")
                alert("CBU 12341234124 Tienes que transferir: USD " + precioFinal +  " Muchas gracias por tu compra, retirá el producto con el comprobante de transferencia de Calle Arias N°123")
            }

            else if(mediodePagoL === "B"){
                precioFinal = Number((precioProducto * 1.10).toFixed(2))
                console.log("Usuario eligió precio B")
                alert(`Muchas gracias por tu compra, pase por nuestro local de Calle Arias N°123 a abonar con tarjeta de crédito la suma de USD ${precioFinal}`)
            }

            else if(mediodePagoL === "C"){
                precioFinal = precioProducto
                console.log("Usuario eligió precio publicado C")
                alert(`Muchas gracias por tu compra, pase por nuestro local de Calle Arias N°123 a abonar la suma de USD ${precioProducto}`)
            }
            else if(mediodePagoL !=="A" && mediodePagoL !=="B" && mediodePagoL !== "C"){
                console.log("Error. No se eligió un medio de pago")
                alert("Lo siento, la opción elegida no es Válida. Intente nuevamente más tarde")
            }

            ventaRealizada = true 

        }else{
            console.log("El usuario no compró")
            alert("Esperamos que pueda cambiar de opinión, muchas gracias")

            ventaRealizada = true
        }
    }