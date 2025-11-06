const tablaUsuarios = document.getElementById("tblUsuarios").querySelector("tbody");

async function cargarTabla() {
    fetch("http://localhost:3000/usuarios", {
        method: "GET",
        headers: {
            "Content-Type": "Application/json"
        }
    }).then(response => Response.json()
).then(listaUsuarios => {
    tablaUsuarios.innerHTML = ""; // Limpiar la tabla
    listaUsuarios.forEach(usuario => {
        const fila = document.createElement("tr");
        // ` : Comilla francesa,permite utilizar variables o expresiones en un string. 
        // Por ejemplo dentro de la fila crear la celda (td) con los datso traidos de la BD (interpolacion de 
        // variables: Insertar variables o expresiones directamente dentro de una cadena utilizadno la sintaxis ${})
        fila.innerHTML = `
        <td> ${usuario.nombre}</td>
        <td> ${usuario.correo}</td>
        <td> ${usuario.cedula}</td>
        <td> ${usuario.celular}</td>
        `;
        tablaUsuarios.appendChild(fila); // Agregar la fila creada en la tabla
    })
})

    .catch(error => {
        console.log(error);
    });
}

cargarTabla();