///////////////////////////////////////////
// FRONT – Registro de Usuario
///////////////////////////////////////////

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nombre: document.getElementById("username").value.trim(),
    correo: document.getElementById("email").value.trim().toLowerCase(),
    telefono: document.getElementById("phone").value.trim(),
    contrasena: document.getElementById("password").value,
   
  };

  try {
    const response = await fetch("http://localhost:3000/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    // ⚠️ SI EL BACKEND RESPONDE ERROR
    if (!response.ok) {
      alert("❌ " + (result.error || "Error al registrar usuario"));
      return;
    }

    // ✔ SI TODO SALIÓ BIEN
    alert("✔ Usuario registrado correctamente");
    // Limpiar formulario
    document.getElementById("registerForm").reset();
    // Redirigir suavemente
    setTimeout(() => {
      window.location.href = "login.html";
    }, 400);

  } catch (error) {
    alert("🔥 Error de conexión con el servidor");
    console.error("Error de conexión:", error);
  }
});
