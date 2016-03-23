$(document).ready(function () {
    initMakeHandler();
    addTag();
});

function initPromptHandler() {
    function hidePrompt() {
        $('#prompt').addClass('hide');
    }

    function hideBG() {
        $('#prompt-bg').addClass('hide');
    }

    function deleteObsolete() {
        $('.hide').remove();
    }
    window.setTimeout(hidePrompt, 50);
    window.setTimeout(hideBG, 200);
    window.setTimeout(deleteObsolete, 300);
}

function initMakeHandler() {
    var $tagsEntered = '';
    $('#prompt > input[type=submit]').click(function () {
        $tagsEntered = $('#prompt > input[type=number]').val();
        for (var i = 0; i < $tagsEntered; i++) {
            tagMakerhandler();
        }
        initPromptHandler();
        deleteTagHandler();
        fontResizeListener();
    });
}

function tagMakerhandler() {
    $('body').append("<div class='nametag-container'> <div class='delete'><i class='fa fa-times-circle fa-lg'></i></div><div class='first-name' contenteditable='true'>FIRST</div><div class='last-name' contenteditable='true'>LAST</div><div class='rank' contenteditable='true'>RANK</div><div class='sales-pitch'><p id='line-one' contenteditable='true'>LINE 1</p><p id='line-two' contenteditable='true'>LINE 2</p><p id='line-three' contenteditable='true'>LINE 3</p></div></div>");
}

function addTag() {
    $('#add-tag').click(function () {
        tagMakerhandler();
        deleteTagHandler();
        fontResizeListener();
    });
}

function deleteTagHandler() {
    $('.delete').click(function () {
        $(this).parent().addClass('animOut');

        function deleteTag() {
            $('.animOut').remove();
        }

        window.setTimeout(deleteTag, 400);
    });
}

function fontResizeListener() {
    $('.first-name, .last-name').on('input', function () {
        var tagSize = $('.nametag-container').innerWidth();
        var textSize = $(this).width();
        if(textSize >= tagSize){
            var fontSize = $(this).css('font-size').substring(0,2);
            $(this).css('font-size', (fontSize-2))
            return fontSize;
        }
    });
}