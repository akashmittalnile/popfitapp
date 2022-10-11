import modifyCounterReducer from "./modifyCounter";
import CartCounterReducer from "./CartcounterReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    mofiynoti: modifyCounterReducer,
    Cartreducer: CartCounterReducer
});


export default rootReducer;