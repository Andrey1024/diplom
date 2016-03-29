/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/emscripten/emscripten.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="./solver.d.ts" />
/// <reference path="./idd.d.ts" />

import $ = require("jquery");
import Module = require("solver");
import InteractiveDataDisplay = require("idd");

function ASMWrapper(Right: (t: number, v: Array<number>) => Array<number>, n: number) {
    return Module.Runtime.addFunction((t, x, r) => {
				var right = new Array<number>(n);
				for (var i = 0; i < n; i++) {
					right[i] = Module.getValue(x + i * 8, 'double');
				}
			    var dx = Right(t, right);
				Module.HEAPF64.set(new Float64Array(dx), r/8);
			});
}

function initVector_(): Module.Vector {
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
    var x0 = new Module.Vector(106);
    x0.SetElement(0,p.Cmax);		// Annihilation
    x0.SetElement(1,p.Cmax);		// Annihilation_1
    x0.SetElement(2,p.Cmax);		// Annihilation_2
    x0.SetElement(3,p.Cmax);		// Annihilation_3
    x0.SetElement(4,p.Cmax);		// Annihilation_4
    x0.SetElement(5,p.Cmax);		// Annihilation_5
    x0.SetElement(6,p.Cmax);		// Annihilation_6
    x0.SetElement(7,p.Cmax);		// Annihilation_7
    x0.SetElement(8,p.Cmax);		// Annihilation_8
    x0.SetElement(9,p.Cmax);		// Annihilation_9
    x0.SetElement(10,p.Cmax);		// Annihilation_10
    x0.SetElement(11,p.Cmax);		// Annihilation_11
    x0.SetElement(12,p.Cmax);		// Annihilation_12
    x0.SetElement(13,p.Cmax);		// Annihilation_13
    x0.SetElement(14,p.Cmax);		// Annihilation_14
    x0.SetElement(15,p.Cmax);		// Annihilation_15
    x0.SetElement(16,p.Cmax);		// Catalysis
    x0.SetElement(17,p.Cmax);		// Catalysis_1
    x0.SetElement(18,p.Cmax);		// Catalysis_2
    x0.SetElement(19,p.Cmax);		// Catalysis_3
    x0.SetElement(20,p.Cmax);		// Catalysis_4
    x0.SetElement(21,p.Cmax);		// Catalysis_5
    x0.SetElement(22,p.Cmax);		// Catalysis_6
    x0.SetElement(23,p.Cmax);		// Catalysis_7
    x0.SetElement(24,p.Cmax);		// Catalysis'
    x0.SetElement(25,p.Cmax);		// Catalysis'_1
    x0.SetElement(26,p.Cmax);		// Catalysis'_2
    x0.SetElement(27,p.Cmax);		// Catalysis'_3
    x0.SetElement(28,p.Cmax);		// Catalysis'_4
    x0.SetElement(29,p.Cmax);		// Catalysis'_5
    x0.SetElement(30,p.Cmax);		// Catalysis'_6
    x0.SetElement(31,p.Cmax);		// Catalysis'_7
    x0.SetElement(32,p.Cmax);		// CatalysisInv
    x0.SetElement(33,p.Cmax);		// CatalysisInv_1
    x0.SetElement(34,p.Cmax);		// CatalysisInv'
    x0.SetElement(35,p.Cmax);		// CatalysisInv'_1
    x0.SetElement(36,p.Cmax);		// Degradation
    x0.SetElement(37,p.Cmax);		// Degradation_1
    x0.SetElement(38,p.Cmax);		// Degradation'
    x0.SetElement(39,p.Cmax);		// Degradation'_1
    x0.SetElement(42,p.x0);		// R
    return x0;
}

