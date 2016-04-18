$(document).ready(function () {
    materialRipple(),
        floatingLabels(),
        setActivePage(),
        menuAnims(),
        modalPaneGeneric(),
        modalPaneAdd(),
        formSubmitInitialize();
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

function materialRipple() {
    $('html').delegate(".fab:not(.disabled), .button:not(.disabled), #off-canvas-menu li, .ripples", "touchstart mousedown", function (e) {
        var offset = $(this).offset();

        if (e.originalEvent.type == 'touchstart') {
            e.stopPropagation();
            handlePreventDefault(this, e);
            var XCoord = (e.originalEvent.touches[0].pageX - offset.left);
            var YCoord = (e.originalEvent.touches[0].pageY - offset.top);
        } else {
            var XCoord = (e.pageX - offset.left);
            var YCoord = (e.pageY - offset.top);
        }

        if ($(this).outerWidth() < 199) {
            if ($(this).children().size() === 0) {
                $(this).append('<span></span>');
            }
            $(this).children().append($("<div class='ripple ripple-active'></div>").css({
                left: XCoord - 4.5,
                top: YCoord - 2,
                height: $(this).width() * .20,
                width: $(this).width() * .20
            }));
            $(this).on("touchend mouseup", function () {
                $(this).find('.ripple.ripple-active').removeClass('ripple-active').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                    $(this).remove();
                });
            });
        } else {
            if ($(this).children().size() === 0) {
                $(this).append('<span></span>');
            }
            $(this).children().append($("<div class='ripple ripple-active'></div>").css({
                left: XCoord - 4.5,
                top: YCoord - 2,
                height: $(this).width() * .05,
                width: $(this).width() * .05
            }));
            $(this).on("touchend mouseup", function () {
                $(this).find('.ripple.ripple-active').removeClass('ripple-active').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                    $(this).remove();
                });
            });
        }
    });
}

function handlePreventDefault(element, event) {
    $(element).on('click mousedown',function () {
        event.stopPropagation();
        event.preventDefault();
    });
}

//function materialRipple() {
//        $('html').delegate(".fab:not(.disabled), .button:not(.disabled), #off-canvas-menu li, .ripples", "mousedown", function (e) {
//
//        var offset = $(this).offset();
//        var XCoord = (e.pageX - offset.left);
//        var YCoord = (e.pageY - offset.top);
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
//            $(this).on("mouseup", function () {
//                $(this).find('.ripple.ripple-active').removeClass('ripple-active').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
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
//            $(this).on("mouseup", function () {
//                $(this).find('.ripple.ripple-active').removeClass('ripple-active').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
//                    $(this).remove();
//                });
//            });
//        }
//    });
//}

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
    $('html').delegate('input , textarea, select', 'keyup keypress change', function () {
        $(this).next('label').addClass('changed');
        if ($(this).val().length === 0) {
            $(this).next('label').removeClass('changed');
        }
    });

}

function notification(classString, messageText) {
    //notification accepts CSS class and message. Notification color can be changed in CSS per class, default color is dark grey
    $('html').append("<div class='notification " + classString + " animate-in'>" + messageText + "</div>");

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

function setActivePage() {
    $("#link" + pageTitle).removeClass().addClass('active');
    $('#sectionLabel').html('<h2>' + $('nav#section-nav li a.active').text() + '</h2>')
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
        } else {
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

    $('#ellipsis').click(function () {
        $('nav#section-nav').toggleClass('expanded');
    });
}



function recycler() {
    $('html').find('#modal-bg:not(.active), #info-modal:not(.slide-in)').remove();
    $('html').removeClass('modal-open');
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

function modalPreload() {
    $('html').append("<div id='info-modal'></div>").addClass('modal-open').delay(20).queue(function () {
        $('#info-modal').addClass('slide-in');
        $(this).dequeue();
    });
}

function modalCommonInteractions() {
    $("#modal-close-button-container").click(function () {
        $("#info-modal").removeClass("slide-in").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
            recycler();
        });
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            $('.button:first').trigger('click');
        }

        if (e.keyCode == 27) {
            $("#info-modal").removeClass("slide-in").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                recycler();
            });
        }
    });
}

