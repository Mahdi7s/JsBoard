define('presenter',
    ['jquery'],
    function ($) {
        var initUI = function () {
            $(function () {
                $('#draw-mode-container').buttonset();
                $('#clear').button();
            });
        },
        hideBusy = function () {
            $('#busyindicator').fadeOut('slow');
        };

        return {
            initUI: initUI,
            hideBusy: hideBusy
        };
    });