function rightSide_(t: number, x: Array<number>): Array<number> {
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
    var deg = p.deg;
    var cat = p.cat;
    var pol = p.pol;
    var nick = p.nick;
    var x0 = p.x0;
    var ann = p.ann;
    var bind = p.bind;
    var bind2 = p.bind2;
    var bind1 = p.bind1;
    var unbind = p.unbind;
    var Cmax = p.Cmax;
    var c = p.c;
    var kt = p.kt;
    var ku = p.ku;
    var s = p.s;
    var e = p.e;
    //var R = p.R;
    var T = p.T;

    var Annihilation = x[0];
    var Annihilation_1 = x[1];
    var Annihilation_2 = x[2];
    var Annihilation_3 = x[3];
    var Annihilation_4 = x[4];
    var Annihilation_5 = x[5];
    var Annihilation_6 = x[6];
    var Annihilation_7 = x[7];
    var Annihilation_8 = x[8];
    var Annihilation_9 = x[9];
    var Annihilation_10 = x[10];
    var Annihilation_11 = x[11];
    var Annihilation_12 = x[12];
    var Annihilation_13 = x[13];
    var Annihilation_14 = x[14];
    var Annihilation_15 = x[15];
    var Catalysis = x[16];
    var Catalysis_1 = x[17];
    var Catalysis_2 = x[18];
    var Catalysis_3 = x[29];
    var Catalysis_4 = x[20];
    var Catalysis_5 = x[21];
    var Catalysis_6 = x[22];
    var Catalysis_7 = x[23];
    var Catalysis$ = x[24];
    var Catalysis$_1 = x[25];
    var Catalysis$_2 = x[26];
    var Catalysis$_3 = x[27];
    var Catalysis$_4 = x[28];
    var Catalysis$_5 = x[29];
    var Catalysis$_6 = x[30];
    var Catalysis$_7 = x[31];
    var CatalysisInv = x[32];
    var CatalysisInv_1 = x[33];
    var CatalysisInv$ = x[34];
    var CatalysisInv$_1 = x[35];
    var Degradation = x[36];
    var Degradation_1 = x[37];
    var Degradation$ = x[38];
    var Degradation$_1 = x[39];
    var L = x[40];
    var L$ = x[41];
    var R = x[42];
    var sp53 = x[43];
    var sp51 = x[44];
    var sp52 = x[45];
    var sp54 = x[46];
    var sp55 = x[47];
    var sp60 = x[48];
    var sp56 = x[49];
    var sp57 = x[50];
    var sp61 = x[51];
    var sp62 = x[52];
    var sp65 = x[53];
    var sp63 = x[54];
    var sp64 = x[55];
    var sp66 = x[56];
    var V = x[57];
    var sp69 = x[58];
    var sp67 = x[59];
    var sp68 = x[60];
    var sp58 = x[61];
    var sp70 = x[62];
    var sp59 = x[63];
    var R$ = x[64];
    var sp75 = x[65];
    var sp76 = x[66];
    var sp77 = x[67];
    var sp71 = x[68];
    var sp72 = x[69];
    var sp78 = x[70];
    var sp79 = x[71];
    var sp85 = x[72];
    var sp86 = x[73];
    var sp80 = x[74];
    var sp81 = x[75];
    var sp87 = x[76];
    var sp88 = x[77];
    var sp93 = x[78];
    var sp94 = x[79];
    var sp95 = x[80];
    var sp89 = x[81];
    var sp90 = x[82];
    var sp96 = x[83];
    var V$ = x[84];
    var sp100 = x[85];
    var sp101 = x[86];
    var sp97 = x[87];
    var sp98 = x[88];
    var sp99 = x[89];
    var sp91 = x[90];
    var sp92 = x[91];
    var sp82 = x[92];
    var sp102 = x[93];
    var sp83 = x[94];
    var sp84 = x[95];
    var sp73 = x[96];
    var sp74 = x[97];
    var Y = x[98];
    var sp103 = x[99];
    var sp104 = x[100];
    var sp105 = x[101];
    var Y$ = x[102];
    var sp106 = x[103];
    var sp107 = x[104];
    var sp108 = x[105];

    // Define reaction propensities
    var r_0 = (0.2 * V);
    var r_1 = (0.2 * V$);
    var r_2 = (0.1 * Y);
    var r_3 = (0.1 * Y$);
    var r_4 = ((0.1 * Y) * Y$);
    var r_5 = ((0.01 * Y) * L);
    var r_6 = ((0.01 * Y$) * L$);
    var r_7 = (L$ * L);
    var r_8 = ((kt * R) * Annihilation_4);
    var r_9 = (((kt * c) * R) * Catalysis);
    var r_10 = ((kt * Annihilation_5) * sp53);
    var r_11 = ((kt * sp52) * Catalysis_1);
    var r_12 = ((kt * sp55) * Annihilation_12);
    var r_13 = (((kt * c) * sp55) * Catalysis_2);
    var r_14 = (((kt * c) * sp55) * Catalysis_4);
    var r_15 = (((kt * c) * sp55) * Degradation);
    var r_16 = ((kt * Annihilation_13) * sp60);
    var r_17 = ((kt * sp57) * Catalysis_3);
    var r_18 = ((kt * sp62) * Annihilation);
    var r_19 = (((kt * c) * sp62) * Catalysis_6);
    var r_20 = ((kt * Annihilation_1) * sp65);
    var r_21 = ((kt * sp64) * Catalysis_7);
    var r_22 = ((kt * V) * Annihilation_8);
    var r_23 = (((kt * c) * V) * Degradation_1);
    var r_24 = ((kt * Annihilation_9) * sp69);
    var r_25 = ((kt * sp58) * Catalysis_5);
    var r_26 = ((kt * R$) * Annihilation_6);
    var r_27 = (((kt * c) * R$) * Catalysis$);
    var r_28 = ((kt * R$) * sp53);
    var r_29 = ((kt * Annihilation_7) * sp75);
    var r_30 = ((kt * R) * sp75);
    var r_31 = ((kt * sp72) * Catalysis$_1);
    var r_32 = ((kt * sp79) * Annihilation_14);
    var r_33 = (((kt * c) * sp79) * Catalysis$_2);
    var r_34 = (((kt * c) * sp79) * Catalysis$_4);
    var r_35 = (((kt * c) * sp79) * Degradation$);
    var r_36 = ((kt * sp79) * sp60);
    var r_37 = ((kt * Annihilation_15) * sp85);
    var r_38 = ((kt * sp55) * sp85);
    var r_39 = ((kt * sp81) * Catalysis$_3);
    var r_40 = ((kt * sp88) * Annihilation_2);
    var r_41 = (((kt * c) * sp88) * Catalysis$_6);
    var r_42 = ((kt * sp88) * sp65);
    var r_43 = ((kt * Annihilation_3) * sp93);
    var r_44 = ((kt * sp62) * sp93);
    var r_45 = ((kt * sp90) * Catalysis$_7);
    var r_46 = ((kt * V$) * Annihilation_10);
    var r_47 = (((kt * c) * V$) * Degradation$_1);
    var r_48 = ((kt * V$) * sp69);
    var r_49 = ((kt * Annihilation_11) * sp100);
    var r_50 = ((kt * V) * sp100);
    var r_51 = ((kt * sp82) * Catalysis$_5);
    var r_52 = (((kt * c) * Y) * CatalysisInv);
    var r_53 = ((kt * sp104) * CatalysisInv_1);
    var r_54 = (((kt * c) * Y$) * CatalysisInv$); 
    var r_55 = ((kt * sp107) * CatalysisInv$_1);

    // Assign derivatives
    var dAnnihilation = -r_18 + r_20;
    var dAnnihilation_1 = r_18 - r_20;
    var dAnnihilation_2 = -r_40 + r_43;
    var dAnnihilation_3 = r_40 - r_43;
    var dAnnihilation_4 = -r_8 + r_10;
    var dAnnihilation_5 = r_8 - r_10;
    var dAnnihilation_6 = -r_26 + r_29;
    var dAnnihilation_7 = r_26 - r_29;
    var dAnnihilation_8 = -r_22 + r_24;
    var dAnnihilation_9 = r_22 - r_24;
    var dAnnihilation_10 = -r_46 + r_49;
    var dAnnihilation_11 = r_46 - r_49;
    var dAnnihilation_12 = -r_12 + r_16;
    var dAnnihilation_13 = r_12 - r_16;
    var dAnnihilation_14 = -r_32 + r_37;
    var dAnnihilation_15 = r_32 - r_37;
    var dCatalysis = -r_9;
    var dCatalysis_1 = -r_11;
    var dCatalysis_2 = -r_13;
    var dCatalysis_3 = -r_17;
    var dCatalysis_4 = -r_14;
    var dCatalysis_5 = -r_25;
    var dCatalysis_6 = -r_19;
    var dCatalysis_7 = -r_21;
    var dCatalysis$ = -r_27;
    var dCatalysis$_1 = -r_31;
    var dCatalysis$_2 = -r_33;
    var dCatalysis$_3 = -r_39;
    var dCatalysis$_4 = -r_34;
    var dCatalysis$_5 = -r_51;
    var dCatalysis$_6 = -r_41;
    var dCatalysis$_7 = -r_45;
    var dCatalysisInv = -r_52;
    var dCatalysisInv_1 = -r_53;
    var dCatalysisInv$ = -r_54;
    var dCatalysisInv$_1 = -r_55;
    var dDegradation = -r_15;
    var dDegradation_1 = -r_23;
    var dDegradation$ = -r_35;
    var dDegradation$_1 = -r_47;
    var dL = -r_7;
    var dL$ = -r_7;
    var dR = -r_8 - r_9 + r_10 + r_11 - r_30;
    var dsp53 = r_8 - r_10 - r_28;
    var dsp51 = r_9;
    var dsp52 = r_9 - r_11;
    var dsp54 = r_11;
    var dsp55 = r_11 - r_12 - r_13 - r_14 - r_15 + r_16 + r_17 + r_25 - r_38 + r_55;
    var dsp60 = r_12 - r_16 - r_36;
    var dsp56 = r_13 + r_14 + r_15;
    var dsp57 = r_13 - r_17;
    var dsp61 = r_17;
    var dsp62 = r_17 - r_18 - r_19 + r_20 + r_21 - r_44;
    var dsp65 = r_18 - r_20 - r_42;
    var dsp63 = r_19;
    var dsp64 = r_19 - r_21;
    var dsp66 = r_21;
    var dV = r_21 - r_22 - r_23 + r_24 + r_25 - r_50;
    var dsp69 = r_22 - r_24 - r_48;
    var dsp67 = r_23;
    var dsp68 = r_23 + r_50;
    var dsp58 = r_14 - r_25;
    var dsp70 = r_25;
    var dsp59 = r_15 + r_38;
    var dR$ = -r_26 - r_27 - r_28 + r_29 + r_31;
    var dsp75 = r_26 - r_29 - r_30;
    var dsp76 = r_30;
    var dsp77 = r_30;
    var dsp71 = r_27;
    var dsp72 = r_27 - r_31;
    var dsp78 = r_31;
    var dsp79 = r_31 - r_32 - r_33 - r_34 - r_35 - r_36 + r_37 + r_39 + r_51 + r_53;
    var dsp85 = r_32 - r_37 - r_38;
    var dsp86 = r_38;
    var dsp80 = r_33 + r_34 + r_35;
    var dsp81 = r_33 - r_39;
    var dsp87 = r_39;
    var dsp88 = r_39 - r_40 - r_41 - r_42 + r_43 + r_45;
    var dsp93 = r_40 - r_43 - r_44;
    var dsp94 = r_44;
    var dsp95 = r_44;
    var dsp89 = r_41;
    var dsp90 = r_41 - r_45;
    var dsp96 = r_45;
    var dV$ = r_45 - r_46 - r_47 - r_48 + r_49 + r_51;
    var dsp100 = r_46 - r_49 - r_50;
    var dsp101 = r_50;
    var dsp97 = r_47;
    var dsp98 = r_47 + r_48;
    var dsp99 = r_48;
    var dsp91 = r_42;
    var dsp92 = r_42;
    var dsp82 = r_34 - r_51;
    var dsp102 = r_51;
    var dsp83 = r_35 + r_36;
    var dsp84 = r_36;
    var dsp73 = r_28;
    var dsp74 = r_28;
    var dY = r_0 - r_2 - r_4 - r_5 - r_52 + r_53;
    var dsp103 = r_52;
    var dsp104 = r_52 - r_53;
    var dsp105 = r_53;
    var dY$ = r_1 - r_3 - r_4 - r_6 - r_54 + r_55;
    var dsp106 = r_54;
    var dsp107 = r_54 - r_55;
    var dsp108 = r_55;
    var dx = [dAnnihilation, dAnnihilation_1, dAnnihilation_2, dAnnihilation_3, dAnnihilation_4, dAnnihilation_5, dAnnihilation_6, dAnnihilation_7, dAnnihilation_8, dAnnihilation_9, dAnnihilation_10, dAnnihilation_11, dAnnihilation_12, dAnnihilation_13, dAnnihilation_14, dAnnihilation_15, dCatalysis, dCatalysis_1, dCatalysis_2, dCatalysis_3, dCatalysis_4, dCatalysis_5, dCatalysis_6, dCatalysis_7, dCatalysis$, dCatalysis$_1, dCatalysis$_2, dCatalysis$_3, dCatalysis$_4, dCatalysis$_5, dCatalysis$_6, dCatalysis$_7, dCatalysisInv, dCatalysisInv_1, dCatalysisInv$, dCatalysisInv$_1, dDegradation, dDegradation_1, dDegradation$, dDegradation$_1, dL, dL$, dR, dsp53, dsp51, dsp52, dsp54, dsp55, dsp60, dsp56, dsp57, dsp61, dsp62, dsp65, dsp63, dsp64, dsp66, dV, dsp69, dsp67, dsp68, dsp58, dsp70, dsp59, dR$, dsp75, dsp76, dsp77, dsp71, dsp72, dsp78, dsp79, dsp85, dsp86, dsp80, dsp81, dsp87, dsp88, dsp93, dsp94, dsp95, dsp89, dsp90, dsp96, dV$, dsp100, dsp101, dsp97, dsp98, dsp99, dsp91, dsp92, dsp82, dsp102, dsp83, dsp84, dsp73, dsp74, dY, dsp103, dsp104, dsp105, dY$, dsp106, dsp107, dsp108];
    return dx;
}

