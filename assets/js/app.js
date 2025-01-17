// Variables
let articulosCarrito = [];

// Seleccionar el contenedor del carrito
const carritoContainer = document.querySelector(".offcanvas-body");

// Cargar eventos
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("donas-container")
    .addEventListener("click", agregarAlCarrito);
  renderizarCarrito();
});

// Función para agregar al carrito
function agregarAlCarrito(e) {
  if (e.target.classList.contains("btn-cart")) {
    const card = e.target.closest(".card");
    const producto = {
      id: card.querySelector("img").alt, // Usamos el alt como identificador
      nombre: card.querySelector(".card-title").textContent,
      categoria: card.querySelector(".card-text strong").textContent,
      precio: parseFloat(card.querySelector(".price").textContent.slice(1)),
      cantidad: 1,
      imagen: card.querySelector("img").src,
    };
    console.log(producto);

    // Verificar si ya está en el carrito
    const existe = articulosCarrito.find((item) => item.id === producto.id);
    if (existe) {
      existe.cantidad++;
    } else {
      articulosCarrito.push(producto);
    }

    renderizarCarrito();
  }
}

// Función para renderizar el carrito
function renderizarCarrito() {
  carritoContainer.innerHTML = "";

  articulosCarrito.forEach((producto) => {
    const itemHTML = `
      <div class="container mb-3">
        <div class="row align-items-center border-bottom py-2">
          <div class="col-3">
            <img src="${producto.imagen}" alt="${
      producto.nombre
    }" class="img-fluid" />
          </div>
          <div class="col-6">
            <h6 class="mb-1 title-product">${producto.nombre}</h6>
            <p class="mb-0 detalles-product">Categoría: ${
              producto.categoria
            }</p>
          </div>
          <div class="col-3 text-end">
            <span class="fs-6">${producto.cantidad}x</span>
            <strong class="fs-5 fw-bold">$${(
              producto.precio * producto.cantidad
            ).toFixed(2)}</strong>
            <button class="btn btn-primary mt-2 btn-borrar" data-id="${
              producto.id
            }">Borrar</button>
          </div>
        </div>
      </div>
    `;

    carritoContainer.insertAdjacentHTML("beforeend", itemHTML);
  });

  agregarEventosBorrar();
}

// Función para eliminar un producto del carrito
function agregarEventosBorrar() {
  const botonesBorrar = document.querySelectorAll(".btn-borrar");

  botonesBorrar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const productoId = e.target.dataset.id;

      articulosCarrito = articulosCarrito
        .map((producto) => {
          if (producto.id === productoId) {
            if (producto.cantidad > 1) {
              producto.cantidad--; // Disminuir la cantidad
              return producto; // Retornar el producto actualizado
            }
            return null; // Retornar null si la cantidad es 1 para eliminarlo
          }
          return producto; // Retornar los demás productos sin cambios
        })
        .filter((producto) => producto !== null); // Filtrar los productos eliminados

      renderizarCarrito();
    });
  });
}
