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
// declaracion de los productos con sus codigos
const productosConCodigos = productos.map((producto, indice) => {
    return `${indice + 1}-${producto.nombre}`;
});

//alert con productos disponibles
alert("Productos disponibles:");
productosConCodigos.forEach(producto => {
    alert(producto);
});


let contador1 = 0, contador2 = 0, contador3 = 0, contador4 = 0, contador5 = 0;
let totalCarrito = 0;
let codigoProducto = 0;
let cantidad;

//simulador de carrito
do {
    codigoProducto = parseFloat(prompt("Ingrese el código del producto que desea añadir al carrito. Si ya eligió todos los productos o quiere terminar la compra ingrese el número 0"));
    
    if (codigoProducto >= 1 && codigoProducto <= productos.length) {
        cantidad = ingresarCantidad();
        const indiceProducto = codigoProducto - 1;
        const productoElegido = productos[indiceProducto];

        totalCarrito += producto(productoElegido.precio, cantidad);
        switch (codigoProducto) {
            case 1:
                contador1 += cantidad;
                break;
            case 2:
                contador2 += cantidad;
                break;
            case 3:
                contador3 += cantidad;
                break;
            case 4:
                contador4 += cantidad;
                break;
            case 5:
                contador5 += cantidad;
                break;
        }
        alert(`Seleccionaste ${cantidad} ${productoElegido.nombre}`);
    } else if (codigoProducto === 0) {
    } else {
        alert("El código ingresado debe coincidir con algún producto, o si desea salir, recuerde ingresar 0");
    }

} while (codigoProducto !== 0);

const productosLlevados = [
    { nombre: "Camiseta Titular", cantidad: contador1, precio: productos[0].precio * contador1 },
    { nombre: "Camiseta Suplente", cantidad: contador2, precio: productos[1].precio * contador2 },
    { nombre: "Short Titular Boca", cantidad: contador3, precio: productos[2].precio * contador3 },
    { nombre: "Rompe Viento Boca", cantidad: contador4, precio: productos[3].precio * contador4 },
    { nombre: "Pantalón para entrenar", cantidad: contador5, precio: productos[4].precio * contador5 }
];

// Productos llevados
alert("Productos llevados:");
productosLlevados.forEach(producto => {
    if (producto.cantidad > 0) {
        alert(`${producto.cantidad} x ${producto.nombre} - Precio: $${producto.precio}`);
    }
});

// Calculo del total
const totalCarritoFinal = productosLlevados.reduce((total, producto) => total + producto.precio, 0);

// Total del carrito
alert(`Total del carrito: $${totalCarritoFinal}`);

//Mensaje de despedida
alert("Gracias por su compra en Boca Shop, Vuelva Pronto");