function setArray_() {
    var n = 2000;
    var t = new Array(n);
    var x0 = new Array(n);
    var x1 = new Array(n);
    var x2 = new Array(n);
    var x3 = new Array(n);
    
    var vec = initVector();
    
    var opts = new Module.Options();
    t[0] = 0.0; x0[0] = 4.0, x1[0] = 0.0; x2[0] = 0.0, x3[0] = 0.0;
    var solver = new Module.Gear(0.0, vec, ASMWrapper(rightSide, 106),  opts);
    vec.delete();
        
    var timeStart = Date.now();
    var i = 0;
    var time;
    do {
        var s = solver.Solve();
        i++;
        time = t[i] = s.Time();
        x0[i] = s.Solve().GetElement(42) - s.Solve().GetElement(64);
        x1[i] = s.Solve().GetElement(57) - s.Solve().GetElement(84);
        x2[i] = s.Solve().GetElement(98) - s.Solve().GetElement(102);
        x3[i] = s.Solve().GetElement(40) - s.Solve().GetElement(41);
        s.delete();
    } while (time < 140000)			
    solver.delete();
    var timeEnd = Date.now();
    console.log(timeEnd - timeStart);
    InteractiveDataDisplay.asPlot('chart').polyline("p0", { x: t, y: x0, stroke: 'Green', thickness: 2 });
    InteractiveDataDisplay.asPlot('chart').polyline("p1", { x: t, y: x1, stroke: 'Red', thickness: 2 });
    InteractiveDataDisplay.asPlot('chart').polyline("p2", { x: t, y: x2, stroke: 'Blue', thickness: 2 });
    InteractiveDataDisplay.asPlot('chart').polyline("p3", { x: t, y: x3, stroke: 'Purple', thickness: 2 });
}

