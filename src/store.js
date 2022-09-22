import { createStores } from "redux"; 

import rootReducer from "./Redux/reducers";

const store= createStores(rootReducer) ;

export default store;