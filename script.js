let products = [
    {
        id: 1,
        title: "MacBook Pro 16-inch",
        description: "Apple M2 Pro chip, 16GB RAM, 512GB SSD, 16-inch Liquid Retina XDR display, Space Gray",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop",
        price: 1299.99
    },
    {
        id: 3,
        title: "Sony WH-1000XM5",
        description: "Premium noise-canceling headphones with 30-hour battery life and crystal clear sound",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=400&fit=crop",
        price: 249.99
    },
    {
        id: 4,
        title: "Apple Watch Series 9",
        description: "Always-On Retina display, Blood Oxygen monitoring, ECG, GPS tracking",
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=400&fit=crop",
        price: 199.99
    },
    {
        id: 5,
        title: "PlayStation 5",
        description: "Next-gen gaming console with 4K graphics, ray tracing, and ultra-high-speed SSD",
        image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&h=400&fit=crop",
        price: 499.99
    },
    {
        id: 6,
        title: "iPad Pro 12.9-inch",
        description: "M2 chip, 12.9-inch Liquid Retina XDR display, 256GB storage, Wi-Fi + 5G",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=400&fit=crop",
        price: 649.99
    },
    {
        id: 7,
        title: "Sony A7 IV",
        description: "33MP full-frame sensor, 4K 60p video, advanced autofocus with AI subject recognition",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=400&fit=crop",
        price: 1499.99
    },
    {
        id: 8,
        title: "Amazon Echo Studio",
        description: "High-fidelity smart speaker with 3D audio and Alexa voice control",
        image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&h=400&fit=crop",
        price: 129.99
    },
    // منتجات إضافية جديدة
    {
        id: 9,
        title: "MacBook Air M2",
        description: "Apple M2 chip, 8GB RAM, 256GB SSD, 13.6-inch Liquid Retina display, Midnight",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=400&fit=crop",
        price: 999.99
    },
    {
        id: 10,
        title: "AirPods Pro 2nd Gen",
        description: "Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio",
        image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=500&h=400&fit=crop",
        price: 249.99
    },
    {
        id: 11,
        title: "Samsung Galaxy S24 Ultra",
        description: "6.8-inch Dynamic AMOLED, 200MP camera, S Pen support, 5G connectivity",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=400&fit=crop",
        price: 1199.99
    },
    {
        id: 12,
        title: "Canon EOS R6 Mark II",
        description: "24.2MP full-frame sensor, 4K 60p video, advanced Dual Pixel CMOS AF II",
        image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=500&h=400&fit=crop",
        price: 2499.99
    },
    {
        id: 13,
        title: "Nintendo Switch OLED",
        description: "7-inch OLED screen, enhanced audio, 64GB storage, improved kickstand",
        image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&h=400&fit=crop",
        price: 349.99
    }
];




// Initialize favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// DOM Elements
const homePage = document.getElementById('homePage');
const favoritesPage = document.getElementById('favoritesPage');
const productList = document.getElementById('productList');
const favoritesList = document.getElementById('favoritesList');
const homeBtn = document.getElementById('homeBtn');
const favBtn = document.getElementById('favBtn');
const backBtn = document.getElementById('backBtn');
const favCount = document.getElementById('favCount');

// Navigation Functions
function showHome() {
    homePage.classList.add('active');
    favoritesPage.classList.remove('active');
    homeBtn.classList.add('active');
    favBtn.classList.remove('active');
}

function showFavorites() {
    favoritesPage.classList.add('active');
    homePage.classList.remove('active');
    favBtn.classList.add('active');
    homeBtn.classList.remove('active');
    renderFavorites();
}

// Event Listeners
homeBtn.addEventListener('click', showHome);
favBtn.addEventListener('click', showFavorites);
backBtn.addEventListener('click', showHome);

// Format price function
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// Render Functions
function createProductCard(product, isFavorite = false) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-price">${formatPrice(product.price)}</p>
        <button class="fav-btn ${isFavorite ? 'remove' : ''}" 
                onclick="${isFavorite ? 'removeFromFavorites' : 'addToFavorites'}(${product.id})">
            ${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    `;
    
    // Add event listener to button
    const button = card.querySelector('.fav-btn');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (isFavorite) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product.id);
        }
    });
    
    return card;
}

function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const isFavorite = favorites.some(fav => fav.id === product.id);
        const card = createProductCard(product, isFavorite);
        productList.appendChild(card);
    });
}

function renderFavorites() {
    favoritesList.innerHTML = '';
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #666;">No favorite products yet.</p>';
        return;
    }
    favorites.forEach(product => {
        const card = createProductCard(product, true);
        favoritesList.appendChild(card);
    });
}

// Favorites Management
function updateFavoritesCount() {
    favCount.textContent = favorites.length;
}

function addToFavorites(productId) {
    const product = products.find(p => p.id === productId);
    if (product && !favorites.some(fav => fav.id === productId)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesCount();
        renderProducts();
        
        // Show feedback
        const button = document.querySelector(`button[onclick="addToFavorites(${productId})"]`);
        if (button) {
            button.textContent = 'Added!';
            setTimeout(() => {
                renderProducts();
            }, 1000);
        }
    }
}

function removeFromFavorites(productId) {
    favorites = favorites.filter(product => product.id !== productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
    renderProducts();
    renderFavorites();
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesCount();
    renderProducts();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && favoritesPage.classList.contains('active')) {
            showHome();
        }
    });
});