function setArray() {
    var n = 2000;
    var t = new Array();
    var x0 = new Array();
    var x1 = new Array();
    var x2 = new Array();
    var x3 = new Array();
   
    var vec = initVector();
    
    var opts = new Module.Options();
    t[0] = 0.0; x0[0] = 4.0, x1[0] = 0.0; x2[0] = 0.0, x3[0] = 0.0;
    var solver = new Module.Gear(0.0, vec, ASMWrapper(rightSide, 12),  opts);
    vec.delete();
        
    var timeStart = Date.now();
    var i = 0;
    var time;
    do {
        var s = solver.Solve();
        i++;
        time = t[i] = s.Time();
        x0[i] = s.Solve().GetElement(2) - s.Solve().GetElement(3);
        x1[i] = s.Solve().GetElement(4) - s.Solve().GetElement(5);
        x2[i] = s.Solve().GetElement(6) - s.Solve().GetElement(7);
        x3[i] = s.Solve().GetElement(0) - s.Solve().GetElement(1);
        s.delete();
    } while (time < 150000)			
    solver.delete();
    var timeEnd = Date.now();
    console.log(timeEnd - timeStart);
    InteractiveDataDisplay.asPlot('chart').polyline("p0", { x: t, y: x0, stroke: 'Green', thickness: 2 });
    InteractiveDataDisplay.asPlot('chart').polyline("p1", { x: t, y: x1, stroke: 'Red', thickness: 2 });
    InteractiveDataDisplay.asPlot('chart').polyline("p2", { x: t, y: x2, stroke: 'Blue', thickness: 2 });
    InteractiveDataDisplay.asPlot('chart').polyline("p3", { x: t, y: x3, stroke: 'Purple', thickness: 2 });
}

