// js/usuario-listar.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Referencias a la tabla
    const tbody = document.querySelector("#tblUsuarios tbody");

    async function cargarUsuarios() {
        try {
            // 2. Llamar al back-end (GET /usuarios)
            const respuesta = await fetch("http://localhost:3000/usuarios");
            const data = await respuesta.json();

            // 3. Limpiar el tbody por si acaso
            tbody.innerHTML = "";

            // 4. Manejar caso sin usuarios
            if (!Array.isArray(data) || data.length === 0) {
                const fila = document.createElement("tr");
                const celda = document.createElement("td");
                celda.colSpan = 3;
                celda.textContent = "No hay usuarios registrados aún.";
                fila.appendChild(celda);
                tbody.appendChild(fila);
                return;
            }
            

            // 5. Recorrer los usuarios y agregarlos a la tabla
data.forEach(usuario => {
    const fila = document.createElement("tr");

    // si el usuario tiene certificaciones, las convertimos en texto
    let listaCertificaciones = "—"; // por defecto guion si no tiene
    if (Array.isArray(usuario.certificaciones) && usuario.certificaciones.length > 0) {
        listaCertificaciones = usuario.certificaciones
            .map(cert => cert.nombre)  // obtener solo el nombre
            .join(", ");                // unirlos con coma
    }

    fila.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
        <td>${usuario.cedula}</td>
        <td>${usuario.celular}</td>
        <td>${listaCertificaciones}</td>
    `;

    tbody.appendChild(fila);
});


        } catch (error) {
            console.error("Error cargando usuarios:", error);

            const fila = document.createElement("tr");
            const celda = document.createElement("td");
            celda.colSpan = 3;
            celda.textContent = "Error al cargar los usuarios.";
            fila.appendChild(celda);
            tbody.appendChild(fila);
        }
    }

    // 6. Llamar la función apenas cargue la página
    cargarUsuarios();
});
