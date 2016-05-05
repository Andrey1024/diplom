/// <reference path="./PrecompiledScripts/solver.d.ts" />

export interface IWorkerResult {
    Time: ArrayBuffer;
    Solves: Array<ArrayBuffer>;
    AverageTime: number;
    TotalTime: number;
}

export interface IOptions {
    OutputStep: number;
}

export type IVector = Array<number>

export interface ISolution {
    time: number;
    solve: IVector;
}

export interface IWorkerMessage {
    options: IOptions;
    rightSide: string;
    x0: IVector;
    t0: number;
    tFinal?: number;
    sigma: number;
    count: number;
    events?: Array<IEvent>;
}

export interface IEvent {
    species: number;
    time: number;
    value: number;
}

export interface IRightSide {
    (t: number, v: Array<number>): Array<number>;
}

function convertOpts(opts: IOptions): Module.Options {
    var Opts = new Module.Options();
    Opts.OutputStep = opts.OutputStep;
    return Opts;
}

function convertFunc(Right: IRightSide, n: number) {
    return Module.Runtime.addFunction((t, x, r) => {
                var right = new Array<number>(n);
                for (var i = 0; i < n; i++) {
                    right[i] = Module.getValue(x + i * 8, 'double');
                }
                var dx = Right(t, right);
                Module.HEAPF64.set(new Float64Array(dx), r/8);
            });
}

function convertVector(vec: IVector): Module.Vector {
    var res = new Module.Vector(vec.length);
    vec.forEach((val, i) => {res.SetElement(i, val)});
    return res;
}

function convertVectorBack(vec: Module.Vector): IVector {
    var res: IVector = new Array<number>();
    for(var i = 0; i < vec.Length(); i++)
        res[i] = vec.GetElement(i);
    return res;
}


export class GearSolver {
    private solver: Module.Gear;
    private opts: Module.Options;
    private pointer;
    private x0: Module.Vector;
    private OutputStep: number;
    
    constructor(t0: number, x0: IVector, f: IRightSide, opts: IOptions) {
        this.pointer = convertFunc(f, x0.length);
        this.opts = convertOpts(opts)
        this.x0 = convertVector(x0);
        this.solver = new Module.Gear(t0, this.x0, this.pointer, this.opts);
    }
    
    Solve(): ISolution {
        var s = this.solver.Solve();
        var res = {time: s.Time(), solve: convertVectorBack(s.Solve())};
        s.delete();
        return res;       
    }
    
    
    
    dispose() {
        this.solver.delete();
        this.opts.delete();
        this.x0.delete();
        Module.Runtime.removeFunction(this.pointer);
    }
}