
let items = [ // our programs
    {
        name: 'Muay Thai',
        tag: 'muaythai',
        price: 12,
        inCart: 0,
        image_path: '/images/landing/program-muaythai.jpg'
    },
    {
        name: 'Yoga',
        tag: 'yoga',
        price: 8,
        inCart: 0,
        image_path: '/images/landing/program-yoga.jpg'
    },
    {
        name: 'HIIT',
        tag: 'hiit',
        price: 10,
        inCart: 0,
        image_path: '/images/landing/program-hiit.jpg'
    }
];

// lists
    let itemsLS // <-- get from Local Storage

    
    let totalLS// <-- 'LS' = get from Local Storage
    let quantityLS //    


function cartQuantityUp(item, action) { // increments 'inCart' Object field in localStorage
    // get current 'CartQuantity' (False if none); parse Int
    let cartQuantityLS = parseInt(localStorage.getItem('cartQuantity')); 
    if(cartQuantityLS) { // if there True
        // then increment; Also, update Cart <i>con
        localStorage.setItem('cartQuantity', cartQuantityLS + 1);
        // update Navbar Cart <icon> itemCount 
        document.querySelector('.nav-cart-count').textContent = cartQuantityLS + 1;
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
    let cartQuantityLS = parseInt(localStorage.getItem('cartQuantity'));
    if(cartQuantityLS) { // if there True
        // then increment; Also, update Cart <i>con
        localStorage.setItem('cartQuantity', cartQuantityLS - 1);
        // update Navbar Cart <icon> itemCount 
        document.querySelector('.nav-cart-count').textContent = cartQuantityLS - 1;
        decreaseItem(item)
    } 
}
function setItems(item){ // updates LocalStorage var 'itemsInCart'
    let cartItemsLS = localStorage.getItem('itemsInCart'); // first, check what's there
    cartItemsLS = JSON.parse(cartItemsLS); // parse to js object
    if (cartItemsLS != null) { // if cart exists
        if (cartItemsLS[item.tag] == undefined) { // if NEW item
            cartItemsLS = {  
                ...cartItemsLS, // append to existing items (rest operator)
                [item.tag]: item // ... this new item
            }
        }
        cartItemsLS[item.tag].inCart += 1; // increase item's count
    } else { // create the cart
        item.inCart = 1; // with this item in it
        cartItemsLS = { 
            [item.tag]: item // 
        }
    }
    // update ItemsInCart into LocalStorage as JSON
    localStorage.setItem("itemsInCart", JSON.stringify(cartItemsLS));
}
function decreaseItem(item){ // get from LS; reduces inCart value in LS 
    let cartItemsLS = localStorage.getItem('itemsInCart'); // first, check what's there
    cartItemsLS = JSON.parse(cartItemsLS); // parse to js object
    if (cartItemsLS != null && cartItemsLS[item.tag].inCart > 1) { // if item exists in cart
        cartItemsLS[item.tag].inCart -= 1; // item's "inCart" value increment
    } 
    // update ItemsInCart into LocalStorage as JSON
    localStorage.setItem("itemsInCart", JSON.stringify(cartItemsLS));
}
// "Remove From Cart" Button
function removeItem(item){
    let cartItemsLS = localStorage.getItem('itemsInCart'); // first, check what's there
    cartItemsLS = JSON.parse(cartItemsLS); // parse to js object
    if (cartItemsLS != null) { // if cart exists

        itemsToRemove = cartItemsLS[item.tag].inCart
        cartItemsLS[item.tag].inCart = 0; // item's "inCart" value increment
    } 
    localStorage.setItem("itemsInCart", JSON.stringify(cartItemsLS));


}
// compute
function totalCost(item,action) {
    
    // let cartCostLS = localStorage.getItem('totalCost');
    
    // if (action == 'increment') {
        
    //     if (cartCostLS != null) {
              
    //         cartCostLS = parseFloat(cartCostLS);
    //         localStorage.setItem('totalCost', cartCostLS + item.price)
            
    //     } 
    // }   
    // else if (action == 'decrement') {
    //         localStorage.setItem('totalCost', cartCostLS - item.price)
    // }   
    // else if (action == 'remove') {
    //     let cartItemsLS = localStorage.getItem('itemsInCart');
    //     let newTotal = 0; // Compute; Into TotalCost -> itemsInCart
    //     Object.values(cartItemsLS).filter(itemLS => {
                
    //         //if (itemLS.tag = item) { // item = 'array'; itemLS = 'object'
    //             newTotal += itemLS.price * itemLS.inCart
    //         //}
    //     localStorage.setItem('totalCost', newTotal)
            
    //     });
    // }
    
}
/// Event Listeners
let carts = document.querySelectorAll('.add-cart') 
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartQuantityUp(items[i]);
        totalCost(items[i],'increment');
        displayCart()
    });
} 
function displayNavBar(){ // refresh NavBar icon 
    let cartQuantityLS = parseInt(localStorage.getItem('cartQuantity'));
    if (cartQuantityLS) { // if Int exists, display it  
        document.querySelector('.nav-cart-count').textContent = cartQuantityLS;
    } 
}
function displayCart() { // refresh HTML 
    // get the div container (input divs here)
    let itemContainer = document.querySelector('.cart-item-container')
    
    let total = 0 // <-- refreshed at DisplayCart()
    let quantity = 0

    // get the ItemsInCart object - convert to JS
    let cartItemsLS = localStorage.getItem("itemsInCart");
    cartItemsLS = JSON.parse(cartItemsLS);


    // if cart is empty -- display links to Programs/Instructors
    if (cartItemsLS == null || parseInt(quantity) <= 0) {
        
        itemContainer.innerHTML = `
            <div class = "cart-empty">
                <h4>The cart is empty, but fear not! Your journey is a click away...</h4>
                <div class = "cart-empty-programs">
                    <button id="empty-cart-to-programs" class="empty-cart-button" type="button">
                        See Our Programs
                    </button>
                </div>
                <div class = "cart-empty-team">
                    <button id="empty-cart-to-team" class="empty-cart-button" type="button">
                        Meet Instructors
                    </button>
                </div>
            </div>
               
            </div>
        `
    }
    // if cart NOT empty - display cart items 
    if (cartItemsLS && itemContainer ) {
        itemContainer.innerHTML = ''
        let dynamicHTML;
        // Object.values() returns an array // "=>" Arrow function expression
        Object.values(cartItemsLS).filter(item => { 
            
            console.log(item)
            console.log(item.tag)
            console.log(item.price)
            console.log(typeof item.price)
            
            quantity += item.inCart
            localStorage.setItem('cartQuantity', quantity)

            total += item.price * item.inCart
            localStorage.setItem('totalCost', total)

            console.log(total)

            // only execute IF 'item' exists in cartItemsLS
            // cartItemsLS < {multiple items: yoga;muaythai = items[].tag}
            if (item.inCart > 0) { // item.tag gets LS item's tag
                let itemImageString = item.image_path
                
                
                // itemImageString = itemImageString.replace("'","")
                console.log(itemImageString)

                itemContainer.innerHTML += `             
                <div class="cart-item">
                    <div class="cart-item__info">
                        <a href="#"><label class="card-item__title">${item.name}.</label></a>
                        <label class="cart-item__date">Date: Oct 30, 2020</label>
                        <label class="cart-item__time">Time: 9:00am - 11:00am</label>
                        <label class="cart-item__instructor">Instructor: Russ Telen</label>
                    </div>
                            <!--  -->
                    <div class="cart-item__image" id="img1" style="background-image: url(${itemImageString});">
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
            }
        });
        
        if (cartItemsLS && quantity > 0) {
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
                    <button id="checkout-to-validate" class="cart-summary__checkout-button" type="button">
                        Checkout
                    </button>
                </div>
            </section>
            `
        }
        {
                // for (var i = 0; i < items.length; i++) {
        //      let item = items[i]
        //      let itemTag = item.tag

        //      if (cartItemsLS.itemTag.inCart > 0) { 
        //         dynamicHTML += `
        //         <div class="cart-item">
        //         <div class="cart-item__info">
        //             <a href="#"><label class="card-item__title">${cartItemsLS[items[i].tag].name}.</label></a>
        //             <label class="cart-item__date">Date: Oct 30, 2020</label>
        //             <label class="cart-item__time">Time: 9:00am - 11:00am</label>
        //             <label class="cart-item__instructor">Instructor: Russ Telen</label>
        //         </div>
        //                 <!--  -->
        //         <div class="cart-item__image" id="img1">
        //             <a href="#">
        //             <!-- <img src="#" alt="muay_thai"> -->
        //             </a>
        //         </div>
        //                 <!--  -->
        //         <div class="cart-item__functions">
        //             <div class="cart-item__remove">
        //                 <button class="cart-item__remove-button" type="button"><i class="far fa-trash-alt"></i> Remove</button>
        //             </div>
        //             <!-- QTY -->
        //             <div class="cart-item__amount">
        //                 <a class="qty-decrement" href="#"><i class="fas fa-arrow-down fa-sm"></i></a>
        //                 <input class="cart-item__quantity" type="number" value="${cartItemsLS[items[i].tag].inCart}">
        //                 <a class="qty-increment" href="#"><i class="fas fa-arrow-up fa-sm"></i></a>
        //                 <i class="fas fa-times fa-sm"></i>
                        
        //             <label class="cart-item__price">$${cartItemsLS[items[i].tag].price}</label>
        //             <!-- PRICE -->
        //             </div>
        //             <span class="cart-item__item-total">$${cartItemsLS[items[i].tag].inCart * cartItemsLS[items[i].tag].price}</span>
        //             </div>
        //         </div>
        //         `
        //     }
        // }
        // itemContainer.innerHTML = dynamicHTML;
        //     }
        // }
        }
        console.log(localStorage.getItem('totalCost'))
        
    }
    // EVENT LISTENER - Arrow UP / INCREASE QTY
    let arrowsUp = document.querySelectorAll('.qty-increment');
    for (let i = 0; i < arrowsUp.length; i++) {
    arrowsUp[i].addEventListener('click', () => {
        cartQuantityUp(items[i]);
        totalCost(items[i],'increment');
        displayCart()
    });
    }
    // EVENT LISTENER - Arrow DOWN / DECREASE QTY
    let arrowsDown = document.querySelectorAll('.qty-decrement');
    for (let i = 0; i < arrowsDown.length; i++) {
    arrowsDown[i].addEventListener('click', () => {        
        let itemsInCartNow = localStorage.getItem('itemsInCart');
        let item = items[i]
        itemsInCartNow = JSON.parse(itemsInCartNow)
        if(itemsInCartNow[item.tag].inCart > 1){
            cartQuantityDown(items[i]); // -1 QUANTITY
            totalCost(items[i],'decrement'); // COMPUTE TOTAL
            displayCart() // REFRESH HTML
        }   
    });
    }
    let removeHTMLElements = document.querySelectorAll('.cart-item__remove-button');
    for (let i = 0; i < removeHTMLElements.length; i++) {
        removeHTMLElements[i].addEventListener('click', () => {
        removeItem(items[i]); // -X QUANTITY
        totalCost(items[i],'remove'); // COMPUTE TOTAL
        displayCart(); // REFRESH HTML
    });
    }

    $(document).ready(function() {
        $("#checkout-to-validate").click(function(){
            $(".checkout-validate").toggle();

            $('html,body').animate({
                scrollTop: $(".checkout").offset().top},
                'slow');
        });
    
        $(".checkout__buttons #login").click(function(){
            $(".checkout-validate").toggle();
            $('.checkout-confirm').toggle();
        });
    
        $('.checkout-confirm').click(function(){
            $('.checkout-confirm').toggle();
            $('.checkout-complete').toggle();
        });
    
    });
}

$(".checkout-validate").toggle();
$(".checkout-confirm").toggle();
$(".checkout-complete").toggle();




// Run at Load
displayNavBar();
displayCart();