function modalPaneGeneric() {
    $('table').delegate(".clickableRow", "click", function () {
        var rowData = $(this).attr('data');
        $('html').append("<div id='info-modal'></div>").addClass('modal-open').delay(20).queue(function () {
            $('#info-modal').addClass('slide-in');
            $(this).dequeue();
        });
        var dir = (window.location.pathname).substring(0, window.location.pathname.lastIndexOf('/'));
        $('#info-modal').load(dir + "/Modal.aspx .modal-container",
            function () {
                $('#info-modal').children().addClass('container12');
                $('#info-modal').children().prepend('<span id="close-help">Press "esc" to close.</span><div title="Close" id="modal-close-button-container"><span id="modal-close-button"></span></div>');

                ModalInit(rowData);

                $("#modal-close-button-container").click(function () {
                    $("#info-modal").removeClass("slide-in").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                        recycler();
                    });
                });

                $(document).keyup(function (e) {
                    if (e.keyCode == 27) {
                        $("#info-modal").removeClass("slide-in").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                            recycler();
                        });
                    }

                    if (e.keyCode == 13 && !$('#info-modal').find('.form')) {
                        $('.button:first').trigger('click');
                    } else if (e.keyCode == 13 && $('#info-modal').find('.form')) {
                        $(this.activeElement).parent().parent().find('.button:first').trigger('click');
                    }
                })
            });
    });
}

function modalPaneAdd() {
    /*Separate functions needed because of the differing content fragment*/
    $('#Add:not(.disabled)').click(function () {
        $('html').append("<div id='info-modal'></div>").addClass('modal-open').delay(20).queue(function () {
            $('#info-modal').addClass('slide-in');
            $(this).dequeue();
        });

        var dir = (window.location.pathname).substring(0, window.location.pathname.lastIndexOf('/'));
        $('#info-modal').load(dir + "/Modal.aspx .modal-add",
            function () {
                if ($("#Add").hasClass('ck-req')) {
                    CKEDITOR.replace('txtBody');
                }
                $('#info-modal').children().addClass('container12');
                $('#info-modal').children().prepend('<span id="close-help">Press "esc" to close.</span><div title="Close" id="modal-close-button-container"><span id="modal-close-button"></span></div>');

                $("#modal-close-button-container").click(function () {
                    $("#info-modal").removeClass("slide-in").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                        recycler();
                    });
                });



                $(document).keyup(function (e) {
                    if (e.keyCode == 27) {
                        $("#info-modal").removeClass("slide-in").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                            recycler();
                        });
                    }

                    if (e.keyCode == 13) {
                        $('.button:first').trigger('click');
                    }
                })

                if (typeof LoadAddData !== 'undefined' && typeof LoadAddData === 'function') {

                    if ($.isFunction(LoadAddData)) {
                        LoadAddData();
                    }
                }

            });
    });
}

function loadBasicForm() {
    var pathToREST = baseRestUrl + "Form/Get/?appId=" + appId;
    $.getJSON(pathToREST, {})
        .done(function (data, status, jqHXR) {
            var content;

            $.each(data.questions, function (i, item) {
                if (item.questionInputType === "YesNoMaybe") {
                    content = "";
                    content += "<div class='form-input' questionID=" + item.questionId + " type='" + item.questionInputType + "'>";
                    content += "<div>";
                    content += "<p>" + item.questionText + "</p>";
                    content += "<div class='radio-group'><input type='radio' name='" + item.questionId + "' value='Yes'><i></i><span>Yes</span></div>";
                    content += "<div class='radio-group'><input type='radio' name='" + item.questionId + "' value='No'/><i></i><span>No</span></div>";
                    content += "<div class='radio-group'><input type='radio' name='" + item.questionId + "' value='Maybe'/><i></i><span>Maybe</span></div>";
                    content += "</div>";
                    content += "</div>"

                } else if (item.questionInputType === "Spinner") {
                    var options = "";
                    $.each(item.possibleAnswers, function (i, option) {
                        options += "<option value='" + option.possibleAnswer + "'>" + option.possibleAnswer + "</option>";
                    });

                    content = "";
                    content += "<div class='form-input' questionID=" + item.questionId + " type='" + item.questionInputType + "'>";
                    content += "<div>";
                    content += "<p>" + item.questionText + "</p>";
                    content += "<select>";
                    content += "<option value='null'>--Select Option--</option>";
                    content += options;
                    content += "</select>";
                    content += "</div>";
                    content += "</div>"

                } else if (item.questionInputType === "Stepper") {
                    content = "";
                    content += "<div class='form-input' questionID=" + item.questionId + " type='" + item.questionInputType + "'>";
                    content += "<div>";
                    content += "<p>" + item.questionText + "</p>";
                    content += "<input type='number' value='0'>";
                    content += "</div>"
                    content += "</div>"
                }

                //                $('.large-form').append(content);
                $(content).insertAfter('.large-form h2')

            });
        })
        .fail(function (data, status, jqHXR) {
            notification('', 'Error: ' + status);
        })
}