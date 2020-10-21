if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


let products = [
    {
        name: 'Muay Thai',
        tag: 'muaythai',
        price: 12,
        inCart: 0
    },
    {
        name: 'Yoga',
        tag: 'yoga',
        price: 8,
        inCart: 0
    }
];

// Add to Cart Buttons
let carts = document.querySelectorAll('.add-cart') // change name to 'items'
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = parseInt(localStorage.getItem('cartNumbers'));
    if (productNumbers) {
        document.querySelector('.nav-cart-count').textContent = productNumbers;
    } 
}


function cartNumbers(product) {
    let productNumbers = parseInt(localStorage.getItem('cartNumbers'));
    
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.nav-cart-count').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.nav-cart-count').textContent = 1;
    }

    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if (cartItems != null) {
        // if it's a NEW cartItem in local storage
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        console.log(cartItems[products.tag]);
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    // console.log("The product price is", product.price);
    
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);
    
    if (cartCost != null) {
        cartCost = parseFloat(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price)
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    
    let productContainer = document.querySelector('.cart-item-container')

    console.log(cartItems);    
    if (cartItems && productContainer ) {
        productContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="cart-item">
                <div class="cart-item__info">
                    <a href="#"><label class="card-item__title">${item.name}.</label></a>
                    <label class="cart-item__date">Date: Oct 30, 2020</label>
                    <label class="cart-item__time">Time: 9:00am - 11:00am</label>
                    <label class="cart-item__instructor">Instructor: Russ Telen</label>
                </div>
                        <!--  -->
                <div class="cart-item__image" id="img1">
                    <a href="#">
                    <!-- <img src="#" alt="muay_thai"> -->
                    </a>
                </div>
                        <!--  -->
                <div class="cart-item__functions">
                    <div class="cart-item__remove">
                        <button class="cart-item__remove-button" type="button"><i class="far fa-trash-alt"></i> Remove</button>
                    </div>
                    <!-- QTY -->
                    <div class="cart-item__amount">
                    <input class="cart-item__quantity" type="number" value="${item.inCart}">
                    <i class="fas fa-times fa-sm"></i>
                    <label class="cart-item__price">$${item.price}</label>
                    <!-- PRICE -->
                    </div>
                    <span class="cart-item__item-total">$${item.inCart * item.price}</span>
                </div>
            </div>
            `
        });

        productContainer.innerHTML += `
        <div class="cart-summary__item">
            <div class="cart-summary__item">
                <label for="cart-summary__count">Item count: ${localStorage.getItem('cartNumbers')} </label>
            </div>
        
            <div class="cart-summary__item">
                <label for="cart-summary__subtotal">Subtotal: $${localStorage.getItem('totalCost')}</label>
            </div>

            <!-- Checkout Button -->
            <div class="cart-summary__item">
                <button class="cart-summary__checkout-button" id="checkout" type="button">
                    Checkout
                </button>
            </div>
        </section>
        `

        
    }
}




function ready(){
    var removeCartItemButtons = document.getElementsByClassName('cart-item__remove-button')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-item__quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
}

function removeCartItem(event) {    
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()    
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal();
}

function updateCartTotal(){
    
    // var itemSubtotals = []
    
    // var itemSubtotal = 0;
    // var items_price = document.querySelectorAll(".cart")

    


    var cartItemContainer = document.getElementsByClassName('cart')[0]
    var cartItems = cartItemContainer.getElementsByClassName('cart-item')
    for (var i = 0; i < cartItems.length; i++){
        var cartItem = cartItems[i]
        var priceElement = cartItem.getElementsByClassName('cart-item__price')[0].innerText
        console.log(priceElement)
        var quantityElement = cartItem.getElementsByClassName('cart-item__quantity')[0]
    
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        itemSubtotal = price * quantity
        subtotal += price * quantity
        cartItems[i].getElementsByClassName('cart-item__item-total').innerText = '$' + itemSubtotal
        // console.log(itemSubtotal)

    }
    document.getElementsByClassName('js_subtotal').innerText = subtotal
    
}

// $(".checkout").toggle();
$("#checkout").click(function(){
    $(".checkout").slideToggle();
})




// Run at Load
onLoadCartNumbers();
displayCart();