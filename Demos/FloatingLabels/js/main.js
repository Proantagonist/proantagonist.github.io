$(document).ready(function () {
    materialRipple();
    checkInputFields();
    floatingLabels();
});

function materialRipple() {
    $('html').delegate(".fab:not(.disabled), .button:not(.disabled), #off-canvas-menu li, .card[href], nav a, .card", "mousedown", function (e) {
        var offset = $(this).offset();
        var XCoord = (e.pageX - offset.left);
        var YCoord = (e.pageY - offset.top);

        $(this).append($("<div class='ripple ripple-active'></div>").css({
            left: XCoord - 35,
            top: YCoord - 35
        })).on("mouseup", function () {
            $(this).children().next('.ripple.ripple-active').removeClass('ripple-active').on('webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend', function () {
                $(this).remove();
                console.log('deleted');
            });
        });
    });
}

function checkInputFields() {

    var $this = $('input, textarea, select');
    $this.each(function (i) {
        if ($(this).val()) {
            if ($(this).val().length !== 0) {
                $(this).next('label').addClass('changed');
            }
        }
    });
}

function floatingLabels() {
    $('input , textarea, select').on('keyup keypress change', function () {
        $(this).next('label').addClass('changed');
        if ($(this).val().length === 0) {
            $(this).next('label').removeClass('changed');
        }
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