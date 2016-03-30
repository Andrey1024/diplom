declare module Module {
    interface Vector {
        SetElement(i: number, val: number): number;
        GetElement(i: number): number;
        Print(): void;
        delete();
    }
    
    interface VectorFactory {
        new(size: number): Vector;
    }
    
    var Vector: VectorFactory;
    
    interface SolPoint {
        Time(): number;
        Solve(): Vector;
        delete();
    }
    
    interface Gear {
        Solve(): SolPoint;
        delete();
    }
    interface GearFactory {
    	new(t: number, x: Vector, r: any, opts: Options): Gear;
    }
    var Gear: GearFactory;
    
    interface Options {
        delete();
    }
    
    interface OptionsFactory {
        new(): Options;
    }
    
    var Options: OptionsFactory;
    
    function ChemistrySolver(t0: number, x0: Vector, opts: Options): Gear;
}

declare module "solver" {
    export = Module;
}
