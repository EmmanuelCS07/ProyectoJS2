import { getInfo, postInfo } from "./llamados.js";
document.addEventListener("DOMContentLoaded", async () => {
    const computadoraSelect = document.getElementById("codigoComputadora");
    const usuarioInput = document.getElementById("userId");
    const solicitudForm = document.getElementById("solicitud-form");

   
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (!loggedUser) {
        alert("Debes iniciar sesión para solicitar una computadora.");
        window.location.href = "admin.html";
        return;
    }

  
    usuarioInput.value = loggedUser.nombre;
    usuarioInput.disabled = true;

    try {
        
        const computadoras = await getInfo("computadoras");
        console.log("Computadoras obtenidas:", computadoras); 

        if (!computadoras || computadoras.length === 0) {
            computadoraSelect.innerHTML = `<option disabled>No hay computadoras disponibles</option>`;
        } else {
            computadoraSelect.innerHTML = computadoras
                .map(pc => `<option value="${pc.id}">${pc.id} - ${pc.modelo}</option>`)
                .join("");
        }
    } catch (error) {
        console.error("Error al obtener computadoras:", error);
        alert("Error al cargar la lista de computadoras. Intenta nuevamente.");
    }

   
    solicitudForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!document.getElementById("aceptarCondiciones").checked) {
            alert("Debes aceptar las condiciones de uso.");
            return;
        }

        const nuevaSolicitud = {
            userId: loggedUser.id,
            nombreUsuario: loggedUser.nombre,
            sede: document.getElementById("sede").value,
            fechaSalida: document.getElementById("fechaSalida").value,
            fechaRegreso: document.getElementById("fechaRegreso").value,
            codigoComputadora: computadoraSelect.value,
            estado: "Pendiente"
        };

        try {
            await postInfo(nuevaSolicitud, "solicitudes");
            console.log("Solicitud enviada:", response); // Para verificar la respuesta del servidor
            alert("Solicitud enviada correctamente.");

           
            solicitudForm.reset();

           // window.location.href = "admin.html";
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            alert("Hubo un problema al enviar la solicitud. Intenta nuevamente.");
        }
    });
});