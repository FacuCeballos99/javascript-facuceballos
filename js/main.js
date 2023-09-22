// llenado de productos en carrito
const main_productos=document.getElementById("main_productos");

const llenarMainProductos=(arr)=>{
    arr.forEach((el)=>{
        const {imagen,nombre,precio}=el;
        main_productos.innerHTML+=`
        <section class="producto col-5 col-lg-3 m-2 my-lg-3 mx-lg-2 d-flex flex-column align-items-center">
            <img src="../img/products/${imagen}">
            <h3>${nombre}</h3>
            <h3><b>$${precio}</b></h3>
            <button type="button" name="comprar" class="btnComprar">Comprar</button>
        </section>
        `;
    }
    );
}

//buscador de productos
const buscador=document.getElementById("buscador");

function filtrarproducto(arr, filtro) {
    
    const filtroEnMinuscula = filtro.toLowerCase();

    const filtrado = arr.filter((el) => {
        const{nombre}=el;
        const nombreEnMinuscula = nombre.toLowerCase();
        return nombreEnMinuscula.includes(filtroEnMinuscula);
    });
    return filtrado;
}

const getMostrarSS=()=>{
    return  sessionStorage.getItem("mostrar");
}

const removeMostrarSS=()=>{
    sessionStorage.removeItem("mostrar");
}

let mostrar=getMostrarSS();

fetch('../data/productos.json')
  .then(response => response.json())
  .then(data =>
    console.log(data)
    );
















    




