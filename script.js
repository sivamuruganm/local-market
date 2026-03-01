// Shopping cart functionality
let cart = [];
let cartTotal = 0;
let activeCategory = 'all'; // Track active category
let donationAmount = 0; // Track donation amount

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
    jam: { name: 'Blueberry Jam', price: 6.49 },
    vegetables: { name: 'Seasonal Vegetables', price: 3.99 },
    tomatoes: { name: 'Fresh Tomatoes', price: 4.49 },
    lettuce: { name: 'Organic Lettuce', price: 2.99 },
    carrots: { name: 'Baby Carrots', price: 3.29 },
    spinach: { name: 'Fresh Spinach', price: 3.79 },
    cucumber: { name: 'Crisp Cucumbers', price: 2.49 },
    apples: { name: 'Fresh Apples', price: 3.49 },
    soap: { name: 'Handmade Soap', price: 7.49 },
    lotion: { name: 'Natural Lotion', price: 9.99 },
    loofah: { name: 'Natural Loofah', price: 6.99 },
    hammer: { name: 'Claw Hammer', price: 16.99 },
    paint: { name: 'Premium Paint', price: 34.99 },
    lightbulb: { name: 'LED Light Bulbs', price: 12.99 }
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
    const checkoutModal = document.getElementById('checkout-modal');
    const confirmationModal = document.getElementById('confirmation-modal');
    
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
    
    if (event.target === checkoutModal) {
        closeCheckout();
    }
    
    if (event.target === confirmationModal) {
        closeConfirmation();
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Reset donation
    donationAmount = 0;
    document.getElementById('donate-checkbox').checked = false;
    document.getElementById('donation-options').style.display = 'none';
    document.getElementById('donation-display').innerHTML = '';
    document.getElementById('custom-donation-amount').value = '';
    
    // Show checkout modal
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutSummary = document.getElementById('checkout-summary');
    
    // Populate cart summary in checkout form
    let summaryHTML = '';
    cart.forEach(item => {
        summaryHTML += `
            <div class="summary-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    // Add delivery fee if applicable
    const deliveryOption = document.querySelector('input[name="delivery"]:checked');
    const isDelivery = deliveryOption && deliveryOption.value === 'delivery';
    if (isDelivery) {
        summaryHTML += `
            <div class="summary-item">
                <span>Delivery Fee</span>
                <span>$3.99</span>
            </div>
        `;
    }
    
    checkoutSummary.innerHTML = summaryHTML;
    document.getElementById('checkout-subtotal').textContent = cartTotal.toFixed(2);
    document.getElementById('checkout-total').textContent = cartTotal.toFixed(2);
    
    checkoutModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close checkout modal
function closeCheckout() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Toggle donation options
function toggleDonation() {
    const checkbox = document.getElementById('donate-checkbox');
    const donationOptions = document.getElementById('donation-options');
    
    if (checkbox.checked) {
        donationOptions.style.display = 'block';
    } else {
        donationOptions.style.display = 'none';
        donationAmount = 0;
        updateCheckoutTotal();
        document.getElementById('donation-display').innerHTML = '';
        document.getElementById('custom-donation-amount').value = '';
    }
}

// Set donation amount
function setDonation(amount) {
    donationAmount = parseFloat(amount) || 0;
    updateCheckoutTotal();
    
    // Update active button styling
    const buttons = document.querySelectorAll('.donation-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Find and highlight the clicked button
    if (amount !== this.value) {
        event.target.classList.add('active');
    }
    
    // Update display
    if (donationAmount > 0) {
        document.getElementById('donation-display').innerHTML = 
            `<strong>✓ Thank you for donating $${donationAmount.toFixed(2)} to the small business community!</strong>`;
    }
}

// Update checkout total with donation
function updateCheckoutTotal() {
    const newTotal = cartTotal + donationAmount;
    document.getElementById('checkout-total').textContent = newTotal.toFixed(2);
}

// Submit checkout form
function submitCheckout(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('full-name').value;
    const streetAddress = document.getElementById('street-address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipCode = document.getElementById('zip-code').value;
    const phoneNumber = document.getElementById('phone').value;
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    // Simple validation for card number (should be 16 digits)
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    if (cleanCardNumber.length !== 16 || isNaN(cleanCardNumber)) {
        alert('Please enter a valid 16-digit card number');
        return;
    }
    
    // Validate expiry format
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert('Please enter expiry date in MM/YY format');
        return;
    }
    
    // Validate CVV
    if (!/^\d{3}$/.test(cvv)) {
        alert('Please enter a valid 3-digit CVV');
        return;
    }
    
    // Generate random confirmation number
    const confirmationNumber = generateConfirmationNumber();
    
    // Populate confirmation modal with order details
    document.getElementById('confirmation-number').textContent = confirmationNumber;
    document.getElementById('confirmation-name').textContent = `Name: ${fullName}`;
    
    const deliveryAddress = `${streetAddress}, ${city}, ${state} ${zipCode}`;
    document.getElementById('confirmation-address').textContent = `Address: ${deliveryAddress}`;
    document.getElementById('confirmation-phone').textContent = `Phone: ${phoneNumber}`;
    
    // Populate confirmation items
    let itemsHTML = '';
    cart.forEach(item => {
        itemsHTML += `
            <div class="confirmation-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    // Add delivery fee if applicable
    const deliveryOption = document.querySelector('input[name="delivery"]:checked');
    const isDelivery = deliveryOption && deliveryOption.value === 'delivery';
    if (isDelivery) {
        itemsHTML += `
            <div class="confirmation-item">
                <span>Delivery Fee</span>
                <span>$3.99</span>
            </div>
        `;
    }
    
    // Add donation if applicable
    let confirmationTotal = cartTotal;
    if (donationAmount > 0) {
        itemsHTML += `
            <div class="confirmation-item">
                <span>Donation to Small Business Community</span>
                <span>$${donationAmount.toFixed(2)}</span>
            </div>
        `;
        confirmationTotal += donationAmount;
    }
    
    document.getElementById('confirmation-items').innerHTML = itemsHTML;
    document.getElementById('confirmation-total').textContent = confirmationTotal.toFixed(2);
    
    // Hide checkout modal and show confirmation modal
    closeCheckout();
    const confirmationModal = document.getElementById('confirmation-modal');
    confirmationModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Clear cart and close cart modal
    cart = [];
    donationAmount = 0; // Reset donation
    updateCartDisplay();
    toggleCart();
    
    // Reset form
    document.getElementById('checkout-form').reset();
}

// Generate random confirmation number
function generateConfirmationNumber() {
    const prefix = 'GFM';
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `${prefix}-${year}-${randomNum}`;
}

// Close confirmation modal
function closeConfirmation() {
    const confirmationModal = document.getElementById('confirmation-modal');
    confirmationModal.classList.remove('show');
    document.body.style.overflow = 'auto';
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
    
    // Add feature tooltip functionality
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            showFeatureTooltip(this);
        });
        
        item.addEventListener('mouseleave', function() {
            removeFeatureTooltip(this);
        });
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tooltip = this.querySelector('.feature-tooltip');
            if (tooltip) {
                removeFeatureTooltip(this);
            } else {
                showFeatureTooltip(this);
            }
        });
    });
    
    // Add form input formatting
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            // Remove non-digits
            let value = this.value.replace(/\D/g, '');
            // Add spaces every 4 digits
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            this.value = value;
        });
    }
    
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function() {
            // Remove non-digits
            let value = this.value.replace(/\D/g, '');
            // Add slash after 2 digits
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }
    
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            // Only allow digits
            this.value = this.value.replace(/\D/g, '');
        });
    }
});

