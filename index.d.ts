import NanoEvents from "nanoevents";
declare type fun<K> = (s: K) => K;
export interface IController<S extends {
    [k: string]: any;
}> {
    use<K extends keyof S>(target: K): S[K];
}
declare type PartialMap<O, K extends keyof O = keyof O> = {
    [key in K]: Partial<O[K]>;
};
declare class Controller<S extends {
    [k: string]: any;
}, K extends keyof S = keyof S> implements IController<S> {
    protected emitter: NanoEvents.Emitter<any>;
    protected state: S;
    constructor(initialState?: Partial<S>);
    protected setState(obj: Partial<PartialMap<S>>): Promise<void[]>;
    protected setState(target: K, value: S[K] | fun<S[K]>): Promise<void>;
    use<K extends keyof S>(target: K): S[K];
}
export default Controller;
