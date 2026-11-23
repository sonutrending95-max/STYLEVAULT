
/* =========================================
   STYLEVAULT - COMPLETE E-COMMERCE JAVASCRIPT
   Fixed:
   Products, Search, Filters, Sorting,
   Cart, Quantity, Remove, Sizes,
   Wishlist, Product Details, LocalStorage
========================================= */


/* ---------- Product Data ---------- */

let products =  [
    {
        id: 1,
        name: "Essential Oversized T-Shirt",
        category: "Clothing",
        price: 799,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
        description: "A comfortable oversized T-shirt with a modern everyday style."
    },
    {
        id: 2,
        name: "Classic White Sneakers",
        category: "Shoes",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        description: "Classic sneakers designed for a clean and versatile look."
    },
    {
        id: 3,
        name: "Minimal Classic Watch",
        category: "Watches",
        price: 2499,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
        description: "A minimal watch that adds a refined touch to your style."
    },
    {
        id: 4,
        name: "Premium Sunglasses",
        category: "Accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        description: "Stylish sunglasses for a confident everyday look."
    },
    {
        id: 5,
        name: "Casual Denim Jacket",
        category: "Clothing",
        price: 1799,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
        description: "A versatile denim jacket for casual outfits."
    },
    {
        id: 6,
        name: "Street Style Sneakers",
        category: "Shoes",
        price: 2299,
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80",
        description: "Street-inspired sneakers for everyday comfort."
    },
    {
        id: 7,
        name: "Luxury Black Watch",
        category: "Watches",
        price: 2999,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=600&q=80",
        description: "A bold black watch with a timeless design."
    },
    {
        id: 8,
        name: "Everyday Fashion Bag",
        category: "Accessories",
        price: 1499,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
        description: "A practical fashion bag for everyday essentials."
    }
];


/* ---------- HTML Elements ---------- */

const productGrid = document.getElementById("productGrid");

const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const searchInput = document.getElementById("productSearch");
const categoryFilter = document.getElementById("categoryFilter");
const sortProducts = document.getElementById("sortProducts");

const cartBtn = document.getElementById("cartBtn");
const closeCartBtn = document.getElementById("closeCart");
const searchBtn = document.getElementById("searchBtn");
const wishlistBtn = document.getElementById("wishlistBtn");
const checkoutBtn = document.getElementById("checkoutBtn");

const newsletterForm = document.getElementById("newsletterForm");


/* ---------- LocalStorage ---------- */

function loadSavedData(key, fallback) {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch (error) {
        return fallback;
    }
}

let cart = loadSavedData("stylevault_cart", []);
let wishlist = loadSavedData("stylevault_wishlist", []);

let wishlistOnly = false;
/* ---------- Safe Product ID Comparison ---------- */

function sameId(a, b) {
    return String(a) === String(b);
}


/* ---------- Save Cart ---------- */

function saveCart() {
    try {
        localStorage.setItem(
            "stylevault_cart",
            JSON.stringify(cart)
        );
    } catch (error) {
        console.error("Cart could not be saved.", error);
    }
}


/* ---------- Save Wishlist ---------- */

function saveWishlist() {
    try {
        localStorage.setItem(
            "stylevault_wishlist",
            JSON.stringify(wishlist)
        );
    } catch (error) {
        console.error("Wishlist could not be saved.", error);
    }
}




/* ---------- Clean Saved Cart ---------- */

function cleanSavedCart() {
    if (!Array.isArray(cart)) {
        cart = [];
        return;
    }

    cart = cart
        .filter(item => {!1


            
            return (
                item &&
                item.id !== undefined &&
                Number.isInteger(Number(item.quantity)) &&
                Number(item.quantity) > 0
            );
        })
        .map(item => {
            const product = products.find(
                product => sameId(product.id, item.id)
            );

            return {
                ...(product || item),
                quantity: Number(item.quantity),
                selectedSize: item.selectedSize || ""
            };
        });
}


/* ---------- Clean Saved Wishlist ---------- */

