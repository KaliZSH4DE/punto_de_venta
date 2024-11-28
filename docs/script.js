// Definición de productos disponibles en la tienda, cada producto tiene un ID, nombre, precio e imagen
const products = [
    { id: 1, name: "Casco Riddell Speed Flex", price: 12000, img: "img/speedflex.jpg" },
    { id: 2, name: "Casco Schutt F7", price: 14000, img: "img/f7.jpg" },
    { id: 3, name: "Casco Xenith Shadow", price: 10500, img: "img/shadow.jpg" },
    { id: 4, name: "Hombreras Riddell", price: 3200, img: "img/hriddell.jpg" },
    { id: 5, name: "Hombreras Schutt", price: 3500, img: "img/hschutt.jpg" },
    { id: 6, name: "Hombreras Xenith Velocity Pro", price: 6500, img: "img/velocity.jfif" },
    { id: 7, name: "Guantes Nike Alpha", price: 1200, img: "img/nikeguantes.webp" },
    { id: 8, name: "Guantes Evoshield", price: 700, img: "img/evoshieldguantes.webp" },
    { id: 9, name: "Guantes Grip Boost Raptor", price: 1200, img: "img/gb.webp" },
    { id: 10, name: "Cleats Under Armour", price: 2150, img: "img/under.avif" },
    { id: 11, name: "Cleats Nike Elite 3", price: 4500, img: "img/alpha.jpg" },
    { id: 12, name: "Cleats Nike Alpha", price: 3600, img: "img/nikealpha.webp" }
];

// Carrito de compras inicializado como un array vacío
let cart = [];

// Función para mostrar los productos en la interfaz de la tienda
function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Limpia la lista de productos antes de renderizar

    // Itera sobre cada producto y crea un elemento visual en la lista
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        // Añade imagen, nombre, precio y botón de agregar del producto
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar</button>
        `;
        productList.appendChild(productCard); // Agrega el producto a la lista en el HTML
    });
}

// Función para mostrar el contenido del carrito en la tabla
function renderCart() {
    const cartBody = document.getElementById("cart-body");
    const grandTotal = document.getElementById("grand-total");

    cartBody.innerHTML = ""; // Limpia el contenido del carrito antes de renderizar
    let totalAmount = 0; // Variable para calcular el total del carrito

    // Itera sobre cada producto en el carrito y crea una fila en la tabla
    cart.forEach(item => {
        const row = document.createElement("tr");

        // Añade imagen, nombre, precio, cantidad, total y opción para eliminar del carrito
        row.innerHTML = `
            <td><img src="${item.img}" width="40"></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><span class="delete-btn" onclick="removeFromCart(${item.id})">🗑️</span></td>
        `;

        cartBody.appendChild(row); // Agrega la fila a la tabla del carrito en el HTML
        totalAmount += item.price * item.quantity; // Suma el total del producto al monto total
    });

    grandTotal.textContent = totalAmount.toFixed(2); // Muestra el total general
}

// Función para agregar un producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId); // Encuentra el producto en la lista de productos

    const cartItem = cart.find(item => item.id === productId); // Verifica si el producto ya está en el carrito

    if (cartItem) {
        cartItem.quantity++; // Si ya está, incrementa la cantidad
    } else {
        cart.push({ ...product, quantity: 1 }); // Si no está, lo añade con cantidad inicial de 1
    }

    renderCart(); // Renderiza el carrito actualizado
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId); // Filtra y elimina el producto seleccionado
    renderCart(); // Renderiza el carrito actualizado
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(productId, quantity) {
    const cartItem = cart.find(item => item.id === productId); // Encuentra el producto en el carrito

    if (cartItem) {
        cartItem.quantity = parseInt(quantity); // Actualiza la cantidad del producto
        renderCart(); // Renderiza el carrito con la cantidad actualizada
    }
}

// Función para buscar productos por nombre
function searchProduct() {
    const searchText = document.getElementById("search").value.toLowerCase(); // Captura el texto de búsqueda
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchText) // Filtra los productos que incluyen el texto de búsqueda
    );

    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Limpia la lista de productos antes de renderizar los resultados de la búsqueda

    // Itera sobre cada producto filtrado y crea un elemento visual
    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        // Añade imagen, nombre, precio y botón de agregar del producto
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar</button>
        `;
        productList.appendChild(productCard); // Agrega el producto a la lista en el HTML
    });
}

// Cuando el documento se carga, inicializa la vista de productos y el carrito vacío
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(); // Renderiza la lista de productos disponibles
    renderCart(); // Renderiza el carrito (inicialmente vacío)
});
