// Variables
const container = document.getElementById("donas-container"); // Contenedor que ya existe en el DOM
let articulosCarrito = [];

// Cargar los listeners
cargarEventListeners();

function cargarEventListeners() {
  // Escuchar clics en el contenedor principal
  container.addEventListener("click", agregarAlCarrito);
}

function agregarAlCarrito(e) {
  e.preventDefault();
  // Verificar si el clic fue en un botón con la clase 'btn-cart'
  if (e.target.classList.contains("btn-cart")) {
    console.log("Agregando al carrito");

    // Aquí puedes obtener los datos del producto relacionado con el botón clicado
    const producto = e.target.closest(".card"); // Obtener la tarjeta completa
    const datosProducto = {
      name: producto.querySelector(".card-title").textContent,
      price: producto.querySelector(".card-text strong").textContent,
      image: producto.querySelector("img").src,
    };

    // Agregar el producto al carrito
    articulosCarrito.push(datosProducto);
    console.log(articulosCarrito);
  }
}
