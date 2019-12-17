$(document).ready(function() {
  $("#tweet").keyup(function() {
    let counter = $(this).val().length;
    let newVal = 140 - counter;
    this.parentNode.childNodes[5].innerHTML = newVal;
    if (newVal < 0) {
      $(this.parentNode.childNodes[5]).addClass('negativeCounter').removeClass('counter');
    } else {
      $(this.parentNode.childNodes[5]).removeClass('negativeCounter').addClass('counter');
    }
  });
});