// ActualizarLS
const actualizarLS = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Llenado de productos en carrito
const main_productos = document.getElementById("main_productos");

const llenarMainProductos = (arr) => {
    main_productos.innerHTML = "";
    arr.forEach((el) => {
        const { imagen, nombre, precio } = el;
        main_productos.innerHTML += `
        <section class="producto col-5 col-lg-3 m-2 my-lg-3 mx-lg-2 d-flex flex-column align-items-center">
            <img src="../img/products/${imagen}">
            <h3 class="nombre">${nombre}</h3>
            <h3><b>$${precio}</b></h3>
            <button type="button" name="comprar" class="btnComprar">Comprar</button>
        </section>
        `;
    });
}

// Buscador de productos
const buscador = document.getElementById("buscador");

function filtrarProducto(arr, filtro) {

    const filtroEnMinuscula = filtro.toLowerCase();
    
    const filtrado = arr.filter((el) => {
        const { nombre } = el;
        const nombreEnMinuscula = nombre.toLowerCase();
        return nombreEnMinuscula.includes(filtroEnMinuscula);
    });
    return filtrado;
}

const getMostrarSS = () => {
    return sessionStorage.getItem("mostrar");
}

const removeMostrar = () => {
    sessionStorage.removeItem("mostrar");
}

let mostrar = getMostrarSS();
let productos;

const fetchData = async () => {
    try {
        const res = await fetch("../data/products.json");
        if (!res.ok) {
            throw new Error("Error al obtener los datos.");
        }
        productos = await res.json();
        llenarMainProductos(productos);
    } catch (error) {
        console.error(error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    if (mostrar) {
        buscador.value = mostrar;
        const filtrado = filtrarProducto(productos, mostrar);
        llenarMainProductos(filtrado);
    }
});

// Filtrado de productos
buscador.addEventListener("input", (e) => {
    const filtro = e.target.value;
    const filtrado = filtrarProducto(productos, filtro);
    llenarMainProductos(filtrado);
});

const search = document.getElementById("search");
search.addEventListener("click", () => {
    buscador.style.display = buscador.style.display === "block" ? "none" : "block";
});

// Obtener el carrito del localStorage y llenado
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const cuerpoCarrito = document.getElementById("carrito");
const contadorCarrito = document.getElementById("contadorCarrito");

const actualizarContador = () => {
    contadorCarrito.innerHTML = carrito.length;
};

const llenarCarrito = (arr, html) => {
    html.innerHTML = ""; 
    arr.forEach((element) => {
        const { codigo, imagen, precio, nombre, cantidad } = element;
        const total = precio * cantidad;
        html.innerHTML += `
        <div class="producto mb-3 d-flex justify-content-between align-items-center">
            <img class="col-3" src="../img/products/${imagen}">
            <div class="col-5">
                <h4>${nombre}</h4>
                <div class="d-flex">
                    <div class="modificarCant" id="restar" onClick="restarCant(${codigo})"><h5>-</h5></div>
                    <input type="text" name="cantidad" id="cantidad" readonly value="${cantidad}">
                    <div class="modificarCant" id="sumar" onClick="sumarCant(${codigo})"><h5>+</h5></div>
                </div>
            </div>
            <div class=" d-flex flex-column align-items-end">
                <button type="button" name="eliminar" id="eliminar" onClick="eliminarProducto(${codigo})">
                    <svg class="mb-1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="trash">
                        <path d="M31,8c0-1.654-1.346-3-3-3h-4.382l-1.724-3.447C21.725,1.214,21.379,1,21,1H11c-0.379,0-0.725,0.214-0.895,0.553L8.382,5H4C2.346,5,1,6.346,1,8c0,1.302,0.839,2.402,2,2.816V28c0,1.654,1.346,3,3,3h20c1.654,0,3-1.346,3-3V10.816C30.161,10.402,31,9.302,31,8z M11.618,3h8.764l1,2H10.618L11.618,3z M27,28c0,0.551-0.448,1-1,1H6c-0.552,0-1-0.449-1-1V11h22V28z M28,9H4C3.448,9,3,8.551,3,8s0.448-1,1-1h24c0.552,0,1,0.449,1,1S28.552,9,28,9z"></path><path d="M16 27c.553 0 1-.448 1-1V14c0-.552-.447-1-1-1s-1 .448-1 1v12C15 26.552 15.447 27 16 27zM22 27c.553 0 1-.448 1-1V14c0-.552-.447-1-1-1s-1 .448-1 1v12C21 26.552 21.447 27 22 27zM10 27c.553 0 1-.448 1-1V14c0-.552-.447-1-1-1s-1 .448-1 1v12C9 26.552 9.447 27 10 27z"></path>
                    </svg>
                </button>
                <h4 class="mt-3">$${total}</h4>
            </div>
        </div>
        `;
    });
}

const calcularTotal = (arr, html) => {
    let sumatoria = arr.reduce((total, element) => total + element.precio * element.cantidad, 0);
    html.innerHTML += `
    <h3>Total: $${sumatoria}</h3>
    <button class="w-100" type="button" name="pagar" id="btnPagar" onClick="pagar()">Pagar</button>
    `;
}

if (carrito.length === 0) {
    cuerpoCarrito.innerHTML = `
    <p>
        No hay productos en el carrito
    </p>
    `;
} else {
    llenarCarrito(carrito, cuerpoCarrito);
    calcularTotal(carrito, cuerpoCarrito);
    actualizarContador();
}

document.addEventListener("DOMContentLoaded", function () {
    // Botón comprar
    const obtenerLS = () => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    const actualizarLS = () => {
        obtenerLS();
        cuerpoCarrito.innerHTML = "";
        llenarCarrito(carrito, cuerpoCarrito);
        calcularTotal(carrito, cuerpoCarrito);
    }

    fetch("../data/products.json")
        .then(response => response.json())
        .then(data => {
            const productos = data;
            const comprar = document.querySelectorAll(".btnComprar");

            comprar.forEach((element, index) => {
                element.addEventListener("click", () => {
                    const { nombre, imagen } = productos[index];
                    const buscado = nombre;

                    const filtrado = carrito.filter((elem) => elem.nombre === buscado);

                    if (filtrado.length === 0) {
                        productos[index].cantidad = 1;
                        carrito.push(productos[index]);
                        actualizarContador();
                        actualizarLS();

                        Swal.fire({
                            position: 'top-end',
                            imageUrl: `../img/products/${imagen}`,
                            imageHeight: 100,
                            imageAlt: `Compro ${nombre}`,
                            title: `${nombre}`,
                            text: 'Se añadió a su carrito',
                            showConfirmButton: false,
                            timer: 1500,
                            width: '20rem',
                        });
                    } else {
                        carrito.forEach((element) => {
                            if (element.nombre === buscado) {
                                element.cantidad++;
                                actualizarLS();

                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 1500,
                                });

                                Toast.fire({
                                    icon: 'success',
                                    title: `Añadiste otro ${nombre} al carrito`,
                                });
                            }
                        });
                    }
                });
            });
        });
});


