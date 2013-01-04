(function () {
    var win = this,
        defineLibraries = function () {
            define('jquery', [], function () { return win.jQuery; });
            define('ko', [], function () { return win.ko; });
            define('Raphael', [], function () { return win.Raphael; });
        },
        setup = function () {
            require(['bootstrapper'],
                function (bootstrapper) {
                    bootstrapper.setup();
                });
        };

    defineLibraries();
    setup();
})();