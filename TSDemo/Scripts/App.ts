/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="PrecompiledScripts/idd.d.ts" />
/// <reference path="../typings/knockout/knockout.d.ts" />
/// <reference path="../typings/tinycolor/tinycolor.d.ts" />
/// <amd-dependency path="Build/PrecompiledScripts/idd-ko.js"/>
/// <amd-dependency path="knockout-jqueryui/accordion" />
/// <amd-dependency path="knockout-jqueryui/button" />
/// <amd-dependency path="knockout-jqueryui/selectmenu" />
/// <amd-dependency path="knockout-jqueryui/progressbar" />

import $ = require("jquery");
import ko = require("knockout");
import InteractiveDataDisplay = require("idd");
import Normal = require("./NormalDistribution");
import Solver = require("./Solver");
import idd = require("idd");
import tinycolor = require("tinycolor2");


function initVector_(): Array<number> {
    var p: any = {};
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
    var x0 = new Array<number>(106);
    for (var i = 0; i < 106; i++) x0[i] = 0;
    x0[0] = p.Cmax;		// Annihilation
    x0[1] = p.Cmax;		// Annihilation_1
    x0[2] = p.Cmax;		// Annihilation_2
    x0[3] = p.Cmax;		// Annihilation_3
    x0[4] = p.Cmax;		// Annihilation_4
    x0[5] = p.Cmax;		// Annihilation_5
    x0[6] = p.Cmax;		// Annihilation_6
    x0[7] = p.Cmax;		// Annihilation_7
    x0[8] = p.Cmax;		// Annihilation_8
    x0[9] = p.Cmax;		// Annihilation_9
    x0[10] = p.Cmax;		// Annihilation_10
    x0[11] = p.Cmax;		// Annihilation_11
    x0[12] = p.Cmax;		// Annihilation_12
    x0[13] = p.Cmax;		// Annihilation_13
    x0[14] = p.Cmax;		// Annihilation_14
    x0[15] = p.Cmax;		// Annihilation_15
    x0[16] = p.Cmax;		// Catalysis
    x0[17] = p.Cmax;		// Catalysis_1
    x0[18] = p.Cmax;		// Catalysis_2
    x0[19] = p.Cmax;		// Catalysis_3
    x0[20] = p.Cmax;		// Catalysis_4
    x0[21] = p.Cmax;		// Catalysis_5
    x0[22] = p.Cmax;		// Catalysis_6
    x0[23] = p.Cmax;		// Catalysis_7
    x0[24] = p.Cmax;		// Catalysis'
    x0[25] = p.Cmax;		// Catalysis'_1
    x0[26] = p.Cmax;		// Catalysis'_2
    x0[27] = p.Cmax;		// Catalysis'_3
    x0[28] = p.Cmax;		// Catalysis'_4
    x0[29] = p.Cmax;		// Catalysis'_5
    x0[30] = p.Cmax;		// Catalysis'_6
    x0[31] = p.Cmax;		// Catalysis'_7
    x0[32] = p.Cmax;		// CatalysisInv
    x0[33] = p.Cmax;		// CatalysisInv_1
    x0[34] = p.Cmax;		// CatalysisInv'
    x0[35] = p.Cmax;		// CatalysisInv'_1
    x0[36] = p.Cmax;		// Degradation
    x0[37] = p.Cmax;		// Degradation_1
    x0[38] = p.Cmax;		// Degradation'
    x0[39] = p.Cmax;		// Degradation'_1
    x0[42] = p.x0;		// R
    return x0;
}

function initVector(): Array<number> {

    var x0 = new Array<number>(12);
    for (var i = 0; i < 12; i++) x0[i] = 0;
    x0[2] = 4; // R
    return x0;
}

class Solve {
    t: Float64Array = new Float64Array(0);
    x: KnockoutObservableArray<Float64Array> = ko.observableArray([]);
    color: KnockoutObservable<string> = ko.observable("");
    private upper: Array<number> = new Array<number>();
    private lower: Array<number> = new Array<number>();
    
    Lower = ko.pureComputed(() => {
        if (this.lower.length == 0) {
            for (var i = 0; i < this.t.length; i++) {
                this.lower.push(this.x()[0][i]);
                this.upper.push(this.x()[0][i])
            }
        } else {
            for (var i = 0; i < this.t.length; i++) {
                this.lower[i] = Math.min(this.lower[i], this.x()[this.x().length - 1][i]);
                this.upper[i] = Math.max(this.upper[i], this.x()[this.x().length - 1][i]);
            }
        }
        return this.lower;
    })
    
    middle = ko.pureComputed(() => {
        var arr = new Array<number>();
        if (this.t.length == 0) return arr;
        for (var i = 0; i < this.t.length; i++) {
            var tmp = new Array<number>();
            for (var j = 0; j < this.x().length; j++) {
                tmp.push(this.x()[j][i]);
            }
            tmp.sort();
            arr.push(tmp[Math.floor(tmp.length / 2)]);
        }
        return arr;
    })
    
    name: string = "species";
    
    CIColor = ko.computed(() => {
        var c = tinycolor(this.color());
        c.setAlpha(0.2);                        
        return c.toRgbString();
    });
}

class PIEvent {
    species = ko.observable("L");
    avalilableSpecies = ["L", "L'", "R", "R'"];
    value = ko.observable(0);
    time = ko.observable(0);
    
}

class Settings {
    availableSystems = ["CRN", "DNA 2 domain"];
    currentSystem = ko.observable("CRN");
    sigma: KnockoutObservable<number> = ko.observable(0.1);
    count: KnockoutObservable<number> = ko.observable(50);
    step: KnockoutObservable<number> = ko.observable(200);
    events = ko.observableArray<PIEvent>([]);
    
