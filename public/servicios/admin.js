import { getInfo, updateInfo } from "./llamados.js";

document.addEventListener("DOMContentLoaded", async () => {
    const solicitudesContainer = document.getElementById("solicitudes-container");
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (!loggedUser || loggedUser.rol !== "admin") {
        alert("Acceso denegado. Solo administradores pueden ver esta página.");
        window.location.href = "index.html";
        return;
    }

    const solicitudes = await getInfo("solicitudes");

    solicitudesContainer.innerHTML = solicitudes.map(solicitud => `
        <div class="solicitud">
            <p><strong>ID Usuario:</strong> ${solicitud.userId}</p>
            <p><strong>Sede:</strong> ${solicitud.sede}</p>
            <p><strong>Fecha Salida:</strong> ${solicitud.fechaSalida}</p>
            <p><strong>Fecha Regreso:</strong> ${solicitud.fechaRegreso}</p>
            <p><strong>Código Computadora:</strong> ${solicitud.codigoComputadora}</p>
            <p><strong>Estado:</strong> ${solicitud.estado}</p>
            <button class="aprobar" data-id="${solicitud.id}">Aprobar</button>
            <button class="rechazar" data-id="${solicitud.id}">Rechazar</button>
        </div>
    `).join("");

    document.querySelectorAll(".aprobar").forEach(button => {
        button.addEventListener("click", async () => {
            const id = button.dataset.id;
            await updateInfo(id, { estado: "Aprobado" }, "solicitudes");
            alert("Solicitud aprobada.");
            window.location.reload()
        });
    });

    document.querySelectorAll(".rechazar").forEach(button => {
        button.addEventListener("click", async () => {
            const id = button.dataset.id;
            await updateInfo(id, { estado: "Rechazado" }, "solicitudes");
            alert("Solicitud rechazada.");
            location.reload();
        });
    });

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "index.html";
    });
});
