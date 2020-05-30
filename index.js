"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auto_bind_1 = __importDefault(require("auto-bind"));
const nanoevents_1 = require("nanoevents");
const react_1 = require("react");
function isFun(x) {
    if (typeof x === "function") {
        return true;
    }
    return false;
}
function isString(x) {
    return typeof x === "string";
}
function isObject(x) {
    return typeof x === "object";
}
class Controller {
    constructor(initialState) {
        auto_bind_1.default(this);
        this.emitter = nanoevents_1.createNanoEvents();
        this.state = (initialState || {});
    }
    setState(target, value) {
        if (isString(target)) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (isFun(value)) {
                        this.state[target] = value(this.state[target]);
                    }
                    else if (value !== undefined) {
                        this.state[target] = value;
                    }
                    this.emitter.emit(target, this.state[target]);
                    resolve();
                });
            });
        }
        else if (isObject(target)) {
            return Promise.all(Object.keys(target).map((a) => { this.setState(a, target[a]); }));
        }
        else {
            throw new Error("Wrong parameters");
        }
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
