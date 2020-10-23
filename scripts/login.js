const openTab = (e, tabName) => {
  // declare all variables
  var i, login__tab, login__btn;

  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

  // get all element with class="login__form" and hide them
  login__tab = document.getElementsByClassName("login__tab");
  for (i = 0; i < login__tab.length; i++) {
    login__tab[i].style.display = "none";
  }

  // Get all elements with class="login_btn" and remove the class "active"
  login__btn = document.getElementsByClassName("login__btn");
  for (i = 0; i < login__btn.length; i++) {
    login__btn[i].className = login__btn[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  e.currentTarget.className += " active";
};

$(document).ready(function () {
  $(".login__btn").click(function (e) {
    e.preventDefault();
    $(".login__form").removeClass("active").addClass("noactive");
    $(this).siblings().addClass("active").removeClass("noactive");
  });
});