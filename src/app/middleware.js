// npm install redux-logger
const redux = require('redux');
const reduxLogger = require('redux-logger');

const multiReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
// ACTION
console.log("hello world");
const TYPE_BUY_CAKE = 'BUY_CAKE';
const TYPE_BUY_JUICE = 'BUY_JUICE';

        // ACTION is an object with type
const ACTION_BUY_CAKE = {
    type: TYPE_BUY_CAKE,
    message: "First Redux Action"
}

const ACTION_BUY_JUICE = {
    type: TYPE_BUY_JUICE,
    message: "Second Redux Action"
}
const ACTION_CREATOR_CAKE = () => {
    return ACTION_BUY_CAKE;
}

const ACTION_CREATOR_JUICE = () => {
    return ACTION_BUY_JUICE;
}

// STATE

const INITIAL_STATE_CAKE = {
    cakeCount: 10
}


const INITIAL_STATE_JUICE = {
    juiceCount: 100
}

// REDUCERS
//(prevState,action) => newState;
const REDUCER_FUN_CAKE = (prevState = INITIAL_STATE_CAKE, action) => {

    switch (action.type) {
        case TYPE_BUY_CAKE:
            return {
                ...prevState, // this is copy of object
                cakeCount: prevState.cakeCount - 1
            };
        default: return prevState
    }

}

const REDUCER_FUN_JUICE = (prevState = INITIAL_STATE_JUICE, action) => {

    switch (action.type) {
        case TYPE_BUY_JUICE:
            return {
                ...prevState, // this is copy of object
                juiceCount: prevState.juiceCount - 1
            };
        default: return prevState
    }

}

const rootReducer = multiReducers({
    cake: REDUCER_FUN_CAKE,
    juice: REDUCER_FUN_JUICE
})

const store = redux.createStore(rootReducer, applyMiddleware(logger));
console.log("Initial State: ", store.getState())
const subscriber = store.subscribe(() => {
    console.log(store.getState())
});
store.dispatch(ACTION_CREATOR_CAKE());
store.dispatch(ACTION_CREATOR_JUICE());
store.dispatch(ACTION_CREATOR_JUICE());
subscriber();