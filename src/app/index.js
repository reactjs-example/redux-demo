const redux = require('redux');

// ACTION
console.log("hello world");
const TYPE_BUY_CAKE = 'BUY_CAKE';

// ACTION is an object with type
const ACTION = {
    type: TYPE_BUY_CAKE,
    message: "First Redux Action"
}

const BUY_ACTION_CREATOR=()=> {
    return ACTION;
}


// STATE

const INITIAL_STATE = {
    cakeCount: 10
}

// REDUCERS
//(prevState,action) => newState;
const REDUCER_FUN = (prevState = INITIAL_STATE, action) => {

    console.log(action);
 //   return prevState;
    switch (action.type) {
        case TYPE_BUY_CAKE:
            return {
                ...prevState, // this is copy of object
                cakeCount: prevState.cakeCount - 1
            };
        default: return prevState
    }

}

const store = redux.createStore(REDUCER_FUN);
console.log("Initial State: ", store.getState())
const subscriber = store.subscribe(() => {
    console.log(store.getState())
});
store.dispatch(BUY_ACTION_CREATOR());
store.dispatch(BUY_ACTION_CREATOR());
store.dispatch(BUY_ACTION_CREATOR());
subscriber();