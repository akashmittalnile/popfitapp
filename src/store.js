import { createStore } from "redux"; 

import rootReducer from "./Redux/reducers";

const store= createStore(rootReducer) ;

export default store;