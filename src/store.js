import {createStore} from "redux"
import { middlewares } from "./middleware";
import { reducers } from './reducers'
export const store = createStore(reducers,middlewares)
