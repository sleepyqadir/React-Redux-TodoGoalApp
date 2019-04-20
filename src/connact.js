import React,{Component} from "react"
import { Context } from "./context";
function Connect(mapStateToProps) {
    return (Compt) =>{
        class Reciever extends Component{
            componentDidMount()
            {
                const {subscribe} = this.props.store
                this.ubsubscribe = subscribe(()=>
                this.forceUpdate())
            }
            componentWillUnmount()
            {
                this.ubsubscribe()
            }
            render()
            {
                const {dispatch,getstate} = this.props.store
                const state = getstate()
                const stateNeeded = mapStateToProps(state)
                return  <Compt {...stateNeeded} dispatch={dispatch}/>
    
            }
        }
             
        class ConnectedComponent extends Component
      {
          render()
          {
              return(
                  <Context.Consumer>
                      {
                          (store)=> <Reciever store={store}/>
                      }
                  </Context.Consumer>
              )
          }
      }
      return ConnectedComponent
    }
}
export default Connect