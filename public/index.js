import { getInfo } from "/llamados.js";

document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    try {
        const users = await getInfo("usuarios");
        
        if (!users) {
            document.getElementById("errorMensaje").textContent = "Error de conexión. Inténtalo más tarde.";
            return;
        }

        const userId = document.getElementById("userId").value;
        const password = document.getElementById("password").value;
        const user = users.find(user => user.nombre === userId && user.password === password);

        if (user) {
            localStorage.setItem("loggedUser", JSON.stringify(user));
            window.location.href = user.rol === "admin" ? "admin.html" : "solicitud.html";
        } else {
            document.getElementById("errorMensaje").textContent = "Credenciales incorrectas.";
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        document.getElementById("errorMensaje").textContent = "Hubo un problema. Inténtalo más tarde.";
    }
});
