import { DECREASE_COUNTER, INCREASE_COUNTER } from "../actions/UpdateCounter";
// Previously created actions are imported here
const initialState = {
count: 10
}
//reducer named modifyCounterReducer is created below.
const modifyCounterReducer = (state = initialState, action) => {
         switch (action.type) {
             case DECREASE_COUNTER:
                 let previousCount = state.count;
                 previousCount--;
                 return {...state, count: previousCount}
             case INCREASE_COUNTER:
                let nextCount = state.count;
                nextCount++;
                return {...state, count: nextCount}
           default:
              return state
        }
}
export default modifyCounterReducer;