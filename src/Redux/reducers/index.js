import modifyCounterReducer from "./modifyCounter";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    modifyCounterReducer: modifyCounterReducer
});

export default rootReducer;