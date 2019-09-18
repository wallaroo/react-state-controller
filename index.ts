import autoBind from "auto-bind";
import NanoEvents from "nanoevents";
import { useEffect, useState } from "react";

class Controller<S extends object> {
   emitter: NanoEvents<S>;

   state: S;

   constructor(initialState?: Partial<S>) {
       autoBind(this as any);
       this.emitter = new NanoEvents();
       this.state = (initialState || {}) as S;
   }

   protected setState<K extends keyof S>(target: K, value: S[K]) {
       this.state[target] = value;
       this.emitter.emit(target, value);
   }

   public use<K extends keyof S>(target: K): S[K] {
       const [state, setState] = useState(this.state[target]);
       useEffect(() => {
           const unsubscribe = this.emitter.on(target, (value) => {
               setState(value);
           })
           return unsubscribe;
       }, [target]);
       return state;
   }
}
export default Controller;