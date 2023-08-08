//JavaScript Alert
alert("Bienvenido a BocaShop, a continuación, se detallan los códigos de productos que desea agregar al carrito:\n1-Camiseta Titular......($14000)\n2-Camiseta Suplente......($13000)\n3-Short Titular Boca...........($9000)\n4-Rompe Viento Boca.........($18000)\n5-Pantalón para entrenar....($12000)\n\nPor favor, lea los códigos de los productos y realice su pedido. Al final, se le devolverá el monto final de su compra.");

//Declaracion de Funciones 
function producto(precio, cantidad) {
    return precio * cantidad;
}

function ingresarCantidad() {
    let numero = false;
    while (!numero) {
        cantidad = parseFloat(prompt("Ingrese la cantidad del producto que desea adquirir:"));
        numero = !isNaN(cantidad);
        if (numero && (cantidad > 0)) {
            return cantidad;
            break;
        } else {
            alert("Ha habido un error al intentar leer la cantidad. Escriba la cantidad en números enteros, por favor.");
        }
    }
}
//declaracion de las variables de productos
const productos = [
    { nombre: "Camiseta Titular", precio: 14000 },
    { nombre: "Camiseta Suplente", precio: 13000 },
    { nombre: "Short Titular Boca", precio: 9000 },
    { nombre: "Rompe Viento Boca", precio: 18000 },
    { nombre: "Pantalón para entrenar", precio: 12000 },
];

let contador1 = 0, contador2 = 0, contador3 = 0, contador4 = 0, contador5 = 0;
let totalCarrito = 0;
let codigoProducto = 0;
let cantidad;

//simulador de carrito
do {
    codigoProducto = parseFloat(prompt("Ingrese el código del producto que desea añadir al carrito. Si ya eligió todos los productos o quiere terminar la compra ingrese el número 0"));
    switch (codigoProducto) {
        case 1:
            cantidad = ingresarCantidad();
            totalCarrito += producto(productos[0].precio, cantidad);
            contador1 += cantidad;
            break;
        case 2:
            cantidad = ingresarCantidad();
            totalCarrito += producto(productos[1].precio, cantidad);
            contador2 += cantidad;
            break;
        case 3:
            cantidad = ingresarCantidad();
            totalCarrito += producto(productos[2].precio, cantidad);
            contador3 += cantidad;
            break;
        case 4:
            cantidad = ingresarCantidad();
            totalCarrito += producto(productos[3].precio, cantidad);
            contador4 += cantidad;
            break;
        case 5:
            cantidad = ingresarCantidad();
            totalCarrito += producto(productos[4].precio, cantidad);
            contador5 += cantidad;
            break;
        case 0:
            alert(`Su factura final:\nCamiseta Titular......${contador1}\nCamiseta Suplente...............${contador2}\nShort Titular Boca....${contador3}\nRompe Viento Boca.........${contador4}\nPantalón para entrenar....${contador5}\n\nEl total de la compra ha sido $${totalCarrito}`);
            break;
        default:
            alert("El código ingresado debe coincidir con algún producto, o si desea salir, recuerde ingresar 0");
    }

} while (codigoProducto != 0);

alert("Gracias por su compra en Boca Shop, Vuelva Pronto");
