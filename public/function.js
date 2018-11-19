$(document).ready(function() {
  $("nav [href]").each(function() {
      if (this.href == window.location.href) {
          $(this).addClass("active");
      }
  });

  $(".item-container:odd").addClass("yellow");
  $(".item-container:even").addClass("cyan");
});

function validatePassword(password){
    let passwordValid = false;

    let hasNumber = /\d/.test(password);
    let hasCapital = /[A-Z]/.test(password);
    let hasFourChar = password.length > 3;

    passwordValid = hasNumber && hasCapital && hasFourChar;

    (hasNumber) ? $('.number').addClass('green') : $('.number').removeClass('green');
    (hasCapital) ? $('.capital').addClass('green') : $('.capital').removeClass('green');
    (hasFourChar) ? $('.characters').addClass('green') : $('.characters').removeClass('green');
    (!passwordValid) ? $('#register-btn').addClass('inactive') : $('#register-btn').removeClass('inactive');
    
}