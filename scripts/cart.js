let items = [
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
// collection - Cart Buttons

// define var - increase qty
// Page Refresh: update NavBar Cart itemCount from LocalStorage itemCount

function cartQuantity(item, action) { // increments 'inCart' Object field in localStorage
    // get current 'CartQuantity' (False if none); parse Int
    let itemQuantity = parseInt(localStorage.getItem('cartQuantity'));
    if(itemQuantity) { // if there True
        // then increment; Also, update Cart <i>con
        localStorage.setItem('cartQuantity', itemQuantity + 1);
        // update Navbar Cart <icon> itemCount 
        document.querySelector('.nav-cart-count').textContent = itemQuantity + 1;
    } else { // False (NaN), then create 
        localStorage.setItem('cartQuantity', 1);
        // update Navbar Cart <icon> itemCount (initialize)
        document.querySelector('.nav-cart-count').textContent = 1;
    }
    // 
    setItems(item);
}
function cartQuantityDown(item){
   // get current 'CartQuantity' (False if none); parse Int
    let itemQuantity = parseInt(localStorage.getItem('cartQuantity'));
    if(itemQuantity) { // if there True
        // then increment; Also, update Cart <i>con
        localStorage.setItem('cartQuantity', itemQuantity - 1);
        // update Navbar Cart <icon> itemCount 
        document.querySelector('.nav-cart-count').textContent = itemQuantity - 1;
        decreaseItem(item)
    } 
    
}
function setItems(item){ // updates LocalStorage var 'itemsInCart'
    let cartItems = localStorage.getItem('itemsInCart'); // first, check what's there
    cartItems = JSON.parse(cartItems); // parse to js object
    if (cartItems != null) { // if cart exists
        if (cartItems[item.tag] == undefined) { // if NEW item
            cartItems = {  
                ...cartItems, // append to existing items (rest operator)
                [item.tag]: item // ... this new item
            }
        }
        cartItems[item.tag].inCart += 1; // increase item's count
    } else { // create the cart
        item.inCart = 1; // with this item in it
        cartItems = { 
            [item.tag]: item // 
        }
    }
    // update ItemsInCart into LocalStorage as JSON
    localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
}
function decreaseItem(item){
    let cartItems = localStorage.getItem('itemsInCart'); // first, check what's there
    cartItems = JSON.parse(cartItems); // parse to js object
    if (cartItems != null && cartItems[item.tag].inCart > 1) { // if item exists in cart
        cartItems[item.tag].inCart -= 1; // item's "inCart" value increment
    } else { // if this type of item doesn't exist in cart
        item.inCart = 1; // item's count initialized
        cartItems = { 
            [item.tag]: item // 
        }
    }
    // update ItemsInCart into LocalStorage as JSON
    localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
}
// "Remove From Cart" Button
function removeItem(item){
    let cartItems = localStorage.getItem('itemsInCart'); // first, check what's there
    cartItems = JSON.parse(cartItems); // parse to js object
    if (cartItems != null) { // if item exists in cart
        cartItems[item.tag].inCart = 0; // item's "inCart" value increment
    } 
    localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
}

// Computational Functions
function totalCost(item,action) {
    // console.log("The item price is", item.price);
    let cartCost = localStorage.getItem('totalCost');
    
    if (action == 'increment') {
        if (cartCost != null) {
            
            cartCost = parseFloat(cartCost);
            localStorage.setItem('totalCost', cartCost + item.price)
            // depending on 'action' (upArrow,downArrow,removeButton)
            
        } else {
            localStorage.setItem("totalCost", item.price);
        }
    
    } else if (action == 'decrement') {
        //
        localStorage.setItem('totalCost', cartCost - item.price)
    }
    
    
    
}
/// Event Listeners & Display function below
let carts = document.querySelectorAll('.add-cart') 
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartQuantity(items[i]);
        totalCost(items[i],'increment');
        displayCart()
    });
} 
function displayNavBar(){ // CALLED at END of script
    let itemQuantity = parseInt(localStorage.getItem('cartQuantity'));
    if (itemQuantity) { // if Int exists, display it  
        document.querySelector('.nav-cart-count').textContent = itemQuantity;
    } 
}
function displayCart() {
    let cartItems = localStorage.getItem("itemsInCart");
    cartItems = JSON.parse(cartItems);
   
    let itemContainer = document.querySelector('.cart-item-container')
    //itemContainer.innerHTML = ``;

    console.log(cartItems);    
    if (cartItems && itemContainer ) {
        itemContainer.innerHTML = ''
        Object.values(cartItems).filter(item => {
            itemContainer.innerHTML += `
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
                        <a class="qty-decrement" href="#"><i class="fas fa-arrow-down fa-sm"></i></a>
                        <input class="cart-item__quantity" type="number" value="${item.inCart}">
                        <a class="qty-increment" href="#"><i class="fas fa-arrow-up fa-sm"></i></a>
                        <i class="fas fa-times fa-sm"></i>
                        
                    <label class="cart-item__price">$${item.price}</label>
                    <!-- PRICE -->
                    </div>
                    <span class="cart-item__item-total">$${item.inCart * item.price}</span>
                </div>
            </div>
            `
        });

        

        itemContainer.innerHTML += `
        <div class="cart-summary__item">
            <div class="cart-summary__item">
                <label for="cart-summary__count">Item count: ${localStorage.getItem('cartQuantity')} </label>
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

    // Add EventListeners to dynamically created HTML 
    let arrowsUp = document.querySelectorAll('.qty-increment');
    for (let i = 0; i < arrowsUp.length; i++) {
    arrowsUp[i].addEventListener('click', () => {
        console.log("arrow")
        cartQuantity(items[i]);
        totalCost(items[i],'increment');
        displayCart()
    });
    }
    let arrowsDown = document.querySelectorAll('.qty-decrement');
    for (let i = 0; i < arrowsDown.length; i++) {
    arrowsDown[i].addEventListener('click', () => {        
        let itemsInCartNow = localStorage.getItem('itemsInCart');
        itemsInCartNow = JSON.parse(itemsInCartNow)
        // console.log(muaythai)
        console.log(itemsInCartNow) // must access object :  
        console.log(itemsInCartNow.muaythai) // must access object :  
        console.log(itemsInCartNow.muaythai.inCart); // what we need

        console.log(items[0])
        console.log(items[0].tag) // ENTER THIS as dynamic reference
        // console.log(JSON.parse(localStorage.getItem('itemsInCart'))[i].tag).inCart;
        // if(itemsInCartNow[i].inCart > 1){
            cartQuantityDown(items[i]);
            totalCost(items[i],'decrement');
            displayCart()
        // }        
    });
    }
    let removeItem = document.querySelectorAll('.cart-item__remove-button');
    for (let i = 0; i < removeItem.length; i++) {
    removeItem[i].addEventListener('click', () => {

        removeItem(items[i]);
        console.log("button")
        totalCost(items[i]);
        displayCart();
    });
    }

    console.log("display refreshed " + items[0]);

}


// $(".checkout").toggle();
$("#checkout").click(function(){
    $(".checkout").slideToggle();
})




// Run at Load
displayNavBar();
displayCart();


