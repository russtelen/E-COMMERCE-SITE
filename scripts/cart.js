if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    read()
}

function ready(){

    var removeCartItemButtons = document.getElementsByClassName('card-remove-button')
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', function(event) {
        
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.parentElement.remove()
        updateCartTotal()    
        })
    }
}



function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('')
}



$(".checkout").toggle();
$("#checkout").click(function(){
    $(".checkout").toggle();
})
