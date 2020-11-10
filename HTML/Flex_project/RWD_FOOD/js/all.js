$(document).ready(function() {
  $('.menu-icon').click(function() {
    $(this).toggleClass ('animated');
    $('.inside-menu').slideToggle(500);
  });
  // $('.fa-heart').click(function() {
  //   $(this).toggleClass("colored");
  // });
})