$(document).ready(function() {
  $("#tweet").keyup(function() {
    let counter = $(this).val().length;
    let newVal = 140 - counter;
    $($(this).siblings('span')).text(newVal);

    // Toggle between classes for negative/positive values
    if (newVal < 0) {
      $($(this).siblings('span')).addClass('negativeCounter').removeClass('counter');
    } else {
      $($(this).siblings('span')).removeClass('negativeCounter').addClass('counter');
    }
  });
});