// Open presentation function
function openPresentation() {
    // Try to open the presentation file
    const presentationWindow = window.open('presentation-preview.html', '_blank');
    
    // Fallback if file doesn't open
    if (!presentationWindow) {
        alert('Presentation file not found. Please check if presentation-preview.html exists in the same folder.');
        // Alternative: redirect to markdown file
        window.open('Greenfield_Market_Presentation.md', '_blank');
    }
}

// Product filtering functionality
function filterProducts(category) {
    activeCategory = category; // Store the active category
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Re-run search with new category filter
    searchProducts();
}

// Search products functionality
function searchProducts() {
    const searchValue = document.getElementById('product-search-bar').value.toLowerCase().trim();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDescription = card.querySelector('.description').textContent.toLowerCase();
        const productCategory = card.dataset.category;
        
        // Check category filter
        const categoryMatches = activeCategory === 'all' || productCategory === activeCategory;
        
        // Check search term
        let searchMatches = true;
        if (searchValue !== '') {
            const nameMatches = productName.startsWith(searchValue);
            const words = productDescription.split(/\s+/);
            const descriptionMatches = words.some(word => word.startsWith(searchValue));
            searchMatches = nameMatches || descriptionMatches;
        }
        
        // Show card if both category and search match
        if (categoryMatches && searchMatches) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Partner popup functions
function showPartnerPopup(event, name, description, location, phone, logo) {
    event.preventDefault();
    
    const modal = document.getElementById('partner-modal');
    const nameEl = document.getElementById('partner-name');
    const descriptionEl = document.getElementById('partner-description');
    const locationEl = document.getElementById('partner-location');
    const phoneEl = document.getElementById('partner-phone');
    const logoEl = document.getElementById('partner-logo');
    
    nameEl.textContent = name;
    descriptionEl.textContent = description;
    locationEl.textContent = location;
    phoneEl.textContent = phone;
    logoEl.textContent = logo;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePartnerPopup() {
    const modal = document.getElementById('partner-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close partner modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('partner-modal');
    if (event.target === modal) {
        closePartnerPopup();
    }
});

// Feature tooltip functions
function showFeatureTooltip(element) {
    // Remove any existing tooltips
    removeFeatureTooltip(element);
    
    const description = element.getAttribute('data-description');
    if (!description) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'feature-tooltip';
    tooltip.textContent = description;
    
    element.appendChild(tooltip);
}

function removeFeatureTooltip(element) {
    const tooltip = element.querySelector('.feature-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}
