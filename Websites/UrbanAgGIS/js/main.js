//$(document).ready(function(){
//    $('ul.menu ul').slideUp();
//    $('ul.menu>li').click(function(){
//        $(this).next('ul').slideToggle();
//        $(this).children('h4').toggleClass('active');
////        $(this).siblings('ul.menu>li').slideToggle();
//    });
//    
//})

            $(document).ready(function() {
            $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false
            });
            });