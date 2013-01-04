define('binder',
    ['jquery', 'ko', 'vm.paint'],
    function ($, ko, paintVm) {
        var getView = function (viewId) {
            return $('#' + viewId).get(0);
        },
        bind = function () {
            paintVm.init();
            ko.applyBindings(paintVm, getView('paint-view'));
        };

        return {
            bind: bind
        };
    });