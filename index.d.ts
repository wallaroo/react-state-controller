import NanoEvents from "nanoevents";
declare type fun<K> = (s: K) => K;
export interface IController<S extends {
    [k: string]: any;
}> {
    use<K extends keyof S>(target: K): S[K];
}
declare class Controller<S extends {
    [k: string]: any;
}, K extends keyof S> implements IController<S> {
    protected emitter: NanoEvents.Emitter<any>;
    protected state: S;
    constructor(initialState?: Partial<S>);
    protected setState(target: K, value: S[K] | fun<S[K]>): void;
    use<K extends keyof S>(target: K): S[K];
}
export default Controller;
