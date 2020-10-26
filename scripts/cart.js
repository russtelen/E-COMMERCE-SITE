
let items = [ // our programs
    {
        name: 'Muay Thai',
        tag: 'muaythai',
        price: 12,
        inCart: 0,
        image_path: '/images/landing/program-muaythai.jpg',
        id: 0
    },
    {
        name: 'Yoga',
        tag: 'yoga',
        price: 8,
        inCart: 0,
        image_path: '/images/landing/program-yoga.jpg',
        id: 1
    },
    {
        name: 'HIIT',
        tag: 'hiit',
        price: 10,
        inCart: 0,
        image_path: '/images/landing/program-hiit.jpg',
        id: 2
    }
];

// lists
    let itemsLS // <-- get from Local Storage

    
    let totalLS// <-- 'LS' = get from Local Storage
    let quantityLS //    


function cartQuantityUp(item) { // increments 'inCart' Object field in localStorage
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
                // get length of cartItemsLS (cartItemsLS.length)
                // (add INDEXES to the Objects (by tagname))
                // Run LOOP, check if ADDED ITEM's INDEX is Greater than the Existing Item Looped
                // (basically re-add everything into the cart, up to the point where item.index > items[i].index)
                // once added, add the rest of cartItemsLS
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
                <h4 class="cart-h4">The cart is empty, but fear not! Your journey is a click away...</h4>
                <div class="cart-empty__buttons">
                    <div class = "cart-empty__button-programs">
                        <button id="empty-cart-to-programs" class="empty-cart-button" type="button">
                            See Our Programs
                        </button>
                    </div>
                    <div class = "cart-empty__button-team">
                        <button id="empty-cart-to-team" class="empty-cart-button" type="button">
                            Meet Instructors
                        </button>
                    </div>
                </div>
            </div>
               
            </div>
        `
    }
    // if cart NOT empty - display cart items 
    if (cartItemsLS && itemContainer ) {
        itemContainer.innerHTML = ''
        
        // Object.values() returns an array // "=>" Arrow function expression
        Object.values(cartItemsLS).filter(item => { 
                        
            quantity += item.inCart
            localStorage.setItem('cartQuantity', quantity)

            total += item.price * item.inCart
            localStorage.setItem('totalCost', total)

            // only execute IF 'item' exists in cartItemsLS
            // cartItemsLS < {multiple items: yoga;muaythai = items[].tag}
            if (item.inCart > 0) { // item.tag gets LS item's tag
                let itemImageString = item.image_path
                // itemImageString = itemImageString.replace("'","")
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
                            <!-- ITEM TOTAL (QTY X PRICE) -->
                        </div>
                        <span class="cart-item__item-total">$${item.inCart * item.price}</span>
                        <!-- QTY -->
                        <div class="cart-item__amount">
                            <!-- ITEM QUANTITY -->
                            <div class="cart-item__quantity"> 
                                <a id="qty-increment-${item.tag}"><i class="fas fa-arrow-circle-up"></i></a>    
                                <label class="cart-item__quantity__value">${item.inCart}</label>
                                <a id="qty-decrement-${item.tag}"><i class="fas fa-arrow-circle-down"></i></a>
                            </div>
                            <i class="fas fa-times fa-sm"></i>
                            <!-- ITEM PRICE -->
                            <label class="cart-item__price">$${item.price}</label>
                        </div>
                        
                    </div>
                </div>
                `
                // "Event Delegation" - Adds Quantity, but Loops Too Many Times (adding extra event listeners??)
                // ---- UP ARROWS (QTY +1; New Total; Refresh Cart)
                $(document).off('click', '#qty-increment-'+item.tag); // first, remove previously added event listener       
                $(document).on('click', '#qty-increment-'+item.tag, function() { // then, add it again
                    cartQuantityUp(item);
                    totalCost(item,'increment');
                    displayCart()
                });
                // ---- DOWN ARROW (QTY -1; New Total; Refresh Cart)
                $(document).off('click', '#qty-decrement-'+item.tag); // first, remove previously added event listener       
                $(document).on('click', '#qty-decrement-'+item.tag, function() { // then, add it again
                    console.log("arrow down");
                    if(cartItemsLS[item.tag].inCart > 1){
                        console.log("arrow down IF");
                        cartQuantityDown(item); // -1 QUANTITY
                        totalCost(item,'decrement'); // COMPUTE TOTAL
                        displayCart() // REFRESH HTML
                    }   
                });


                // get the tag id dynamically added above 
                // let arrowUp = document.getElementById('qty-increment-' + item.tag);
                // // for (let i = 0; i < arrowsUp.length; i++) {
                // console.log(arrowUp);
                // // console.log(arrowsUp.length);
                // arrowUp.addEventListener('click', () => {
                //     console.log("arrow up");
                //     cartQuantityUp(item);
                //     totalCost(item,'increment');
                //     displayCart()
                // });
                // }
            }
            
        });
        
        if (cartItemsLS && quantity > 0) {
            itemContainer.innerHTML += `
            <div class="cart-summary">
                <div class="cart-summary__item">
                    <label class="cart-summary__subtotal">Subtotal   <span class="cart-summary__subtotal__value">$${localStorage.getItem('totalCost')}</span></label>
                </div> 
            
                <div class="cart-summary__item">
                    <label class="cart-summary__count">Item count   <span class="cart-summary__count__value">${localStorage.getItem('cartQuantity')}</span></label>
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
    }
    // EVENT LISTENER - Arrow UP / INCREASE QTY
    // let arrowsUp = document.querySelectorAll('.qty-increment');
    // for (let i = 0; i < arrowsUp.length; i++) {
    // arrowsUp[i].addEventListener('click', () => {
    //     cartQuantityUp(items[i]);
    //     totalCost(items[i],'increment');
    //     displayCart()
    // });
    // }
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
        // when clicking 'Checkout' button, display Login section (to validate)
        $("#checkout-to-validate").click(function(){
            $(".checkout__validate").toggle();
            // scroll to Checkout section
            $('html,body').animate({
                scrollTop: $(".checkout").offset().top},
                'slow');
        });
        // when clicking 'Login' button,
        //  --- hide the Login section
        //  --- display the Confirm Order section
        $(".checkout__buttons #login").click(function(){
            // input validate (just no blanks)
            let emailInput = document.getElementById('checkout-validate__email').value;
            let passwordInput = document.getElementById('checkout-validate__password').value;
            
            let itemsInCartConfirm = document.getElementById('checkout-confirm__items-in-cart');
            let cartItemsLS = JSON.parse(localStorage.getItem('itemsInCart'));

            // if validation passes; make sure this is blank.
            // else fails, input error message.
            let errorContainer = document.querySelector('.error-message')
            let confirmSubtotalContainer = document.querySelector('.confirm_subtotal')
            let cartSubtotalLS = parseInt(localStorage.getItem('totalCost'))
            
            if (emailInput == "" || passwordInput == "") {
                errorContainer.innerHTML = "Please input an email and password (no blanks)";                

            } else {
                $(".checkout__validate").toggle();
                $('.checkout__confirm').toggle();
                
                errorContainer.innerHTML = "";
                confirmSubtotalContainer.innerHTML = cartSubtotalLS;
                
                itemsInCartConfirm.innerHTML = "";
                
                Object.values(cartItemsLS).filter(item => {
                itemsInCartConfirm.innerHTML += `
                    <label>${item.name}: ${item.inCart} x $${item.price}</label><br>
                `
                });
            }

            

            // add display of Order total. 
            // (bonus) display list of items

        });
    
        // when clicking "Complete Order", 
        // --- display Thank You message
        // --- clear the Internal Storage
        // --- refresh display (so Cart disappears)
        $('.checkout__confirm').click(function(){
            $('.checkout__confirm').toggle();
            $('.checkout__complete').toggle();

            localStorage.clear();
            location.reload();

            $(document).ready(function() {
            $('html,body').animate({
                scrollTop: $(".navbar").offset().top},
                'fast');
            });
        });

        // ensure that clicking 'Add To Cart' keeps the Thank You section toggledOff
        // $('.add-cart').click(function(){
        //     if (log($('.checkout-complete').is(':visible'))) {
        //         $('.checkout-complete').toggle();
        //     };

        // });
    });
}


// maintain scroll position at refresh
// $(window).scroll(function () {
//     sessionStorage.scrollTop = $(this).scrollTop();
// });
// $(document).ready(function () {
//     if (sessionStorage.scrollTop != "undefined") {
//         $(window).scrollTop(sessionStorage.scrollTop);
//     }
// });

// At page load, keep these sections hidden
$(".checkout__validate").toggle();
$(".checkout__confirm").toggle();
$(".checkout__complete").toggle();

// Run at Load
displayNavBar();
displayCart();


