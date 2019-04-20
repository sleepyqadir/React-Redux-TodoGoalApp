import {applyMiddleware} from "redux"
import ReduxThunk from 'redux-thunk'
import thunk from "redux-thunk";
const ADD_TODO = "ADD_TODO"
const REMOVE_GOAL = "REMOVE_GOAL"
const ADD_GOAL = "ADD_GOAL"
const TOGGLE_TODO = "TOGGLE_TODO"
const REMOVE_TODO = "REMOVE_TODO"
  
 
const checker = (store) => (next) => (action) => {
    if(
        action.type === ADD_TODO &&
        action.todo.name.toLowerCase().includes("bitcoin")
    )
    {
        return alert("nope,thats a bad idea man")
    }
    if(
        action.type === ADD_GOAL &&
        action.goal.name.toLowerCase().includes("bitcoin")
    )
    {
        return alert("nope,thats a bad idea man")
    }
        return next(action)
}

const logger = (store) => (next) => (action) => {
    console.group(action.type)
    console.log('the action',action)
    const result = next(action)
    console.log("the state is",store.getState())
    console.groupEnd()
    return result
}
export const middlewares = applyMiddleware(thunk,checker,logger)