    AddEvent = () => {
        this.events.push(new PIEvent());
    }
    RemoveEvent = (data, e) => {
        e.stopPropagation()
        this.events.remove(data);
    }
    
    constructor() {
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
}

class ViewModel {
    averagePoint = ko.observable(0);
    averageSolution = ko.observable(0);
    solves: KnockoutObservableArray<Solve> = ko.observableArray([]);
    private t: KnockoutObservableArray<number> = ko.observableArray([]);
    private worker: Worker;
    private averagesPoint: Array<number>;
    private averagesSolution: Array<number>;
    private speciesMap = new Object();
    settings = new Settings();
    progress = ko.observable(0);
    max = ko.pureComputed(() => {return this.settings.count()});
   
    progressChange = () => {
        $(".progress-label").text(this.progress().toString() + " of " + this.settings.count().toString() + " done");
    }
    
    progressComplete = () => {
        $(".progress-label").text("Completed");
    }
   
    compute = () => {
        if (this.worker != undefined)
            this.worker.terminate();
                        
        this.worker = new Worker("./Build/Workers/bootWorker.js");
        this.solves.removeAll();
        this.progress(0);
        this.averagePoint(0);
        this.averageSolution(0);
        this.averagesPoint = new Array();
        this.averagesSolution = new Array();
        
        var solve1 = new Solve();
        var solve2 = new Solve();
        var solve3 = new Solve();
        var solve4 = new Solve();
        solve1.color('green'); solve1.name = "L - L'";
        solve2.color('red'); solve2.name = "R - R'";
        solve3.color('blue'); solve3.name = "V - V'";
        solve4.color('grey'); solve4.name = "Y - Y'";
        this.worker.onmessage = (ev: MessageEvent) => {
            var data = <Solver.IWorkerResult>ev.data;
            var n = data.Solves.length;
            
            var Time = new Float64Array(data.Time);
            var Solves = new Array<Float64Array>(n);
            for (var i = 0; i < n; i++)
                Solves[i] = new Float64Array(data.Solves[i]);
             
            var map = this.speciesMap[data.Type];
            solve1.x.push(Solves[map["L"]].map((val, i) => {return val - Solves[map["L'"]][i]}));
            solve2.x.push(Solves[map["R"]].map((val, i) => {return val - Solves[map["R'"]][i]}));
            solve3.x.push(Solves[map["V"]].map((val, i) => {return val - Solves[map["V'"]][i]}));
            solve4.x.push(Solves[map["Y"]].map((val, i) => {return val - Solves[map["Y'"]][i]}));
            
            if (solve1.t.length == 0) {
                solve1.t = solve2.t = solve3.t = solve4.t = Time;
                this.solves.push(solve1, solve2, solve3, solve4);
            }
            this.averagesPoint.push(data.AverageTime);
            this.averagesSolution.push(data.TotalTime);
            this.averagePoint(this.averagesPoint.reduce((a, b) => {return a + b;}) / this.averagesPoint.length);
            this.averageSolution(this.averagesSolution.reduce((a, b) => {return a + b;}) / this.averagesSolution.length);
            
            this.progress(this.progress() + 1);
        }        
        
        var message: Solver.IWorkerMessage;
        var events = (this.settings.events().map(val => this.toIEvent(val))).sort((a,b) => {return a.time - b.time})
        switch (this.settings.currentSystem()) {
            case "CRN":
                message = {
                    x0: initVector(),
                    t0: 0,
                    tFinal: 150000,
                    options: { OutputStep: this.settings.step()},
                    rightSide: "rightSide.js",
                    sigma: this.settings.sigma(),
                    count: this.settings.count(),
                    events: events,
                    type: this.settings.currentSystem(),
                    reference: this.speciesMap[this.settings.currentSystem()]["R"],
                }                
                break;
            case "DNA 2 domain":
                message = {
                    x0: initVector_(),
                    t0: 0,
                    tFinal: 150000,
                    options: { OutputStep: this.settings.step()},
                    rightSide: "rightSide106.js",
                    sigma: this.settings.sigma(),
                    count: this.settings.count(),
                    events: events,
                    type: this.settings.currentSystem(),
                    reference: this.speciesMap[this.settings.currentSystem()]["R"],
                }                
                break;                
        }
        
        this.worker.postMessage(JSON.stringify(message));
    }
   
    constructor() {
        this.speciesMap["CRN"] = {"L": 0, "L'": 1, "R": 2, "R'": 3, "V": 4, "V'": 5, "Y": 6, "Y'": 7};
        this.speciesMap["DNA 2 domain"] = {"L": 40, "L'": 41, "R": 42, "R'": 64, "V": 57, "V'": 85, "Y": 98, "Y'": 102};
        ko.applyBindings(this);
    }
    
    toIEvent(val: PIEvent): Solver.IEvent {
        return {time: val.time(), value: val.value(), species: this.speciesMap[this.settings.currentSystem()][val.species()]};
    }
}


if ((<any>ko.bindingHandlers).numeric == null)
    (<any>ko.bindingHandlers).numeric = {
        init: (element: HTMLInputElement, valueAccessor, allBindings, viewModel, bindingContext) => {
            element.addEventListener("change", (ev) => {valueAccessor()(parseFloat(element.value))});
        },
        update: (element: HTMLInputElement, valueAccessor, allBindings, viewModel, bindingContext) => {
            element.value = valueAccessor()();
        }
    }        
    

$(document).ready(() => {
    new ViewModel();
    idd.asPlot($("div[data-idd-plot='chart']")); 
});

