# react-state-controller

This is an utility to easily manage a shared state using hooks.


## install

`> yarn add react-state-controller`

## usage

```typescript
import Controller from 'react-state-controller'

type MyAwesomeState = {
    count: number
    status: "ONLINE" | "OFFLINE"
    data: ComplexType[]
    error?: string | null
}

class MyAwesomeController extends Controller<MyAwesomeState>{
    
    constructor(){
        // initial state
        super({count:0, data:[]});
    }

    async fetchData(){
        const res = await fetch("api/data");
        if (res.ok){
            const data = res.json() as ComplexType[];
            this.setState("data", data);
        }
    }
}

export default new MyAwesomeController();
````

````typescript
import MyAwsomeController from './MyAwesomeController'
function MyAwesomeList(){
    const data = MyAwesomeController.use("data");
    return <ul>{data.map( item => <li>{item}</li>)}</ul>
}

function MyAwesomeButton(){
    return (
        <button onClick={MyAwesomeController.fetchData}>
            Press Me!
        </button>
    )
}

````