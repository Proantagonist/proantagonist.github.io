$(document).ready(function(){
    $('ul.menu ul').slideUp();
    $('ul.menu>li').click(function(){
        $(this).next('ul').slideToggle();
        $(this).children('h4').toggleClass('active');
//        $(this).siblings('ul.menu>li').slideToggle();
    });
    
})
