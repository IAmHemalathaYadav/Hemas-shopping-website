let iconCart = document.querySelector('.cart  button');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
iconCart.addEventListener("click", () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.box-content button');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateLocalStorageCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function renderCart() {
        const shoppingCart = document.querySelector('.listCart');
        shoppingCart.innerHTML = ''; 

        cartItems.forEach(item => {
            const newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.innerHTML = `
                <div class="image">
                    <img src="${item.productImage}" alt="${item.productName}">
                </div>
                <div class="name">${item.productName}</div>
                <div class="totalPrice">${item.productPrice.toFixed(2)}</div>
                <div class="quantity">
                    <span class="minus">&lt;</span>
                    <span>${item.quantity}</span>
                    <span class="plus">&gt;</span>
                </div>
            `;

            shoppingCart.appendChild(newItem);

            const quantity = newItem.querySelector('.quantity');
            const quantityValue = quantity.querySelector('span:nth-child(2)');
            const minusButton = quantity.querySelector('.minus');
            const plusButton = quantity.querySelector('.plus');

            minusButton.addEventListener('click', function() {
                if (item.quantity > 1) {
                    item.quantity--;
                    quantityValue.textContent = item.quantity;
                    updateTotalPrice();
                    updateLocalStorageCart(); 
                } else {
                    cartItems = cartItems.filter(cartItem => cartItem !== item);
                    renderCart(); 
                    updateTotalPrice();
                    updateLocalStorageCart(); 
                }
            });

           
            plusButton.addEventListener('click', function() {
                item.quantity++;
                quantityValue.textContent = item.quantity;
                updateTotalPrice();
                updateLocalStorageCart(); 
            });
        });
        updateTotalPrice();
    }

    renderCart();
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const boxContent = this.parentElement;

           
            const productName = boxContent.querySelector('h3').innerText;
            const productPrice = parseFloat(boxContent.querySelector('.price').innerText.replace('Rs:', ''));
            const productImageURL = boxContent.querySelector('.bi').style.backgroundImage;
            const productImage = productImageURL.slice(5, -2);

            let existingItem = cartItems.find(item => item.productName === productName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({
                    productName: productName,
                    productPrice: productPrice,
                    productImage: productImage,
                    quantity: 1
                });
            }
            updateLocalStorageCart();
            renderCart();
        });
    });
    function updateTotalPrice() {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.productPrice * item.quantity;
        });

        const totalElement = document.querySelector('.total-price');
        totalElement.textContent = `Total Price: Rs ${totalPrice.toFixed(2)}`;
    }
});
