/* Navbar scroll */

$(function(){

  var nav = $('.navbar'),
    doc = $(document),
    win = $(window);

  win.scroll(function() {

  });

  win.scroll();

});


$(document).on('click','#btn-edit-main', function (){
  let dishes = $(document.getElementById("edit-bar-dishes"));
  let menus = $(document.getElementById("edit-bar-menus"));

  if (!dishes.is(':hover')){
    dishes.hide('fast')
  }
  if (!menus.is(':hover')){
    menus.hide('fast')
  }
});

/* ***** Btn Edit ***** */
$(document).on('click','#btn-edit-dishes',function (){
  console.log("clicked");
  let edit = $(document.getElementById("edit-bar-dishes"));
  edit.show("slow");
  edit.on('mouseleave',async function () {
    await new Promise(r => setTimeout(r, 1000));
    if (!edit.is(":hover")){
      edit.hide("slow");
    }
  })
});


$(document).on('click','#btn-edit-menus',function (){
  console.log("clicked");
  let edit = $(document.getElementById("edit-bar-menus"));
  edit.show("slow");
  edit.on('mouseleave',async function () {
    await new Promise(r => setTimeout(r, 1000));
    if (!edit.is(":hover")){
      edit.hide("slow");
    }
  })
});


/* ***** Btn More-Less ***** */
$("#more").click(function(){
  var $this = $(this);
  $this.toggleClass('more');
  if($this.hasClass('more')){
    $this.text('More');
  } else {
    $this.text('Less');
  }
});


/* ***** Slideanim  ***** */
$(window).scroll(function() {
  $(".slideanim").each(function(){
    var pos = $(this).offset().top;

    var winTop = $(window).scrollTop();
    if (pos < winTop + 600) {
      $(this).addClass("slide");
    }
  });
});


/* ***** Smooth Scrolling  ***** */
$(document).ready(function(){
  $(".navbar a, #service a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){

        window.location.hash = hash;
      });
    }
  });


  /* ***** Scroll to Top ***** */
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 300) {
      $('.to-top').fadeIn(200);
    } else {
      $('.to-top').fadeOut(200);
    }
  });
  $('.to-top').click(function() {
    $('.body,html').animate({
      scrollTop : 0
    }, 500);
  });

})
