import NanoEvents from "nanoevents";
export interface IController<S extends {
    [k: string]: any;
}> {
    use<K extends keyof S>(target: K): S[K];
}
declare class Controller<S extends {
    [k: string]: any;
}, K extends keyof S = keyof S> implements IController<S> {
    protected emitter: NanoEvents.Emitter<any>;
    protected state: S;
    constructor(initialState?: Partial<S>);
    protected setState(obj: Partial<S>): Promise<void[]>;
    protected setState(target: K, value: S[K]): Promise<void>;
    use<K extends keyof S>(target: K): S[K];
}
export default Controller;
