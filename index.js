"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auto_bind_1 = __importDefault(require("auto-bind"));
const nanoevents_1 = __importDefault(require("nanoevents"));
const react_1 = require("react");
class Controller {
    constructor(initialState) {
        auto_bind_1.default(this);
        this.emitter = new nanoevents_1.default();
        this.state = (initialState || {});
    }
    setState(target, value) {
        this.state[target] = value;
        this.emitter.emit(target, value);
    }
    use(target) {
        const [state, setState] = react_1.useState(this.state[target]);
        react_1.useEffect(() => {
            const unsubscribe = this.emitter.on(target, (value) => {
                setState(value);
            });
            return unsubscribe;
        }, [target]);
        return state;
    }
}
exports.default = Controller;
