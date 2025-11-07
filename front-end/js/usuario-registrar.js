// js/usuario-registrar.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Referencias a los elementos del DOM
    const txtNombre = document.getElementById("txtNombre");
    const txtCedula = document.getElementById("txtCedula");
    const txtContrasenia = document.getElementById("txtContrasenia");
    const txtCorreo = document.getElementById("txtCorreo");
    const txtCelular = document.getElementById("txtCelular");
    const btnGuardar = document.getElementById("btnGuardar");

    // Array de inputs requeridos para validar
    const inputsRequeridos = [
        txtNombre,
        txtCedula,
        txtContrasenia,
        txtCorreo,
        txtCelular
    ];

    function limpiarEstilos() {
        inputsRequeridos.forEach(inp => {
            inp.classList.remove("is-invalid");
        });
    }

    // 2. Función de validación
    function validar() {
        let error = false;
        limpiarEstilos();

        inputsRequeridos.forEach(input => {
            if (!input.value.trim()) {
                error = true;
                input.classList.add("is-invalid");
            }
        });

        if (error) {
            Swal.fire({
                icon: "warning",
                title: "No se puede registrar el usuario",
                text: "Por favor complete todos los campos.",
                confirmButtonText: "Aceptar"
            });
            return;
        }

        // Si todo está bien, intentamos registrar
        registrarUsuario();
    }

    // 3. Función que habla con el back-end
    async function registrarUsuario() {
        const datos = {
            correo: txtCorreo.value.trim(),
            nombre: txtNombre.value.trim(),
            cedula: txtCedula.value.trim(),
            celular: txtCelular.value.trim(),
            contrasenia: txtContrasenia.value.trim()
        };

        try {
            const respuesta = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const data = await respuesta.json().catch(() => ({}));

            if (!respuesta.ok) {
                // El back puede mandar "mensaje" o "mensajeError"
                const mensajeError = data.mensaje || data.mensajeError || "Error al registrar usuario.";
                throw new Error(mensajeError);
            }

            // 4. Mostrar modal de éxito
            const modalElement = document.getElementById("successModal");
            if (modalElement && window.bootstrap) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                // Fallback por si fallara el modal
                Swal.fire({
                    icon: "success",
                    title: "Usuario registrado",
                    text: "Usuario creado con éxito."
                });
            }

            // 5. Limpiar formulario
            inputsRequeridos.forEach(inp => inp.value = "");
            limpiarEstilos();

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error al registrar",
                text: error.message || "Ocurrió un error al registrar el usuario.",
                confirmButtonText: "Aceptar"
            });
        }
    }

    // 4. Conectar botón con la validación
    if (btnGuardar) {
        btnGuardar.addEventListener("click", validar);
    }
});
