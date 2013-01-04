define('vm.paint',
    ['ko', 'jquery', 'Raphael', 'utils', 'signalService'],
    function (ko, $, Raphael, utils, signalService) {
        var paper = null,
            board = null,
            drawingMode = ko.observable('pen'),
            stroke = '#000000',
            strokeWidth = 2,
            setPaperSize = function () {
                var paperMargin = { x: 60, y: 75 },
                    paperWidth = $(window).width() * (9 / 10) - paperMargin.x,
                    paperHeight = $(window).height() - paperMargin.y;

                paper.setSize(paperWidth, paperHeight);
                board.attr({ width: paperWidth, height: paperHeight });
            },
            handlePaperEvents = function () {
                var pathArray = null,
                    path = null,
                    rectangle = null,
                    circle = null,
                    pOffset = $(paper.canvas).offset(),
                    down = function (x, y) {
                        var px = x - pOffset.left,
                            py = y - pOffset.top;

                        switch (drawingMode()) {
                            case 'pen':
                                pathArray = new Array();
                                break;
                            case 'rectangle':
                                rectangle = paper.rect(px, py, 1, 1).attr({ stroke: stroke, 'stroke-width': strokeWidth });
                                break;
                            case 'circle':
                                circle = paper.circle(px, py, 1).attr({ stroke: stroke, 'stroke-width': strokeWidth });
                                break;
                        }
                    },
                    move = function (dx, dy, x, y) {
                        var px = x - pOffset.left,
                            py = y - pOffset.top;

                        if (pathArray) {
                            if (pathArray.length == 0) {
                                pathArray[0] = ['M', px, py];
                                path = paper.path(pathArray);
                                path.attr({ stroke: stroke, 'stroke-width': strokeWidth });
                            } else {
                                pathArray[pathArray.length] = ['L', px, py];
                            }

                            path.attr('path', pathArray);
                        } else if (rectangle) {
                            var rx = rectangle.attr('x'),
                                ry = rectangle.attr('y'),
                                dx = px - rx,
                                dy = py - ry;

                            rectangle.attr('width', Math.abs(dx));
                            rectangle.attr('height', Math.abs(dy));
                            var trStr = 't' + (dx < 0 ? dx : '0');
                            trStr += ',' + (dy < 0 ? dy : '0');
                            rectangle.transform(trStr);
                        } else if (circle) {
                            var cx = circle.attr('cx'),
                                cy = circle.attr('cy'),
                                dx = px - cx,
                                dy = py - cy,
                                cr = utils.vLen({ x: dx, y: dy });

                            circle.attr('r', cr);
                        }
                    },
                    up = function () {
                        if (path) {
                            signalService.broadcastPaintElem(path);

                            pathArray = null;
                            path = null;
                        } else if (rectangle) {
                            signalService.broadcastPaintElem(rectangle);

                            rectangle = null;
                        } else if (circle) {
                            signalService.broadcastPaintElem(circle);

                            circle = null;
                        }
                    };

                board.drag(move, down, up);
            },
            initBoard = function () {
                $('#paper-container').empty();
                paper = Raphael('paper-container', 1, 1);
                board = paper.rect(0, 0, 1, 1);
                board.attr('fill', '#eee');

                handlePaperEvents();
                setPaperSize();
                $(window).resize(setPaperSize);
            },
            initSignals = function () {
                signalService.getPaperElements()
                    .done(function (elemsJson) {
                        $.each(elemsJson, function (idx, elemJson) {
                            utils.fromJson(paper, elemJson);
                        });
                    });

                signalService.onNewPaintElementAdded({
                    callback: function (newElem) {
                        paper.set().push(newElem);
                    },
                    paper: paper
                });
            };

        init = function () {
            initBoard();
            initSignals();
        };

        return {
            init: init,
            drawingMode: drawingMode,
            clearBoard: initBoard
        };
    });