define(["require", "exports", '../Solver', '../NormalDistribution'], function (require, exports, Solver, NormalDistribution_1) {
    return function (ev) {
        var message = JSON.parse(ev.data);
        var initials = NormalDistribution_1.Normal(message.count, 0, message.sigma);
        var n = message.x0.length;
        importScripts("../PrecompiledScripts/" + message.rightSide);
        initials.forEach(function (val, count) {
            var averageTime = 0;
            var points = 0;
            var totalTime = Date.now();
            var time = new Array();
            var solves = new Array(n);
            var lastSolve = new Array(n);
            for (var i = 0; i < n; i++)
                lastSolve[i] = 0;
            for (var i = 0; i < n; i++) {
                solves[i] = new Array();
            }
            message.x0[message.reference] += val;
            var events = message.events;
            var currEvent = 0;
            var gear = new Solver.GearSolver(message.t0, message.x0, rightSide, message.options);
            var s = { solve: message.x0, time: message.t0 };
            do {
                time.push(s.time);
                solves.forEach(function (v, i) {
                    v.push(s.solve[i]);
                });
                var timeForPoint = Date.now();
                s = gear.Solve();
                points++;
                averageTime += Date.now() - timeForPoint;
                if (currEvent < events.length && s.time > events[currEvent].time) {
                    gear.dispose();
                    lastSolve = solves.map(function (val) { return val[val.length - 1]; });
                    lastSolve[events[currEvent].species] = events[currEvent].value;
                    var s = { solve: lastSolve, time: time[time.length - 1] };
                    var gear = new Solver.GearSolver(s.time, s.solve, rightSide, message.options);
                    currEvent++;
                }
            } while (s.time <= message.tFinal);
            gear.dispose();
            var resultTime = new Float64Array(time.length);
            for (var k = 0; k < time.length; k++)
                resultTime[k] = time[k];
            var resultSolves = new Array(n);
            for (var k = 0; k < n; k++) {
                resultSolves[k] = new Float64Array(time.length);
                for (var h = 0; h < time.length; h++)
                    resultSolves[k][h] = solves[k][h];
            }
            var returnTransfer = [resultTime.buffer];
            resultSolves.forEach(function (val) { return returnTransfer.push(val.buffer); });
            self.postMessage({
                Time: resultTime.buffer,
                Solves: resultSolves.map(function (val) { return val.buffer; }),
                AverageTime: averageTime / points,
                TotalTime: Date.now() - totalTime,
                Type: message.type
            }, returnTransfer);
        });
    };
});
//# sourceMappingURL=mainWorker.js.map