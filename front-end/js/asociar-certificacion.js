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
    try {
        const respuesta = await fetch("http://localhost:3000/usuarios", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!respuesta.ok) {
            throw new Error("Error al obtener los usuarios");
        }

        const usuarios = await respuesta.json();
        listaUsuarios.innerHTML = ""; // Limpiar lista

        usuarios.forEach(usuario => {
            const nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = usuario.cedula;       // valor interno
            nuevaOpcion.textContent = usuario.nombre; // texto visible
            listaUsuarios.appendChild(nuevaOpcion);
        });

    } catch (error) {
        console.error("Error al mostrar usuarios:", error);
    }
}


// Traer las certificaciones de la BD para mostrar en la lista sltCertificacion
async function mostrarCertificaciones() {
    fetch("http://localhost:3000/certificacion", {
        method: "GET",
        headers: {
            "Content-Type": "Application/json"
        }
    }).then(response => response.json()
    ).then(certificaciones => {
        listaCertificaciones.innerHTML = "";

        certificaciones.forEach(certificacion =>{
            const nuevaOpcion = document.createElement("option"); // Crear dinámicamente cada opción del select
            nuevaOpcion.value = certificacion._id; // Guardar el dato de la id de la certificacion
            nuevaOpcion.textContent = certificacion.nombre; // Mostrar el nombre de la certificacion  
            listaCertificaciones.appendChild(nuevaOpcion);
        })
    }).catch(error => {
        console.log(error);
    });
}
// Enviar los datos al servidor 
async function asociarCertificacion(){
    const datosCertificacionUsuario = {
        cedula: listaUsuarios.value,
        certificacionId: listaCertificaciones.value
    };
    fetch("http://localhost:3000/usuarios/agregar-certificacion", {
        method: "PUT",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(datosCertificacionUsuario)
    }).then(response => {
        if (!response.ok) {
            console.log("No se pudo asociar la certificación");
        } else if (response.status === 202){
            Swal.fire({
                icon: "warning",
                title: "Certificación duplicada",
                text: "El usuario ya tiene asociada la certificación.",
                confirmButtonText: "Aceptar"
            });
        } 
        else {
            Swal.fire({
                icon: "success",
                title: "Certificación asociada",
                confirmButtonText: "Aceptar"
            });
        }
    }).catch(error => {
        console.log(error);
    });
}

mostrarUsuarios();
mostrarCertificaciones();
btnAsociar.addEventListener("click", asociarCertificacion);