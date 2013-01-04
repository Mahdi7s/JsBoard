define('bootstrapper',
    ['binder', 'signalService', 'presenter'],
    function (binder, signalSerivce, presenter) {
        var setup = function () {
            presenter.initUI();

            signalSerivce.start()
            .done(function () {
                binder.bind();
                presenter.hideBusy();
            });
        };

        return {
            setup: setup
        };
    });