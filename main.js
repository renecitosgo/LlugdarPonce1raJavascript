/**Se ha intentado hacer una aplicación que venda Baterías. Todo está orientado a trabajar con ALERT. Se usó:

Clases constructoras para crear (objetos)(arrays)(vinculacion con .this y new) artículos y medios de pago.

Se trabajó con funciones para incrementar precios si la elección del usuario es para pago con Tarjeta de Crédito.

En el caso de que el usuario no quiera pagar con tarjeta se le ofreció otras alternativas. 

Se utilizó: metodos en arrays: .filter .includes .map .forEach .join .find 

 */

class Baterias {
    constructor(marca, modelo, amperaje, precio, vehiculo) {
        this.marca = marca
        this.modelo = modelo
        this.amperaje = amperaje
        this.precio = precio
        this.vehiculo = vehiculo
    }

    aplicarIncrementoTarjeta(numeroPagos) {
        let porcentajeIncremento = 0

        if (numeroPagos === 3) {
        porcentajeIncremento = 0.10
        } else if (numeroPagos === 6) {
        porcentajeIncremento = 0.35
        }

        if (porcentajeIncremento > 0) {
        const incremento = this.precio * porcentajeIncremento
        this.precio += incremento

        alert(`Modalidad de Pago con un ${porcentajeIncremento * 100}% de diferencia.\n El nuevo precio del Producto es: \n $${this.precio.toFixed(2)}`)
        } else {
        alert("Número de pagos no válido. Por favor intente nuevamente más tarde y elija entre 3 o 6 pagos 🙂")
        }
    }
    }

    const baterias1 = new Baterias("moura", "m20gd", 65, 50000, "izusu")
    const baterias2 = new Baterias("moura", "m24kd", 75, 72000, "ford")
    const baterias3 = new Baterias("moura", "m30ld", 85, 9000, "fiat")
    const baterias4 = new Baterias("energizer", "a090ld", 90, 50000, "renault")
    const baterias5 = new Baterias("energizer", "hp100le", 100, 50000, "peugeot")
    const baterias6 = new Baterias("energizer", "hp150bd", 180, 50000, "honda")
    const baterias7 = new Baterias("trifase", "tn12x65", 65, 50000, "volkswagen")
    const baterias8 = new Baterias("trifase", "tn12x75", 75, 50000, "toyota")
    const baterias9 = new Baterias("trifase", "tn12x80", 85, 50000, "chevrolet")

    let listado = [baterias1, baterias2, baterias3, baterias4, baterias5, baterias6, baterias7, baterias8,  baterias9]



    class MediosDePago {
        constructor (nombre, bonificacion){
        this.nombre = nombre
        this.bonificacion = bonificacion
        }
    }
    
    const medio1 = new MediosDePago("Mercado Pago", "Te regalamos una cafetera")
    const medio2 = new MediosDePago("Brubank", "Te regalamos un osito")
    const medio3 = new MediosDePago("Cripto", "Te regalamos una canasta de Pochoclos")
    const medio4 = new MediosDePago("Tether", "Te regalamos una olla a vapor")

    let listaMediosPago = [medio1, medio2, medio3, medio4]

    

const necesitaBateria = confirm("¿Necesitas una batería?");

if (necesitaBateria) {
    let input = prompt("¿Cuál es la marca de tu vehículo?");
    if (input !== null && input !== undefined) {
        input = input.trim().toUpperCase();
        
        let modelosEncontrados = listado.filter((bat) => bat.vehiculo.toUpperCase().includes(input));

        let mensajeModelosEncontrados = "Los modelos de Baterías encontrados para su vehículo son: \n ";

        modelosEncontrados.forEach((bat) => {
            mensajeModelosEncontrados += `\nMarca: ${bat.marca}, Modelo: ${bat.modelo}, Amperaje: ${bat.amperaje}, Precio: $${bat.precio.toFixed(2)}, Vehículo: ${bat.vehiculo}`})
        
        if (modelosEncontrados.length > 0) {
            alert(mensajeModelosEncontrados)

            const opcion = confirm("¿Desea Abonar con tarjeta de crédito?")

            if (opcion) {
                const numeroPagos = prompt("Ingrese el número de pagos (3 o 6):")
                modelosEncontrados.forEach((bat) => bat.aplicarIncrementoTarjeta(parseInt(numeroPagos)));
            } else {
                let medioElegidodePago = prompt(`Tipea el medio de pago elegido😎: \n${listaMediosPago.map(medio => medio.nombre).join("\n")}`)

                if (medioElegidodePago !== null && medioElegidodePago !== undefined) {

                    let medioSeleccionado = listaMediosPago.find((x) => x.nombre.trim().toUpperCase() == medioElegidodePago.trim().toUpperCase());

                    if (medioSeleccionado) {
                        alert(`Muchas gracias por la compra 🙂\n Por operar con ${medioSeleccionado.nombre}\n Ud. Obtiene un presente de la CASA:👏👏\n ${medioSeleccionado.bonificacion}🎊🎇🎆🎀🎊`);
                    } else {
                        alert("Operación no realizada, esperamos que vuelva pronto.💪");
                    }

                } else {
                    alert("Operación cancelada. Gracias y vuelva pronto.💪")
                }
            }
        }
    } 
}






































