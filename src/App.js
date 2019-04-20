import React ,{Component} from "react"
import {store} from './store'
import Application from "./redux";
import { Context } from "./context";
class ConnectedApp extends Component{
  render()
  {
    return (
      <Context.Consumer>
        {
          (store) =>
          (
            <Application store={store}></Application>
          )
        }
      </Context.Consumer>
    )
  }
}

class Provider extends Component{
     render()
     {
       return (
       <Context.Provider value={this.props.store}>
        {this.props.children}
       </Context.Provider>
       )}
  }
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedApp/>
      </Provider>
    );
  }
}

export default App;
