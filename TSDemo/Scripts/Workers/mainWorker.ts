import * as Solver from '../Solver';
import {Normal} from '../NormalDistribution'

declare var rightSide;

export = (ev: MessageEvent) => {
    var message = <Solver.IWorkerMessage>JSON.parse(ev.data);
    var initials = Normal(message.count, 0, message.sigma);
    var n = message.x0.length;
     
    
    importScripts("../PrecompiledScripts/" + message.rightSide);
    initials.forEach((val, count) => {
        var averageTime = 0;
        var points = 0;
        var totalTime = Date.now();
        var time = new Array<number>();
        var solves = new Array<Array<number>>(n);
        var lastSolve = new Array<number>(n);
        for (var i = 0; i < n; i++) lastSolve[i] = 0;
        for (var i = 0; i < n; i++) {
            solves[i] = new Array<number>();        
        }
        message.x0[message.reference] += val;
        
        var events = message.events;
        var currEvent = 0;
        
        var gear = new Solver.GearSolver(message.t0, message.x0, rightSide, message.options);
        var s = {solve: message.x0, time: message.t0};
        do  {
            time.push(s.time);
            solves.forEach((v, i) => {
                v.push(s.solve[i]);
            });
            var timeForPoint = Date.now();
            s = gear.Solve();
            points++;
            averageTime += Date.now() - timeForPoint;
            if (currEvent < events.length && s.time > events[currEvent].time) {                
                gear.dispose();
                lastSolve = solves.map(val => val[val.length - 1]);
                lastSolve[events[currEvent].species] = events[currEvent].value;
                var s = {solve: lastSolve, time: time[time.length - 1]};
                var gear = new Solver.GearSolver(s.time, s.solve, rightSide, message.options);
                currEvent++;
            }
        } while (s.time <= message.tFinal);
        
        gear.dispose();
        
        var resultTime = new Float64Array(time.length);
        for (var k = 0; k < time.length; k++)
            resultTime[k] = time[k];
        var resultSolves = new Array<Float64Array>(n);
        for (var k = 0; k < n; k++) {
            resultSolves[k] = new Float64Array(time.length);
            for (var h = 0; h < time.length; h++)
                resultSolves[k][h] = solves[k][h];
        }
        var returnTransfer = [resultTime.buffer];
        resultSolves.forEach(val => returnTransfer.push(val.buffer));
        (<any>self).postMessage(<Solver.IWorkerResult>{
            Time: resultTime.buffer, 
            Solves: resultSolves.map(val => val.buffer),
            AverageTime: averageTime / points,
            TotalTime: Date.now() - totalTime,
            Type: message.type
        }, returnTransfer);
        
        
    });    
}