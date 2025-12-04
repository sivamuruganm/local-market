// Shopping cart functionality
let cart = [];
let cartTotal = 0;

// Product data
const products = {
    bread: { name: 'Artisan Bread', price: 4.99 },
    croissant: { name: 'Butter Croissants', price: 2.99 },
    muffins: { name: 'Blueberry Muffins', price: 3.49 },
    cookies: { name: 'Chocolate Chip Cookies', price: 5.99 },
    eggs: { name: 'Farm Fresh Eggs', price: 6.49 },
    milk: { name: 'Organic Milk', price: 5.99 },
    cheese: { name: 'Artisan Cheese', price: 8.99 },
    yogurt: { name: 'Greek Yogurt', price: 4.49 },
    butter: { name: 'Farm Fresh Butter', price: 6.29 },
    honey: { name: 'Wildflower Honey', price: 8.99 },
    vegetables: { name: 'Seasonal Vegetables', price: 3.99 },
    tomatoes: { name: 'Fresh Tomatoes', price: 4.49 },
    lettuce: { name: 'Organic Lettuce', price: 2.99 },
    carrots: { name: 'Baby Carrots', price: 3.29 },
    spinach: { name: 'Fresh Spinach', price: 3.79 },
    cucumber: { name: 'Crisp Cucumbers', price: 2.49 },
    soap: { name: 'Handmade Soap', price: 7.49 }
};

// Add item to cart
function addToCart(productId, price) {
    const product = products[productId];
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Update quantity in cart
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
    }
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Calculate delivery fee
    const deliveryOption = document.querySelector('input[name="delivery"]:checked');
    const deliveryFee = deliveryOption && deliveryOption.value === 'delivery' ? 3.99 : 0;
    
    // Update cart total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal = subtotal + deliveryFee;
    cartTotalElement.textContent = cartTotal.toFixed(2);
    
    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} each</p>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    <button onclick="removeFromCart('${item.id}')" style="background: #e74c3c; margin-left: 10px;">Remove</button>
                </div>
            </div>
        `).join('');
        
        if (deliveryFee > 0) {
            cartItems.innerHTML += `
                <div class="cart-item">
                    <div>
                        <h4>Local Delivery</h4>
                        <p>Within Greenfield area</p>
                    </div>
                    <div>
                        <strong>$${deliveryFee.toFixed(2)}</strong>
                    </div>
                </div>
            `;
        }
    }
}

// Toggle cart modal
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

// Close cart when clicking outside
window.onclick = function(event) {
    const cartModal = document.getElementById('cart-modal');
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const deliveryOption = document.querySelector('input[name="delivery"]:checked');
    const isDelivery = deliveryOption.value === 'delivery';
    const deliveryText = isDelivery ? 'Local delivery within 2-3 hours' : 'Ready for pickup in 30 minutes';
    
    alert(`Thank you for your order from Greenfield Market!\n\nTotal: $${cartTotal.toFixed(2)}\n${deliveryText}\n\nWe'll contact you shortly with order confirmation.\n\nSupporting local community, one order at a time! 🌱`);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    toggleCart();
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add delivery option change listener
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add delivery option change listeners
    setTimeout(() => {
        const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
        deliveryOptions.forEach(option => {
            option.addEventListener('change', updateCartDisplay);
        });
    }, 100);
});

// Product filtering functionality
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter products
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.classList.remove('hidden');
            product.style.display = 'block';
        } else {
            product.classList.add('hidden');
            product.style.display = 'none';
        }
    });
    
    // Add smooth animation
    setTimeout(() => {
        products.forEach(product => {
            if (!product.classList.contains('hidden')) {
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }
        });
    }, 50);
}
