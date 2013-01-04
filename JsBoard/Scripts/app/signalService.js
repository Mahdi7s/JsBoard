define('signalService',
    ['jquery', 'utils'],
    function ($, utils) {
        var connection = $.connection,
            paintingHub = connection.paintingHub,
            callbacks = {},
            start = function () {
                connection.hub.logging = true; // turn signalR's logging, on

                paintingHub.client.newPaintElementAdded = function (elemJson) {
                    callbacks.newPaintElementAdded && callbacks.newPaintElementAdded(utils.fromJson(callbacks.paper, elemJson));
                };

                return $.Deferred(function (def) {
                    connection.hub.start()
                        .done(function () {
                            def.resolve();
                        })
                        .fail(function () {
                            console.error('client could not connect to server...');
                            def.reject();
                        });
                }).promise();
            },
            broadcastPaintElem = function (elem) {
                paintingHub.server.broadcastPaintElem(utils.toJson(elem));
            },
            getPaperElements = function () {
                return $.Deferred(function (def) {
                    paintingHub.server.getPaperElements()
                        .done(function (res) {
                            def.resolve(res);
                        })
                        .fail(function (err) {
                            console.error(err);
                            def.reject(err);
                        });
                }).promise();
            },
            onNewPaintElementAdded = function (params) {
                callbacks.newPaintElementAdded = params.callback;
                callbacks.paper = params.paper;
            };

        return {
            start: start,
            broadcastPaintElem: broadcastPaintElem,
            getPaperElements: getPaperElements,
            onNewPaintElementAdded: onNewPaintElementAdded
        };
    });