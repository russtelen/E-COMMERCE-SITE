if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName('cart-item__remove-button')
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = documents.getElementsByClassName('cart-item__quantity')
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
    var itemSubtotal = 0;
    var subtotal = 0;
    var cartItemContainer = document.getElementsByClassName('cart')[0]
    var cartItems = cartItemContainer.getElementsByClassName('cart-item')
    for (var i = 0; i < cartItems.length; i++){
        var cartItem = cartItems[i]
        var priceElement = cartItem.getElementsByClassName('cart-item__price')[0]
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