function cleanSavedWishlist() {
    if (!Array.isArray(wishlist)) {
        wishlist = [];
        return;
    }

    wishlist = wishlist.filter(id =>
        products.some(product => product.id === Number(id))
    );
}


/* ---------- Product Card ---------- */

function createProductCard(product) {
    const isWishlisted = wishlist.includes(product.id);

    return `
        <div class="product-card">

            <div
                class="product-image"
                onclick="showProductDetails(${product.id})"
            >
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >
            </div>

            <div class="product-info">

                <h3 onclick="showProductDetails(${product.id})">
                    ${product.name}
                </h3>

                <p>${product.category}</p>

                <p class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <div class="product-buttons">

                    <button onclick="handleCardAdd(${product.id})">
                        ADD TO BAG
                    </button>

                    <button
                        class="wishlist"
                        onclick="toggleWishlist(${product.id})"
                        aria-label="Toggle wishlist"
                    >
                        ${isWishlisted ? "♥" : "♡"}
                    </button>

                </div>

                <button
                    class="view-details-btn"
                    onclick="showProductDetails(${product.id})"
                >
                    VIEW DETAILS
                </button>

            </div>

        </div>
    `;
}


/* ---------- Display Products ---------- */

function displayProducts(list = products) {
    if (!productGrid) return;

    if (list.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>
        `;
        return;
    }

    productGrid.innerHTML = list
        .map(product => createProductCard(product))
        .join("");
}


/* ---------- Search, Filter and Sort ---------- */

function filterProducts() {
    if (!searchInput || !categoryFilter || !sortProducts) {
        displayProducts();
        return;
    }

    const searchText = searchInput.value
        .trim()
        .toLowerCase();

    const selectedCategory = categoryFilter.value;
    const selectedSort = sortProducts.value;

    let filtered = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesWishlist =
            !wishlistOnly ||
            wishlist.includes(product.id);

        return (
            matchesSearch &&
            matchesCategory &&
            matchesWishlist
        );
    });

    if (selectedSort === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (selectedSort === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (selectedSort === "name") {
        filtered.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    displayProducts(filtered);
}


/* ---------- Add Product from Card ---------- */

function handleCardAdd(id) {
    const product = products.find(
        item => item.id === Number(id)
    );

    if (!product) return;

    if (["Clothing", "Shoes"].includes(product.category)) {
        showProductDetails(product.id);
        return;
    }

    addToCart(product.id);
}


/* ---------- Add to Cart with Size ---------- */

function addToCart(id, selectedSize = "") {
    const product = products.find(
        item => Number(item.id) === Number(id)
    );

    if (!product) return;

    const needsSize = ["Clothing", "Shoes"].includes(product.category);

    if (needsSize && !selectedSize) {
        alert("Please select a size first!");
        return;
    }

    const existingItem = cart.find(item =>
        Number(item.id) === Number(id) &&
        (item.selectedSize || "") === selectedSize
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            selectedSize: selectedSize,
            quantity: 1
        });
    }

    saveCart();
    updateCart();

    if (cartOverlay) {
        cartOverlay.classList.add("active");
    }
}


/* ---------- Update Cart ---------- */

function updateCart() {
    if (!cartItems || !cartCount || !cartTotal) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                Your bag is empty.
            </p>
        `;
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const size = item.selectedSize || "";

        cartItems.innerHTML += `
            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                    </p>

                    ${
                        size
                            ? `<p class="cart-item-size">Size: ${size}</p>`
                            : ""
                    }

                    <div class="quantity-controls">

                        <button
                            type="button"
                            data-cart-action="decrease"
                            data-id="${item.id}"
                            data-size="${size}"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            type="button"
                            data-cart-action="increase"
                            data-id="${item.id}"
                            data-size="${size}"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>

                    <button
                        type="button"
                        class="remove-item"
                        data-cart-action="remove"
                        data-id="${item.id}"
                        data-size="${size}"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;
    });

    cartCount.textContent = count;

    cartTotal.textContent =
        "₹" + total.toLocaleString("en-IN");
}


/* ---------- Cart Button Event Handling ---------- */

if (cartItems) {
    cartItems.addEventListener("click", function(event) {
        const button = event.target.closest("[data-cart-action]");

        if (!button) return;

        const id = Number(button.dataset.id);
        const size = button.dataset.size || "";
        const action = button.dataset.cartAction;

        if (action === "remove") {
            removeFromCart(id, size);
        }

        if (action === "increase") {
            changeQuantity(id, 1, size);
        }

        if (action === "decrease") {
            changeQuantity(id, -1, size);
        }
    });
}


/* ---------- Change Quantity by Product and Size ---------- */

function changeQuantity(id, change, selectedSize = "") {
    const item = cart.find(product =>
        Number(product.id) === Number(id) &&
        (product.selectedSize || "") === selectedSize
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(id, selectedSize);
        return;
    }

    saveCart();
    updateCart();
}


/* ---------- Remove Cart Item by Product and Size ---------- */

function removeFromCart(id, selectedSize = "") {
    cart = cart.filter(item =>
        !(
            Number(item.id) === Number(id) &&
            (item.selectedSize || "") === selectedSize
        )
    );

    saveCart();
    updateCart();
}


/* ---------- Wishlist ---------- */

function toggleWishlist(id) {
    id = Number(id);

    const product = products.find(
        item => item.id === id
    );

    if (!product) return;

    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }

    saveWishlist();
    filterProducts();

    if (wishlistBtn) {
        wishlistBtn.textContent = wishlistOnly ? "♥" : "♡";
    }
}


/* ---------- Open Cart ---------- */

if (cartBtn) {
    cartBtn.addEventListener("click", () => {
        if (cartOverlay) {
            cartOverlay.classList.add("active");
        }
    });
}


/* ---------- Close Cart ---------- */

if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }
    });
}


/* ---------- Close Cart Outside ---------- */

if (cartOverlay) {
    cartOverlay.addEventListener("click", event => {
        if (event.target === cartOverlay) {
            cartOverlay.classList.remove("active");
        }
    });
}


/* ---------- Search Input ---------- */

if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
}


/* ---------- Category Filter ---------- */

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterProducts);
}


/* ---------- Sort Products ---------- */

if (sortProducts) {
    sortProducts.addEventListener("change", filterProducts);
}


/* ---------- Search Navbar Button ---------- */

if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        if (searchInput) {
            searchInput.focus();
        }

        const productsSection = document.getElementById("products");

        if (productsSection) {
            productsSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}


/* ---------- Wishlist Navbar Button ---------- */

if (wishlistBtn) {
    wishlistBtn.addEventListener("click", () => {
        wishlistOnly = !wishlistOnly;

        wishlistBtn.textContent = wishlistOnly ? "♥" : "♡";

        filterProducts();

        const productsSection = document.getElementById("products");

        if (productsSection) {
            productsSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}


/* ---------- Newsletter ---------- */

if (newsletterForm) {
    newsletterForm.addEventListener("submit", event => {
        event.preventDefault();

        alert("Thank you for joining STYLEVAULT!");

        newsletterForm.reset();
    });
}


/* ---------- Product Details Popup ---------- */

let detailsPopup = null;
let selectedDetailProduct = null;

function createDetailsPopup() {
    if (detailsPopup) return;

    document.body.insertAdjacentHTML("beforeend", `
        <div id="productDetailsPopup" class="product-details-popup">

            <div class="product-details-box">

                <button
                    type="button"
                    class="details-close"
                    aria-label="Close product details"
                >
                    &times;
                </button>

                <div class="details-content"></div>

            </div>

        </div>
    `);

    detailsPopup = document.getElementById("productDetailsPopup");

    detailsPopup.addEventListener("click", event => {
        if (event.target === detailsPopup) {
            closeProductDetails();
        }
    });

    const closeButton = detailsPopup.querySelector(".details-close");

    closeButton.addEventListener("click", closeProductDetails);
}


/* ---------- Show Product Details ---------- */

function showProductDetails(productId) {
    const product = products.find(
        item => Number(item.id) === Number(productId)
    );

    if (!product) {
        alert("Product not found!");
        return;
    }

    createDetailsPopup();

    selectedDetailProduct = product;

    const detailsContent = detailsPopup.querySelector(".details-content");

    const needsSize = ["Clothing", "Shoes"].includes(product.category);

    let sizeOptions = "";

    if (product.category === "Clothing") {
        sizeOptions = `
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
        `;
    }

    if (product.category === "Shoes") {
        sizeOptions = `
            <option value="6">UK 6</option>
            <option value="7">UK 7</option>
            <option value="8">UK 8</option>
            <option value="9">UK 9</option>
            <option value="10">UK 10</option>
        `;
    }

    detailsContent.innerHTML = `
        <div class="details-image">
            <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="details-info">

            <p class="details-category">${product.category}</p>

            <h2>${product.name}</h2>

            <p class="details-price">
                ₹${product.price.toLocaleString("en-IN")}
            </p>

            <p class="details-description">
                ${product.description || "Discover this stylish product from our collection."}
            </p>

            ${
                needsSize
                    ? `
                        <label for="detailsSize" class="details-size-label">
                            Select Size
                        </label>

                        <select id="detailsSize" class="details-size-select">
                            <option value="">Choose your size</option>
                            ${sizeOptions}
                        </select>
                    `
                    : ""
            }

            <button
                type="button"
                class="details-add-btn"
                id="detailsAddToCart"
            >
                ADD TO BAG
            </button>

            <p class="details-note">
                Easy shopping with STYLEVAULT
            </p>

        </div>
    `;

    const addButton = detailsContent.querySelector("#detailsAddToCart");

    addButton.addEventListener("click", handleDetailsAdd);

    detailsPopup.classList.add("active");
    document.body.style.overflow = "hidden";
}


/* ---------- Add from Product Details ---------- */

function handleDetailsAdd() {
    if (!selectedDetailProduct) return;

    const product = selectedDetailProduct;

    let selectedSize = "";

    if (["Clothing", "Shoes"].includes(product.category)) {
        const sizeSelect = detailsPopup.querySelector("#detailsSize");

        selectedSize = sizeSelect ? sizeSelect.value : "";

        if (!selectedSize) {
            alert("Please select a size first!");
            return;
        }
    }

    addToCart(product.id, selectedSize);

    closeProductDetails();
}


/* ---------- Close Product Details ---------- */

function closeProductDetails() {
    if (detailsPopup) {
        detailsPopup.classList.remove("active");
    }

    selectedDetailProduct = null;
    document.body.style.overflow = "";
}


/* ---------- Escape Key ---------- */

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProductDetails();

        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }
    }
});


/* ---------- Start Website ---------- */

cleanSavedCart();
cleanSavedWishlist();

saveCart();
saveWishlist();

displayProducts();
updateCart();
filterProducts();



/* =========================
   CHECKOUT OPEN / CLOSE
========================= */

const checkoutOverlay = document.getElementById("checkoutOverlay");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutTotal = document.getElementById("checkoutTotal");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {

        if (!cart || cart.length === 0) {
            alert("Your shopping bag is empty!");
            return;
        }

        checkoutTotal.textContent = document.getElementById("cartTotal").textContent;

        checkoutOverlay.classList.add("active");
    });
}

if (closeCheckout) {
    closeCheckout.addEventListener("click", function () {
        checkoutOverlay.classList.remove("active");
    });
}

if (checkoutOverlay) {
    checkoutOverlay.addEventListener("click", function (event) {
        if (event.target === checkoutOverlay) {
            checkoutOverlay.classList.remove("active");
        }
    });
}





/* =====================================
   STYLEVAULT - ORDER HISTORY
   Order ID, Date, Products, Total
===================================== */

const orderHistoryKey = "stylevault_order_history";

const checkoutForm = document.getElementById("checkoutForm");
const orderSuccessOverlay = document.getElementById("orderSuccessOverlay");

const successOrderTotal = document.getElementById("successOrderTotal");
const successOrderId = document.getElementById("successOrderId");
const successOrderItems = document.getElementById("successOrderItems");

const continueShoppingBtn = document.getElementById("continueShoppingBtn");

let currentOrderId = "";

/* ---------- Get Saved Orders ---------- */

function getSavedOrders() {
    try {
        return JSON.parse(localStorage.getItem(orderHistoryKey)) || [];
    } catch (error) {
        return [];
    }
}

/* ---------- Save Orders ---------- */

function saveOrderHistory(orders) {
    localStorage.setItem(orderHistoryKey, JSON.stringify(orders));
}

/* ---------- Create My Orders Button ---------- */

function createMyOrdersButton() {
    if (document.getElementById("myOrdersBtn")) return;

    const button = document.createElement("button");
    button.id = "myOrdersBtn";
    button.textContent = "My Orders";

    button.style.cssText = `
        padding: 10px 16px;
        border: 1px solid #222;
        background: white;
        color: #222;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        margin: 8px;
    `;

    const cartButton = document.getElementById("cartBtn");

    if (cartButton && cartButton.parentElement) {
        cartButton.parentElement.appendChild(button);
    } else {
        document.body.prepend(button);
    }

    button.addEventListener("click", showMyOrders);
}

/* ---------- Create My Orders Popup ---------- */

function createMyOrdersPopup() {
    if (document.getElementById("myOrdersPopup")) return;

    const popup = document.createElement("div");
    popup.id = "myOrdersPopup";

    popup.innerHTML = `
        <div class="my-orders-box">
            <div class="my-orders-header">
                <h2>My Orders</h2>
                <button id="closeMyOrders">✕</button>
            </div>

            <div id="myOrdersList"></div>
        </div>
    `;

    document.body.appendChild(popup);

    const style = document.createElement("style");

    style.textContent = `
        #myOrdersPopup {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.65);
            display: none;
            align-items: center;
            justify-content: center;
            padding: 15px;
            z-index: 10001;
        }

        #myOrdersPopup.active {
            display: flex;
        }

        .my-orders-box {
            background: white;
            color: #222;
            width: 100%;
            max-width: 600px;
            max-height: 85vh;
            overflow-y: auto;
            padding: 22px;
            border-radius: 14px;
        }

        .my-orders-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .my-orders-header h2 {
            margin: 0;
        }

        #closeMyOrders {
            border: none;
            background: #eee;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
        }

        .my-order-card {
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 14px;
        }

        .my-order-card h3 {
            margin: 0 0 8px;
            font-size: 16px;
        }

        .my-order-card p {
            margin: 6px 0;
            color: #555;
            font-size: 14px;
        }

        .my-order-products {
            background: #f7f7f7;
            padding: 10px;
            border-radius: 7px;
            margin-top: 10px;
            font-size: 14px;
        }

        .my-order-total {
            font-weight: bold;
            margin-top: 12px;
        }

        .no-orders-message {
            text-align: center;
            color: #777;
            padding: 25px 10px;
        }
    `;

    document.head.appendChild(style);

    document.getElementById("closeMyOrders").addEventListener("click", function () {
        popup.classList.remove("active");
    });

    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.classList.remove("active");
        }
    });
}


/* ---------- Show My Orders ---------- */

function showMyOrders() {
    createMyOrdersPopup();

    const popup = document.getElementById("myOrdersPopup");
    const list = document.getElementById("myOrdersList");

    list.innerHTML = "";

    const orders = getSavedOrders();

    if (orders.length === 0) {
        const message = document.createElement("p");
        message.className = "no-orders-message";
        message.textContent = "You haven't placed any demo orders yet.";

        list.appendChild(message);
    } else {
        orders.slice().reverse().forEach(function (order) {
            const card = document.createElement("div");
            card.className = "my-order-card";

            // Order ID
            const heading = document.createElement("h3");
            heading.textContent = "Order ID: " + order.id;

            // Order Date
            const date = document.createElement("p");
            date.textContent = "Date: " + order.date;

            // Order Status
            const status = document.createElement("p");
            status.textContent = "Status: " + (order.status || "Order Placed");

            // Products
            const products = document.createElement("div");
            products.className = "my-order-products";

            order.items.forEach(function (item) {
                const row = document.createElement("p");

                row.textContent =
                    item.name +
                    (item.size ? " | Size: " + item.size : "") +
                    " × " + item.quantity +
                    " — ₹" + Number(item.total).toLocaleString("en-IN");

                products.appendChild(row);
            });

            // Total
            const total = document.createElement("p");
            total.className = "my-order-total";
            total.textContent =
                "Total: ₹" + Number(order.total).toLocaleString("en-IN");

            // Add everything to order card
            card.appendChild(heading);
            card.appendChild(date);
            card.appendChild(status);
            card.appendChild(products);
            card.appendChild(total);

            list.appendChild(card);
        });
    }

    popup.classList.add("active");
}

/* ---------- Place Order ---------- */

if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!cart || cart.length === 0) {
            alert("Your shopping bag is empty!");
            return;
        }

        // Order ID generate karo
        currentOrderId =
            "SV-" + Math.floor(100000 + Math.random() * 900000);

        // Cart products ka safe summary banao
        const orderItems = cart.map(function (item) {
            const name =
                item.name ||
                item.title ||
                (item.product && item.product.name) ||
                "Product";

            const price = Number(item.price) ||
                Number(item.product && item.product.price) || 0;

            const quantity = Number(item.quantity) || 1;

            const size = item.selectedSize || item.size || "";

            return {
                name: name,
                price: price,
                quantity: quantity,
                size: size,
                total: price * quantity
            };
        });

        const orderTotal = orderItems.reduce(function (sum, item) {
            return sum + item.total;
        }, 0);

       const newOrder = {
    id: currentOrderId,
    date: new Date().toLocaleString("en-IN"),
    status: "Order Placed",
    items: orderItems,
    total: orderTotal
};

        // Order history mein save karo
        const savedOrders = getSavedOrders();
        savedOrders.push(newOrder);
        saveOrderHistory(savedOrders);

        // Success page par Order ID aur Total show karo
        if (successOrderId) {
            successOrderId.textContent = currentOrderId;
        }

        if (successOrderTotal) {
            successOrderTotal.textContent =
                "₹" + orderTotal.toLocaleString("en-IN");
        }

        // Success page par products show karo
        if (successOrderItems) {
            successOrderItems.innerHTML = "";

            orderItems.forEach(function (item) {
                const row = document.createElement("div");
                row.className = "success-item";

                const info = document.createElement("span");

                info.textContent =
                    item.name +
                    (item.size ? " (Size: " + item.size + ")" : "") +
                    " × " + item.quantity;

                const price = document.createElement("strong");

                price.textContent =
                    "₹" + item.total.toLocaleString("en-IN");

                row.appendChild(info);
                row.appendChild(price);

                successOrderItems.appendChild(row);
            });
        }

        // Checkout aur cart panel band karo
        if (checkoutOverlay) {
            checkoutOverlay.classList.remove("active");
        }

        const cartOverlay = document.getElementById("cartOverlay");

        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }

        // Order success page open karo
        if (orderSuccessOverlay) {
            orderSuccessOverlay.classList.add("active");
        }

        // Cart empty karo
        cart.length = 0;

        if (typeof saveCart === "function") {
            saveCart();
        }

        if (typeof updateCart === "function") {
            updateCart();
        }
    });
}

/* ---------- Continue Shopping ---------- */

if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", function () {
        if (orderSuccessOverlay) {
            orderSuccessOverlay.classList.remove("active");
        }

        if (checkoutForm) {
            checkoutForm.reset();
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ---------- Initialize My Orders ---------- */

createMyOrdersButton();
createMyOrdersPopup();


/* ---------- Load Products from Supabase ---------- */

async function loadProductsFromSupabase() {
    const { data, error } = await window.supabaseClient
        .from("products")
        .select("id, name, description, category, price, image_url, stock")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Products load error:", error.message);
        return;
    }

    window.stylevaultDbProducts = data || [];

    console.log("Supabase Products Loaded:", window.stylevaultDbProducts);
    console.table(window.stylevaultDbProducts);
}

loadProductsFromSupabase();