function eliminarProducto(elem) {
    const index = carrito.findIndex((element) => element.codigo === elem);

    if (index !== -1) {
        const { nombre } = carrito[index];

        Swal.fire({
            title: `¿Eliminar ${nombre} del carrito?`,
            text: "Eliminarás este producto del carrito",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(5, 15, 160)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito.splice(index, 1);
                actualizarContador();
                actualizarLS();
                llenarCarrito(carrito, cuerpoCarrito); 
            
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                });
            
                Toast.fire({
                    icon: 'error',
                    title: `${nombre} eliminado del carrito`
                });
            
                if (carrito.length === 0) {
                    cuerpoCarrito.innerHTML = "";
                    cuerpoCarrito.innerHTML = `
                    <p>
                        No hay productos en el carrito
                    </p>
                    `;
                } else {
                    document.getElementById("btnPagar").style.display = "block";
                }
            }
        }
    )}
}

            


// Cambio de cantidad
function restarCant(elem){
    carrito.forEach((element) => {
        const {codigo, cantidad} = element
        if(codigo === elem){
            if(cantidad > 1){
                element.cantidad--;
                actualizarLS();
                llenarCarrito(carrito, cuerpoCarrito);
                calcularTotal(carrito, cuerpoCarrito);
            }
        }
})
}

function sumarCant(elem){
    carrito.forEach((element) => {
        const {codigo} = element
        if(codigo === elem){
            element.cantidad++;
            actualizarLS();
            llenarCarrito(carrito, cuerpoCarrito);
            calcularTotal(carrito, cuerpoCarrito);
        }
})
}

// Boton de pagar
function pagar(){

    Swal.fire({
        title: '¿Desea finalizar la compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'rgb(5, 15, 160)',
        cancelButtonColor: 'rgb(5, 15, 160)',
        cancelButtonText: 'Seguir comprando',
        confirmButtonText: 'Finalizar compra'
}).then((result) => {
    if (result.isConfirmed){

        localStorage.removeItem("carrito");
        contadorCarrito.innerHTML = 0;
        cuerpoCarrito.innerHTML = "";
        cuerpoCarrito.innerHTML = `
        <p>
            No hay productos en el carrito
        </p>
        `;

        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1800,
        })

        Toast.fire({
            icon: 'success',
            title: 'Su compra fue realizada con exito'
        })
    }
})
}

