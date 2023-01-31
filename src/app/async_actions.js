const redux = require('redux');
// import redux from "redux";
// import fetch from "node-fetch";
// import default from "redux-thunk";
// const fetch = require('node-fetch');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
// INITIAL_STATE
const INITIAL_STATE = {
    loading: true,
    users: [],
    error: ''
}

// ACTION
// TYPES for ACTION
const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
// ACTION CREATOR SYNC (DUMMY)
const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

const fetchUserError = (error) => {
    return {
        type: FETCH_USER_ERROR,
        payload: error
    }
}

// ASYNC ACTION CREATORS
const fecthUsers = () => {
    return function(dispatch) {
        console.log('here')
        
        dispatch(fetchUserRequest())
        axios.get('http://jsonplaceholder.typicode.com/posts')
            .then(response => {
                // response.data
                const posts = response.data.map(post=>post.id);
                dispatch(fetchUserSuccess(posts))
            })
            .catch(error => {
                // error.message
                dispatch(fetchUserError(error.message));
            }
            );
    }
}
const reducer = (prevState = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...prevState,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                ...prevState,
                loading: false,
                users: action.payload
            }
        case FETCH_USER_ERROR:
            return {
                ...prevState,
                loading: false,
                error: action.payload
            }
        default:
            return prevState;

    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(fecthUsers())

//unsubscribe();
