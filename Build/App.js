define(["require", "exports", "jquery", "knockout", "idd", "tinycolor2", "Build/PrecompiledScripts/idd-ko.js", "knockout-jqueryui/accordion", "knockout-jqueryui/button", "knockout-jqueryui/selectmenu"], function (require, exports, $, ko, idd, tinycolor) {
    function initVector_() {
        var p = {};
        p.deg = 0.0008;
        p.cat = 0.0008;
        p.pol = 0.0167;
        p.nick = 0.0167;
        p.x0 = 4;
        p.ann = 0.01;
        p.bind = 5.4E-06;
        p.bind2 = 0.001;
        p.bind1 = 5E-05;
        p.unbind = 0.1126;
        p.Cmax = 1000;
        p.c = 0.0008;
        p.kt = 0.001;
        p.ku = 0.001;
        p.s = 2;
        p.e = 2.71828183;
        p.R = 0.0019872;
        p.T = 298.15;
        var x0 = new Array(106);
        for (var i = 0; i < 106; i++)
            x0[i] = 0;
        x0[0] = p.Cmax;
        x0[1] = p.Cmax;
        x0[2] = p.Cmax;
        x0[3] = p.Cmax;
        x0[4] = p.Cmax;
        x0[5] = p.Cmax;
        x0[6] = p.Cmax;
        x0[7] = p.Cmax;
        x0[8] = p.Cmax;
        x0[9] = p.Cmax;
        x0[10] = p.Cmax;
        x0[11] = p.Cmax;
        x0[12] = p.Cmax;
        x0[13] = p.Cmax;
        x0[14] = p.Cmax;
        x0[15] = p.Cmax;
        x0[16] = p.Cmax;
        x0[17] = p.Cmax;
        x0[18] = p.Cmax;
        x0[19] = p.Cmax;
        x0[20] = p.Cmax;
        x0[21] = p.Cmax;
        x0[22] = p.Cmax;
        x0[23] = p.Cmax;
        x0[24] = p.Cmax;
        x0[25] = p.Cmax;
        x0[26] = p.Cmax;
        x0[27] = p.Cmax;
        x0[28] = p.Cmax;
        x0[29] = p.Cmax;
        x0[30] = p.Cmax;
        x0[31] = p.Cmax;
        x0[32] = p.Cmax;
        x0[33] = p.Cmax;
        x0[34] = p.Cmax;
        x0[35] = p.Cmax;
        x0[36] = p.Cmax;
        x0[37] = p.Cmax;
        x0[38] = p.Cmax;
        x0[39] = p.Cmax;
        x0[42] = p.x0;
        return x0;
    }
    function initVector() {
        var x0 = new Array(12);
        for (var i = 0; i < 12; i++)
            x0[i] = 0;
        x0[2] = 4;
        return x0;
    }
    var Solve = (function () {
        function Solve() {
            var _this = this;
            this.t = new Float64Array(0);
            this.x = ko.observableArray([]);
            this.color = ko.observable("");
            this.upper = new Array();
            this.lower = new Array();
            this.Lower = ko.pureComputed(function () {
                if (_this.lower.length == 0) {
                    for (var i = 0; i < _this.t.length; i++) {
                        _this.lower.push(_this.x()[0][i]);
                        _this.upper.push(_this.x()[0][i]);
                    }
                }
                else {
                    for (var i = 0; i < _this.t.length; i++) {
                        _this.lower[i] = Math.min(_this.lower[i], _this.x()[_this.x().length - 1][i]);
                        _this.upper[i] = Math.max(_this.upper[i], _this.x()[_this.x().length - 1][i]);
                    }
                }
                return _this.lower;
            });
            this.middle = ko.pureComputed(function () {
                var arr = new Array();
                if (_this.t.length == 0)
                    return arr;
                for (var i = 0; i < _this.t.length; i++) {
                    var tmp = new Array();
                    for (var j = 0; j < _this.x().length; j++) {
                        tmp.push(_this.x()[j][i]);
                    }
                    tmp.sort();
                    arr.push(tmp[Math.floor(tmp.length / 2)]);
                }
                return arr;
            });
            this.name = "species";
            this.CIColor = ko.computed(function () {
                var c = tinycolor(_this.color());
                c.setAlpha(0.2);
                return c.toRgbString();
            });
        }
        return Solve;
    })();
    var PIEvent = (function () {
        function PIEvent() {
            this.species = ko.observable("L");
            this.avalilableSpecies = ["L", "L'", "R", "R'"];
            this.value = ko.observable(0);
            this.time = ko.observable(0);
        }
        return PIEvent;
    })();
    var Settings = (function () {
        function Settings() {
            var _this = this;
            this.availableSystems = ["CRN", "DNA 2 domain"];
            this.currentSystem = ko.observable("CRN");
            this.sigma = ko.observable(0.1);
            this.count = ko.observable(50);
            this.step = ko.observable(200);
            this.events = ko.observableArray([]);
            this.AddEvent = function () {
                _this.events.push(new PIEvent());
            };
            this.RemoveEvent = function (data, e) {
                e.stopPropagation();
                _this.events.remove(data);
            };
            var eventR$ = new PIEvent();
            eventR$.species("R'");
            eventR$.time(50000);
            eventR$.value(8);
            var eventR = new PIEvent();
            eventR.species("R");
            eventR.time(100000);
            eventR.value(8);
            this.events([eventR$, eventR]);
        }
        return Settings;
    })();
    var ViewModel = (function () {
        function ViewModel() {
            var _this = this;
            this.averagePoint = ko.observable(0);
            this.averageSolution = ko.observable(0);
            this.solves = ko.observableArray([]);
            this.t = ko.observableArray([]);
            this.speciesMap = new Object();
            this.settings = new Settings();
            this.compute = function () {
                if (_this.worker != undefined)
                    _this.worker.terminate();
                _this.worker = new Worker("./Build/Workers/bootWorker.js");
                _this.solves.removeAll();
                _this.averagePoint(0);
                _this.averageSolution(0);
                _this.averagesPoint = new Array();
                _this.averagesSolution = new Array();
                var solve1 = new Solve();
                var solve2 = new Solve();
                var solve3 = new Solve();
                var solve4 = new Solve();
                solve1.color('green');
                solve1.name = "L - L'";
                solve2.color('red');
                solve2.name = "R - R'";
                solve3.color('blue');
                solve3.name = "V - V'";
                solve4.color('grey');
                solve4.name = "Y - Y'";
                _this.worker.onmessage = function (ev) {
                    var data = ev.data;
                    var n = data.Solves.length;
                    var Time = new Float64Array(data.Time);
                    var Solves = new Array(n);
                    for (var i = 0; i < n; i++)
                        Solves[i] = new Float64Array(data.Solves[i]);
                    var map = _this.speciesMap[data.Type];
                    solve1.x.push(Solves[map["L"]].map(function (val, i) { return val - Solves[map["L'"]][i]; }));
                    solve2.x.push(Solves[map["R"]].map(function (val, i) { return val - Solves[map["R'"]][i]; }));
                    solve3.x.push(Solves[map["V"]].map(function (val, i) { return val - Solves[map["V'"]][i]; }));
                    solve4.x.push(Solves[map["Y"]].map(function (val, i) { return val - Solves[map["Y'"]][i]; }));
                    if (solve1.t.length == 0) {
                        solve1.t = solve2.t = solve3.t = solve4.t = Time;
                        _this.solves.push(solve1, solve2, solve3, solve4);
                    }
                    _this.averagesPoint.push(data.AverageTime);
                    _this.averagesSolution.push(data.TotalTime);
                    _this.averagePoint(_this.averagesPoint.reduce(function (a, b) { return a + b; }) / _this.averagesPoint.length);
                    _this.averageSolution(_this.averagesSolution.reduce(function (a, b) { return a + b; }) / _this.averagesSolution.length);
                };
                var message;
                var events = (_this.settings.events().map(function (val) { return _this.toIEvent(val); })).sort(function (a, b) { return a.time - b.time; });
                switch (_this.settings.currentSystem()) {
                    case "CRN":
                        message = {
                            x0: initVector(),
                            t0: 0,
                            tFinal: 150000,
                            options: { OutputStep: _this.settings.step() },
                            rightSide: "rightSide.js",
                            sigma: _this.settings.sigma(),
                            count: _this.settings.count(),
                            events: events,
                            type: _this.settings.currentSystem(),
                            reference: _this.speciesMap[_this.settings.currentSystem()]["R"],
                        };
                        break;
                    case "DNA 2 domain":
                        message = {
                            x0: initVector_(),
                            t0: 0,
                            tFinal: 150000,
                            options: { OutputStep: _this.settings.step() },
                            rightSide: "rightSide106.js",
                            sigma: _this.settings.sigma(),
                            count: _this.settings.count(),
                            events: events,
                            type: _this.settings.currentSystem(),
                            reference: _this.speciesMap[_this.settings.currentSystem()]["R"],
                        };
                        break;
                }
                _this.worker.postMessage(JSON.stringify(message));
            };
            this.speciesMap["CRN"] = { "L": 0, "L'": 1, "R": 2, "R'": 3, "V": 4, "V'": 5, "Y": 6, "Y'": 7 };
            this.speciesMap["DNA 2 domain"] = { "L": 40, "L'": 41, "R": 42, "R'": 64, "V": 57, "V'": 85, "Y": 98, "Y'": 102 };
            ko.applyBindings(this);
        }
        ViewModel.prototype.toIEvent = function (val) {
            return { time: val.time(), value: val.value(), species: this.speciesMap[this.settings.currentSystem()][val.species()] };
        };
        return ViewModel;
    })();
    if (ko.bindingHandlers.numeric == null)
        ko.bindingHandlers.numeric = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                element.addEventListener("change", function (ev) { valueAccessor()(parseFloat(element.value)); });
            },
            update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                element.value = valueAccessor()();
            }
        };
    $(document).ready(function () {
        new ViewModel();
        idd.asPlot($("div[data-idd-plot='chart']"));
    });
});
