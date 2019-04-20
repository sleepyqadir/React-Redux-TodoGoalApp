
import React,{Component} from "react"
import API from "goals-todos-api";
import { Context } from "./context";

function generateId () {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
  }
  
  const ADD_TODO = "ADD_TODO"
  const REMOVE_GOAL = "REMOVE_GOAL"
  const ADD_GOAL = "ADD_GOAL"
  const TOGGLE_TODO = "TOGGLE_TODO"
  const REMOVE_TODO = "REMOVE_TODO"
  const RECIEVE_DATA = 'RECIEVE_DATA'
  function addTodoAction(todo)
  {
    return{
        type : ADD_TODO,
        todo
    }
  }
  function addGoalAction(goal)
  {
    return{
        type : ADD_GOAL,
        goal
    }
  }
  function removeTodoAction(id)
  {
    return {
        type : REMOVE_TODO,
        id
    }
  }
  
  function toggleTodoAction(id)
  {
    return {
        type : TOGGLE_TODO,
        id
    }
  }
  
  function removeGoalAction(id)
  {
    return {
        type : REMOVE_GOAL,
        id
    }
  }
  
  function recieveDataAction(todos,goals)
  {
    return{
      type : RECIEVE_DATA,
      todos,
      goals
    }
  }
  function handleDeleteGoal(goal) {
    return (dispatch) => {
    dispatch(removeGoalAction(goal.id))
    return API.deleteGoal(goal.id)
    .catch(()=> {
      dispatch(addGoalAction(goal))
      alert("error in removing try again !!!!")
  }
    )
   }
  }

  function handleAddGoal(name,cb) {
    return (dispatch) => {
    return API.saveGoal(name)
    .then((goal)=>{
      dispatch(addGoalAction(goal))
      cb()
    })
    .catch(()=>{
      alert("sorry an error occurs please try again!!")
    })
  } 
  }

  function handleAddTodo(name,cb) {
    return (dispatch) => {
    return API.saveTodo(name)
    .then((todo)=>{
      dispatch(addTodoAction(todo))
      cb()
    })
    .catch(()=>{
      alert("sorry an error occurs please try again")
    })
  }
  }
  function handleInitialData() {
    return (dispatch) => { 
    return  Promise.all([
      API.fetchTodos(),
      API.fetchGoals()
    ]).then(([ todos, goals ]) => {
      dispatch(recieveDataAction(todos,goals))
    })
  }
  }
  function handleToggle (id)
  {
      return (dispatch) =>
    {
      dispatch(toggleTodoAction(id))
      return API.saveTodoToggle(id)
      .catch(()=>
      {
        dispatch(toggleTodoAction(id))
        alert("error in toggling try again!!!")
      })
    }
  }
  
  function handleDeleteTodo(todo) {
    return (dispatch) => {
      dispatch(removeTodoAction(todo.id))
   
    return API.deleteTodo(todo.id)
      .catch(()=> {
        dispatch(addTodoAction(todo))
        alert("error in removing try again !!!!")
      }
      )
    }
  }


  function List(props)
  {
   const {items ,remove ,toggle} = props 
    return(
      <div>
        <ul>
        {items.map((list)=>{
        return <li key={list.id} >
        <span onClick={()=>toggle && toggle(list.id)}
        style={{textDecoration : list.complete ? 'line-through' : 'none'}}> {list.name} </span>
        <button onClick={()=>remove(list)}>X</button></li>})}
        </ul>
      </div>
    )
  }
  class Todos extends Component{
    
    ButtonAction = (e) => {
      this.props.dispatch(handleAddTodo(
        this.element.value ,
        () => this.ButtonAction.element.value = ''
      ))
    }
    remove = (todo) => {
      this.props.dispatch(handleDeleteTodo(todo))
    }
    toggle = (id) => {
      this.props.dispatch(handleToggle(id))  
    }
    render()
    {
      const {todos} = this.props
      return(
        <div>
          <h1>TODOS :</h1>
          <input
           type = "text"
           placeholder="ADD TODO"
           ref={( element )=>this.element = element}
          />
          <button onClick={this.ButtonAction}>add</button>
          <List toggle={this.toggle} remove={this.remove} items={todos}/>
        </div>
      )
    }
  }
  class ConnectedGoals extends Component {
    render(){
      const {store} = this.props   
      return(
        <Context.Consumer>
         {
          (store) => {
            const { goals } = store.getState()

            return <Goals goals={goals} dispatch={store.dispatch}/>
                   }
         }   
       </Context.Consumer>
      )
    }
  
  }
  class ConnectedTodos extends Component {
    render(){
      return(
        <Context.Consumer>
         {
          (store) => {
            const { todos } = store.getState()

            return <Todos todos = {todos} dispatch ={store.dispatch}/>
                   }
         }   
       </Context.Consumer>
      )
    }
  }
  class Goals extends Component{
    ButtonAction = (e) =>
    {
      this.props.dispatch(handleAddGoal(
        this.element.value,
        ()=>this.element.value =''
      ))
    }
    remove = (goal) => {
      this.props.dispatch(handleDeleteGoal(
        goal
      ))
  }
    render()
    {
      const {goals} = this.props
      return(
        <div>
          <h1>GOALS :</h1>          
          <br/>
          <input
            type='text'
            placeholder="ADD GOAL"
            ref={(element)=>this.element=element}
          />
            <button onClick={this.ButtonAction}>add</button>          
          <br/>
          <List remove={this.remove} items={goals}/>
        </div>
      )
    }
  }
  class Application extends Component {
    componentDidMount()
    {
       const {store} = this.props
       store.subscribe(()=> this.forceUpdate())
       store.dispatch(handleInitialData())
    }
    render()
    {
      const {store} = this.props
      const {loading} = store.getState()
      if(loading)
      {
        return(
          <h3>Loading please wait</h3>
        )
      }
      return (
        <div>
           <ConnectedTodos/>
          <br/>
           <ConnectedGoals/>
        </div>
      )
    }
  }

  export default Application