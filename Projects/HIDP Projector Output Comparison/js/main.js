$(document).ready(function () {
    selectWatch();
});

function materialRipple() {
    //    $('html').delegate(".button, .md-link:not(.disabled), #off-canvas-menu li, .ripples, .fab:not(.disabled)", "touchstart mousedown", function (e) {
    //        var offset = $(this).offset();
    //
    //        if (e.originalEvent.type == 'touchstart') {
    //            e.stopPropagation();
    //            handlePreventDefault(this, e);
    //            var XCoord = (e.originalEvent.touches[0].pageX - offset.left);
    //            var YCoord = (e.originalEvent.touches[0].pageY - offset.top);
    //        } else {
    //            var XCoord = (e.pageX - offset.left);
    //            var YCoord = (e.pageY - offset.top);
    //        }
    //
    //        if ($(this).outerWidth() < 199) {
    //            if ($(this).children().size() === 0) {
    //                $(this).append('<span></span>');
    //            }
    //            $(this).children().append($("<div class='ripple ripple-active'></div>").css({
    //                left: XCoord - 4.5,
    //                top: YCoord - 2,
    //                height: $(this).width() * .20,
    //                width: $(this).width() * .20
    //            }));
    //            $(this).on("touchend mouseup", function () {
    //                $(this).find('.ripple.ripple-active').removeClass('ripple-active').on('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd transitionEnd', function () {
    //                    $(this).remove();
    //                });
    //            });
    //        } else {
    //            if ($(this).children().size() === 0) {
    //                $(this).append('<span></span>');
    //            }
    //            $(this).children().append($("<div class='ripple ripple-active'></div>").css({
    //                left: XCoord - 4.5,
    //                top: YCoord - 2,
    //                height: $(this).width() * .05,
    //                width: $(this).width() * .05
    //            }));
    //            $(this).on("touchend mouseup", function () {
    //                $(this).find('.ripple.ripple-active').removeClass('ripple-active').on('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd transitionEnd', function () {
    //                    $(this).remove();
    //                });
    //            });
    //        }
    //    });
} // Currently does not work well with OSX's Safari

function notification(messageText, action, link) {

    if (action) {
        $('html').append("<div class='notification action animate-in'><span class='message'>" + messageText + "</span><a href='" + link + "' class='action'>" + action + "</a></div>");
    } else {
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

function selectWatch() {
    var step = 1;

    $('select').change(function () {
            var inputValue = $(this).val();

            var path = window.location.origin + '/img/' + inputValue + '/' + inputValue + '-' + step + '.jpg';

            function UrlExists(url) {
                var http = new XMLHttpRequest();
                http.open('HEAD', url, false);
                http.send();
                return http.status != 404;
            }

            if (UrlExists(path)) {
                $(this).parent().find('.image-container').css('background-image', 'url(' + path + ')');
                }

            });
    }