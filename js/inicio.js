// registro del usuario
const inputUsuario = document.querySelector("#username"),
  inputContraseña = document.querySelector("#password"),
  check = document.querySelector("#recordarme"),
  formulario = document.querySelector("#formulario");

function guardar(valor) {
    const user = { username: inputUsuario.value, password: inputContraseña.value };
    
    valor === "localStorage" &&
    localStorage.setItem("user", JSON.stringify(user));
  valor === "sessionStorage" &&
    sessionStorage.setItem("user", JSON.stringify(user));
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  guardar(check.checked ? "localStorage" : "sessionStorage");
}
);
