import NanoEvents from "nanoevents";
declare class Controller<S extends object> {
    emitter: NanoEvents<S>;
    state: S;
    constructor(initialState?: Partial<S>);
    protected setState<K extends keyof S>(target: K, value: S[K]): void;
    use<K extends keyof S>(target: K): S[K];
}
export default Controller;