function initVector(): Module.Vector {

    var x0 = new Module.Vector(12);
    x0.SetElement(2, 4); // R
    return x0;
}


// Write out the parameters
function rightSide(t: number, x: Array<number>): Array<number> {
    var p: any = {};
    p.deg = 0.0008;
    p.cat = 0.0008;
    p.pol = 0.0167;
    p.nick = 0.0167;
    p.x0 = 4;
    p.ann = 0.01;
    p.bind = 5.4e-06;
    p.bind2 = 0.001;
    p.bind1 = 5e-05;
    p.unbind = 0.1126;
    p.Cmax = 1000;
    p.c = 0.0008;
    p.kt = 0.001;
    p.ku = 0.001;
    p.s = 2;
    p.e = 2.71828183;
    p.R = 0.0019872;
    p.T = 298.15;
    var deg = p.deg;
    var cat = p.cat;
    var pol = p.pol;
    var nick = p.nick;
    var x0 = p.x0;
    var ann = p.ann;
    var bind = p.bind;
    var bind2 = p.bind2;
    var bind1 = p.bind1;
    var unbind = p.unbind;
    var Cmax = p.Cmax;
    var c = p.c;
    var kt = p.kt;
    var ku = p.ku;
    var s = p.s;
    var e = p.e;
    var T = p.T;

    // Assign states
    var L = x[0];
    var L$ = x[1];
    var R = x[2];
    var R$ = x[3];
    var V = x[4];
    var V$ = x[5];
    var Y = x[6];
    var Y$ = x[7];
    var sp9 = x[8];
    var sp10 = x[9];
    var sp11 = x[10];
    var sp12 = x[11];

    // Define reaction propensities
    var r_0 = (cat * R);
    var r_1 = (cat * R$);
    var r_2 = (cat * Y);
    var r_3 = (cat * Y$);
    var r_4 = (deg * sp9);
    var r_5 = (deg * sp10);
    var r_6 = (cat * sp9);
    var r_7 = (cat * sp10);
    var r_8 = (cat * sp9);
    var r_9 = (cat * sp10);
    var r_10 = (cat * sp11);
    var r_11 = (cat * sp12);
    var r_12 = (deg * V);
    var r_13 = (deg * V$);
    var r_14 = ((ann * sp12) * sp11);
    var r_15 = (0.2 * V);
    var r_16 = (0.2 * V$);
    var r_17 = (0.1 * Y);
    var r_18 = (0.1 * Y$);
    var r_19 = ((0.1 * Y) * Y$);
    var r_20 = ((0.01 * Y) * L);
    var r_21 = ((0.01 * Y$) * L$);
    var r_22 = (L$ * L);
    var r_23 = ((ann * R$) * R);
    var r_24 = ((ann * V$) * V);
    var r_25 = ((ann * sp10) * sp9);

    // Assign derivatives
    var dL = -r_22;
    var dL$ = -r_22;
    var dR = -r_23;
    var dR$ = -r_23;
    var dV = r_8 + r_10 - r_12 - r_24;
    var dV$ = r_9 + r_11 - r_13 - r_24;
    var dY = r_15 - r_17 - r_19 - r_20;
    var dY$ = r_16 - r_18 - r_19 - r_21;
    var dsp9 = r_0 + r_3 - r_4 - r_25;
    var dsp10 = r_1 + r_2 - r_5 - r_25;
    var dsp11 = r_6 - r_14;
    var dsp12 = r_7 - r_14;

    return [dL, dL$, dR, dR$, dV, dV$, dY, dY$, dsp9, dsp10, dsp11, dsp12]; 
}

$(document).ready(function() {			
    var chart = InteractiveDataDisplay.asPlot('chart');
    setArray();
});