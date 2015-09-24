
$(function() {

    var $sidebar   = $("#leftnav"),
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 70;

    $window.scroll(function() {
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }
    });

});

$(document).ready(function() {
    $('#toc').toc({ listType: 'ul', showEffect: 'slideDown', minimumHeaders: 2, noBackToTopLinks: true });
});
