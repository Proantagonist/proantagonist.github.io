$(document).ready(function () {
    floatingLabels();
    menuAnims();
    formSubmitInitialize();
    smoothScrolling();
});
$(document).ajaxComplete(function () {
    floatingLabels();
});

function formSubmitInitialize() {
    $('.card.form').on("keyup", function (e) {
        if (e.keyCode == 13) {
            $(this).find('.button:first').trigger('click');
        }
    });
}

function floatingLabels() {
    //Checks for content in input fields on page load.
    var $this = $('input, textarea, select');
    $this.each(function (i) {
        if ($(this).val()) {
            if ($(this).val().length !== 0) {
                $(this).next('label').addClass('changed');
            }
        }
    });
    //listens for changes in content fields and applies floating label
    //    $('input , textarea, select').on('keyup keypress change', function () {
    $('html').delegate('input , textarea, select', 'keyup keypress change', function () {
        $(this).next('label').addClass('changed');
        if ($(this).val().length === 0) {
            $(this).next('label').removeClass('changed');
        }
    });
}

function notification(messageText, action, link) {
    if (action) {
        $('html').append("<div class='notification action animate-in'><span class='message'>" + messageText + "</span><a href='" + link + "' class='action'>" + action + "</a></div>");
    }
    else {
        $('html').append("<div class='notification animate-in'><span class='message'>" + messageText + "</span></div>");
    }

    function removeAnimateIn() {
        $('.notification').removeClass('animate-in');
    }

    function addAnimateOut() {
        $('.notification').addClass('animate-out');
    }

    function removeNotification() {
        $('.notification').remove();
    }
    ////////////////////////TIMING PROPERTIES////////////////////////
    window.setTimeout(removeAnimateIn, 250);
    window.setTimeout(addAnimateOut, 9250);
    window.setTimeout(removeNotification, 9500);
}

function menuAnims() {
    //[DE]ACTIVATION FOR BOTH BUTTON AND SLIDING OFF-CANVAS MENU
    $('nav #menu-button-container').on("click", function () {
        recycler();
        if (!$(this).children().hasClass('active')) {
            $(this).children().addClass('active');
            $('nav#off-canvas-menu').addClass('active');
            $('html').append("<div id='modal-bg'></div>").delay(1).queue(function () {
                $('#modal-bg').addClass('active');
                $(this).addClass('modal-open');
                initializer();
                $(this).dequeue();
            });
        }
        else {
            $(this).children().removeClass('active').addClass('deactivate');
            $('nav#off-canvas-menu').removeClass('active');
            $('html').removeClass('modal-open');
            $('#modal-bg').removeClass('active').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                recycler();
            });
        }
    });
    $('nav#off-canvas-menu li').click(function () {
        $('nav #menu-button-container').children().removeClass('active').addClass('deactivate');
        $('nav#off-canvas-menu').removeClass('active');
        $('html').removeClass('modal-open');
        $('#modal-bg').removeClass('active').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
            recycler();
        });
    });
    $('#notifications-toggle').click(function () {
        $(this).toggleClass('hide-tooltip');
    });
}

function initializer() {
    $('#modal-bg').click(function () {
        $('nav #menu-button-container').children().removeClass('active').addClass('deactivate');
        $('nav#off-canvas-menu').removeClass('active');
        $('html').removeClass('modal-open');
        $('#modal-bg').removeClass('active').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
            recycler();
        });
    });
}

function recycler() {
    $('html').find('#modal-bg:not(.active), #info-modal:not(.slide-in), #info-modal.transparent-out').remove();
    $('html').removeClass('modal-open');
}

function smoothScrolling() {
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 450);
                return false;
            }
        }
    });
}