const listaUsuarios = document.getElementById("sltUsuario");
const listaCertificaciones = document.getElementById("sltCertificacion");
const btnAsociar = document.getElementById("btnAsociar");

// Traer los usuarios de la BD para mostrar en la lista sltUsuario
async function mostrarUsuarios() {
    fetch("http://localhost:3000/usuarios", {
        method: "GET",
        headers: {
            "Content-Type": "Application/json"
        }
    }).then(response => response.json()
    ).then(usuarios => {
        listaUsuarios.innerHTML = "";

        usuarios.forEach(usuario =>{
            const nuevaOpcion = document.createElement("option"); // Crear dinámicamente cada opción del select
            nuevaOpcion.value = usuario.cedula; // Guardar el dato de la cédula del usuario 
            nuevaOpcion.textContent = usuario.nombre; // Mostrar el nombre del usuario     
            listaUsuarios.appendChild(nuevaOpcion);
        })
    }).catch(error => {
        console.log(error);
    });
}
// Traer los usuarios de la BD para mostrar en la lista sltUsuario
async function mostrarUsuarios() {
    
}

// Traer las certificaciones de la BD para mostrar en la lista sltCertificacion
async function mostrarCertificaciones() {
    
}

// Enviar los datos al servidor 
async function asociarCertificacion(){
    console.log("Asociar certificación");
}

mostrarUsuarios();
btnAsociar.addEventListener("click", asociarCertificacion);