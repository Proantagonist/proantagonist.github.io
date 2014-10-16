$(document).ready(function () {
    initMakeHandler();
});

function initPromptHandler() {
    function hidePrompt() {
        $('#prompt').addClass('hide');
    }
    function hideBG() {
        $('#prompt-bg').addClass('hide');
    }
    function deleteObsolete(){
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
    });
}

function tagMakerhandler() {
    $('body').append("<div class='nametag-container'><div class='first-name' contenteditable='true'>FIRST</div><div class='last-name' contenteditable='true'>LAST</div><div class='rank' contenteditable='true'>RANK</div><div class='sales-pitch'><p id='line-one' contenteditable='true'>LINE 1</p><p id='line-two' contenteditable='true'>LINE 2</p><p id='line-three' contenteditable='true'>LINE 3</p></div></div>");
}