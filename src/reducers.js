import { combineReducers } from "redux"

const ADD_TODO = "ADD_TODO"
const REMOVE_GOAL = "REMOVE_GOAL"
const ADD_GOAL = "ADD_GOAL"
const TOGGLE_TODO = "TOGGLE_TODO"
const REMOVE_TODO = "REMOVE_TODO"
const RECIEVE_DATA = 'RECIEVE_DATA'

function todos(state=[],action){
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo]) 
        case REMOVE_TODO:
            return state.filter((todo)=> todo.id !== action.id)                                
        case TOGGLE_TODO: 
            return state.map((todo)=> todo.id !== action.id ? todo:
            Object.assign([],todo,{complete: !todo.complete}))                                    
        case RECIEVE_DATA:
            return action.todos
        default:
            return state
    }
  }

function loading(state=true,action) {
    switch (action.type) {
        case RECIEVE_DATA:
           return false
        default:
            return state
    }
    
}  
  
function goals(state=[],action)
  {
    switch (action.type) {
        case ADD_GOAL: 
            return state.concat([action.goal])                    
        case REMOVE_GOAL:
            return state.filter((goal)=> goal.id !== action.id)                                                                 
        case RECIEVE_DATA:
            return action.goals
        default:
            return state
    }
  }

  export const reducers = combineReducers({
    loading,
    todos,
    goals
  })