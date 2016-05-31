/// <reference path="../../Scripts/PrecompiledScripts/solver.d.ts" />
export interface IWorkerResult {
    Time: ArrayBuffer;
    Solves: Array<ArrayBuffer>;
    AverageTime: number;
    TotalTime: number;
    Type: string;
}
export interface IOptions {
    OutputStep: number;
}
export declare type IVector = Array<number>;
export interface ISolution {
    time: number;
    solve: IVector;
}
export interface IWorkerMessage {
    options: IOptions;
    rightSide: string;
    x0: IVector;
    t0: number;
    tFinal: number;
    sigma: number;
    count: number;
    events: Array<IEvent>;
    type: string;
    reference: number;
}
export interface IEvent {
    species: number;
    time: number;
    value: number;
}
export interface IRightSide {
    (t: number, v: Array<number>): Array<number>;
}
export declare class GearSolver {
    private solver;
    private opts;
    private pointer;
    private x0;
    private OutputStep;
    constructor(t0: number, x0: IVector, f: IRightSide, opts: IOptions);
    Solve(): ISolution;
    dispose(): void;
}
