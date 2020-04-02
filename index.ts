import autoBind from "auto-bind";
import NanoEvents, { Emitter, createNanoEvents } from "nanoevents";
import { useEffect, useState } from "react";

type fun<K> = (s: K) => K;

function isFun<K>(x: any): x is fun<K> {
    if (typeof x === "function") {
        return true;
    }
    return false;
}
export interface IController<S extends { [k: string]: any }> {
    use<K extends keyof S>(target: K): S[K];
}
class Controller<S extends { [k: string]: any }, K extends keyof S = keyof S> implements IController<S>{
    protected emitter: NanoEvents.Emitter<any>;

    protected state: S;

    constructor(initialState?: Partial<S>) {
        autoBind(this as any);
        this.emitter = createNanoEvents();
        this.state = (initialState || {}) as S;
    }
    protected setState(target: K, value: S[K] | fun<S[K]>): Promise<void> {
        return new Promise((resolve) => {
            // defer // TODO multiple setState should produce a single emit
            setTimeout(() => {
                if (isFun<S[K]>(value)) {
                    this.state[target] = value(this.state[target]);
                } else {
                    this.state[target] = value;
                }
                this.emitter.emit(target, this.state[target]);
                resolve();
            })
        })
    }

    public use<K extends keyof S>(target: K): S[K] {
        const [state, setState] = useState(this.state[target]);
        useEffect(() => {
            const unsubscribe = this.emitter.on(target, (value: any) => {
                setState(value);
            })
            return unsubscribe;
        }, [target]);
        return state;
    }
}
export default Controller;