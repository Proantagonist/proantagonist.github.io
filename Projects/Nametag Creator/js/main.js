$(document).ready(function () {
    initMakeHandler();
});

function initMakeHandler() {
    var $tagsEntered = '';
    $('#prompt > input[type=submit]').click(function () {
        $tagsEntered = $('#prompt > input[type=number]').val();
        for (var i = 0; i <$tagsEntered-1; i++){
            $('body').append("<div class='nametag-container'><div class='first-name' contenteditable='true'>EDGAR</div><div class='last-name' contenteditable='true'>HERNANDEZ</div><div class='rank' contenteditable='true'>CREW MEMBER</div><div class='sales-pitch'><p id='line-one' contenteditable='true'>SWEETEN YOUR TASTEBUDS</p><p id='line-two' contenteditable='true'>WITH OUR DELICIOUS</p><p id='line-three' contenteditable='true'>CINNAMON NUGGETS!</p></div></div>")
        }
    });
}