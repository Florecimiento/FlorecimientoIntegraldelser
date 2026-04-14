// Inicializar almacenamiento local
let productos = JSON.parse(localStorage.getItem("catalogoProductos")) || [];


function guardarLocal() {
  localStorage.setItem("catalogoProductos", JSON.stringify(productos));
}

function listarProductos() {
  const tabla = document.getElementById("tablaProductos");
  tabla.innerHTML = "";

  productos.forEach((p, index) => {
    tabla.innerHTML += `
      <tr>
        <td><img src="${p.image}" width="60"></td>
        <td>${p.name}</td>
        <td>${p.description}</td>
        <td>$${p.price}</td>
        <td>${p.quantity}</td>
        <td class="actions">
          <button class="edit-btn" onclick="editarProducto(${index})">Editar</button>
          <button class="delete-btn" onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// ✅ CREAR PRODUCTO (MODIFICADO)
async function crearProducto() {
  const nuevo = {
    image: document.getElementById("image").value,
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),
    quantity: parseInt(document.getElementById("quantity").value)
  };

  // 1. Guardar en LocalStorage
  productos.push(nuevo);
  guardarLocal();
  listarProductos();

  // 2. Guardar también en MongoDB
  try {
    const response = await fetch("http://localhost:3000/api/crudproductos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevo)
    });

    const data = await response.json();
    console.log("Guardado en MongoDB:", data);

    alert("✅ Producto creado y guardado en CatalogoProductos");

  } catch (error) {
    console.error("Error guardando en MongoDB:", error);
    alert("⚠️ El producto se guardó en local, pero hubo error con la BD");
  }

  limpiarFormulario();
}

function limpiarFormulario() {
  document.getElementById("image").value = "";
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
}

function editarProducto(index) {
  const p = productos[index];

  document.getElementById("image").value = p.image;
  document.getElementById("name").value = p.name;
  document.getElementById("description").value = p.description;
  document.getElementById("price").value = p.price;
  document.getElementById("quantity").value = p.quantity;

  const boton = document.querySelector(".form-container button");
  boton.innerText = "Actualizar Producto";
  boton.onclick = function () {
    actualizarProducto(index);
  };
}

function actualizarProducto(index) {
  productos[index] = {
    image: document.getElementById("image").value,
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),
    quantity: parseInt(document.getElementById("quantity").value)
  };

  guardarLocal();
  listarProductos();

  const boton = document.querySelector(".form-container button");
  boton.innerText = "Guardar Producto";
  boton.onclick = crearProducto;

  alert("✅ Producto actualizado");
}

function eliminarProducto(index) {
  if (confirm("¿Eliminar este producto?")) {
    productos.splice(index, 1);
    guardarLocal();
    listarProductos();
  }
}

// ✅ Cargar al abrir
listarProductos();
