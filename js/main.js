//productos de la tienda
const producto = [{
    codigo:1,
    nombre:"Camiseta Titular",
    imagen:"camisetatitular.png",
    cantidad:10,
    precio:24000,
},{
    codigo:2,
    nombre:"Camiseta Alternativa",
    imagen:"camisetasuplente.png",
    cantidad:8,
    precio:24000,
},{
    codigo:3,
    nombre:"Pantalon Entreno",
    imagen:"pantalonentreno.png",
    cantidad:5,
    precio:15000,
},
{
    codigo:4,
    nombre:"Rompe Vientos",
    imagen:"rompeviento.png",
    cantidad:7,
    precio:18000,
},
{
    codigo:5,
    nombre:"Short Titular",
    imagen:"shorttitular.png",
    precio:8000,
},
{
    codigo:6,
    nombre:"Short Alternativo",
    imagen:"shortsuplente.png",
    precio:10000,
}];
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const cuerpoCarrito=document.getElementById("carrito");

const llenarCarrito=(arr,html)=>{
    arr.forEach((element)=>{
        let precio=element.precio*element.cantidad;
        html.innerHTML+=`
        <div class="producto mb-3 d-flex justify-content-between align-items-center">
        <img class="col-3" src="../img/products/${element.imagen}" alt="">
        <div class="col-5">
            <h4>${element.nombre}</h4>
            <div class="d-flex">
            <div class="modificarCant" id="restar" onClick="retarCant(${element.codigo})"><h5>-</h5></div>
            <input type="text" name="cantidad" id="cantidad" readonly value="${element.cantidad}">
            <div class="modificarCant" id="sumar" onClick="sumarCant(${element.codigo})"><h5>+</h5></div>
            </div>
        </div>
        <div class="d-flex flex-column align-items-end">
        <button type="button" name="eliminar" id="eliminar" onClick="eliminarProducto(${element.codigo})">
           <svg class="mb-1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="trash">
                <path d="M31,8c0-1.654-1.346-3-3-3h-4.382l-1.724-3.447C21.725,1.214,21.379,1,21,1H11c-0.379,0-0.725,0.214-0.895,0.553L8.382,5H4C2.346,5,1,6.346,1,8c0,1.302,0.839,2.402,2,2.816V28c0,1.654,1.346,3,3,3h20c1.654,0,3-1.346,3-3V10.816C30.161,10.402,31,9.302,31,8z M11.618,3h8.764l1,2H10.618L11.618,3z M27,28c0,0.551-0.448,1-1,1H6c-0.552,0-1-0.449-1-1V11h22V28z M28,9H4C3.448,9,3,8.551,3,8s0.448-1,1-1h24c0.552,0,1,0.449,1,1S28.552,9,28,9z"></path><path d="M16 27c.553 0 1-.448 1-1V14c0-.552-.447-1-1-1s-1 .448-1 1v12C15 26.552 15.447 27 16 27zM22 27c.553 0 1-.448 1-1V14c0-.552-.447-1-1-1s-1 .448-1 1v12C21 26.552 21.447 27 22 27zM10 27c.553 0 1-.448 1-1V14c0-.552-.447-1-1-1s-1 .448-1 1v12C9 26.552 9.447 27 10 27z"></path>
            </svg>
        </button>
        <h4 class="mt-3">$${precio}</h4>
        </div>
        </div>
        `;
})
}

const total=(arr,html)=>{
    let sumatoria=arr.reduce((total,element) => total + element.precio*element.cantidad,0);
    html.innerHTML+=`
    <h3> Total: $${sumatoria}</h3>
    <button class="w-100" type="button" name="pagar" id="btnPagar" onClick="pagar()">Pagar</button>
    `;
}

if(carrito.length === 0){
    cuerpoCarrito.innerHTML+=`
    <p>No hay productos en el carrito</p>
    `;
}else{
    llenarCarrito(carrito,cuerpoCarrito);
    total(carrito,cuerpoCarrito);
}

//llenado de productos en html.
const main_producto=document.getElementById("main_productos");
let todosProductos= [];


const llenarProductos=(arr,html)=>{
    arr.forEach((element)=>{
        html.innerHTML+=`
        <div class="producto mb-3">
        <img src="../img/products/${element.imagen}" alt="">
        <h4 class="nombre">${element.nombre}</h4>
        <h4>$${element.precio}</h4>
        <button class="btnComprar" type="button" name="comprar" id="comprar">Comprar</button>
        </div>
        `;
    })
}
 let mostrarProductos=producto;
    llenarProductos(mostrarProductos,main_producto);
    todosProductos=producto;

    // boton comprar
    const comprar=document.querySelectorAll(".btnComprar");
    const encontrarProducto=document.querySelectorAll(".producto");
    const obtenerLS=()=>{
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    const actualizarLS=()=>{
        obtenerLS();
        cuerpoCarrito.innerHTML="";
        llenarCarrito(carrito,cuerpoCarrito);
        total(carrito,cuerpoCarrito);
    }

    comprar.forEach((element, index) => {
        element.addEventListener("click", () => {
          let buscado = encontrarProducto[index].querySelector(".nombre").innerText;
      
          todosProductos.forEach((elem) => {
            if (elem.nombre === buscado) {
              const filtrado = carrito.filter((producto) => producto.nombre === buscado);
      
              if (filtrado.length === 0) {
                elem.cantidad = 1;
                carrito.push(elem);
                actualizarLS();
              }
            }
          });
        });
      });
      
    //funcion eliminar producto
    function eliminarProducto(elem){
        carrito.forEach((element,index)=>{
            if(element.codigo===elem){
                carrito.splice(index,1);
                actualizarLS();
            }
        })
    }
    if (carrito.length === 0){
        cuerpoCarrito.innerHTML = "";
        cuerpoCarrito.innerHTML+=`
        <p>No hay productos en el carrito</p>
        `;
    }
    
// Función para filtrar productos
function filtarproducto(arr, busqueda) {
    const filtroEnMinuscula = busqueda.toLowerCase();
  
    const filtrado = arr.filter((el) => {
      const nombreEnMinuscula = el.nombre.toLowerCase();
      return nombreEnMinuscula.includes(filtroEnMinuscula);
    });
  
    return filtrado;
  }
  
  //Buscar productos
  buscador.addEventListener("input", (e) => {
    const busqueda = e.target.value;
    const filtrado = filtarproducto(todosProductos, busqueda);
    main_producto.innerHTML = "";
  
    if (filtrado.length === 0) {
      main_producto.innerHTML += `<p>No hay productos</p>`;
    } else {
      llenarProductos(filtrado, main_producto);
    }
  });
   
  //funcion sumar cantidad
    function sumarCant(elem){
        carrito.forEach((element)=>{
            if(element.codigo===elem){
                element.cantidad++;
                actualizarLS();
            }
        })
    }
    //funcion restar cantidad
    function retarCant(elem){
        carrito.forEach((element)=>{
            if(element.codigo===elem){
                if(element.cantidad>1){
                    element.cantidad--;
                    actualizarLS();
                }
            }
        })
    }
    //funcion pagar
    function pagar(){
        localStorage.removeItem("carrito");
        cuerpoCarrito.innerHTML="";
        cuerpoCarrito.innerHTML+=`
        <p>No hay productos en el carrito</p>
        `;
        alert("Gracias por su compra");
        alert("Vuelva pronto")
}
















    




