document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("donas-container");

  // Función para crear una tarjeta HTML
  function createDonaCard({ name, price, image, category }) {
    return `
      <div class="col-md-3">
        <div class="card h-100 border-0 custom-card">
          <img src="assets/img-products/${image}.jpg" class="card-img-top" alt="${name}">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Categoría: <strong>${category}</strong></p>
            <p class="card-text">Precio: <strong class="price">$${price.toFixed(2)}</strong></p>
            
            <button class="btn btn-cart w-100 mt-auto">
                Agregar al carrito &nbsp; <i class="bi bi-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Función para cargar los datos
  async function loadDonas() {
    try {
      const response = await fetch("./assets/data/data_donas.json");

      if (!response.ok) {
        throw new Error("Error al cargar los datos");
      }

      const donas = await response.json(); // Parsear el JSON

      /**
       * Renderizar las tarjetas
       * donas.map(createDonaCard).join("")
       * Usamos el método map del array donas para recorrer cada objeto dentro del array.
       * Por cada objeto, llama a la función createDonaCard, pasando el objeto como argumento.
       * .join("") Toma el nuevo array de cadenas HTML generado por map y las une en una sola cadena,
       * asegurando qque las cadenas se concatenen sin separadores entre ellas
       */
      const donaCards = donas.map((dona) => createDonaCard(dona)).join("");
      container.innerHTML = donaCards;
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      container.innerHTML = `<p class="text-danger text-center">Hubo un error al cargar los datos.</p>`;
    }
  }

  // Cargar los datos al cargar la página
  loadDonas();
});
