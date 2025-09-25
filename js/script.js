
// إدارة صفحة سلة التسوق باستخدام localStorage الخاص بالحفظ
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cart.length;
    });
}


// إضافة منتج إلى السلة
function addToCart(productName, productPrice) {
    const cart = getCart();
    cart.push({ name: productName, price: productPrice });
    saveCart(cart);
    alert(`تم إضافة ${productName} إلى سلة التسوق!`);
}

// عرض محتويات السلة
function displayCart() {
    const cartPage = document.querySelector('.cart-page');
    if (!cartPage) return;
    
    const cart = getCart();
    const cartContainer = document.querySelector('.cart-items');

    let total = 0;
    
    if (cart.length > 0) {
        cartContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p>السعر: ${item.price}$</p>
                </div>
                <button class="btn" onclick="removeFromCart(${index})">إزالة</button>
            `;
            cartContainer.appendChild(cartItem);
            total += item.price;
        });

        
        const totalElement = document.createElement('div');
        totalElement.classList.add('cart-total');
        totalElement.innerHTML = `<h2>الاجمالي: ${total}$</h2>`;
        cartContainer.appendChild(totalElement);
    } else {
        cartContainer.innerHTML = '<p class="empty-cart">سلة التسوق فارغة</p>';
    }
}

// إزالة منتج من السلة
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
}


// التحقق من النماذج
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (!input.value.trim()) {
            if (errorElement) {
                errorElement.style.display = 'block';
            }

            isValid = false;
        } else {
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }
        
        // تحقق خاص من البريد الإلكتروني
        if (input.type === 'email' && input.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   
            if (!emailPattern.test(input.value)) {
                document.getElementById(`${input.id}-error`).style.display = 'block';
                isValid = false;
            }
        }
        
        // تحقق من تطابق كلمة المرور
        if (input.id === 'confirm-password' && input.value.trim()) {
            const password = document.getElementById('password').value;
            if (input.value !== password) {
                document.getElementById(`${input.id}-error`).style.display = 'block';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحديث عداد السلة
    updateCartCount();
    

    // عرض محتويات السلة إذا كانت الصفحة page
    displayCart();
    
    // إضافة active class للرابط الحالي
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // إضافة event listeners لأزرار إضافة إلى السلة
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', 

function() {
            const productCard = this.closest('.product-card, .product-details');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
            addToCart(productName, productPrice);
        });
    });
    
    // إضافة event listeners للنماذج
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {

            if (!validateForm(this.id)) {
                e.preventDefault();
            }
        });
    });
});
