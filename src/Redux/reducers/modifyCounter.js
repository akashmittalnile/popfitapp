const initialState = 0
// reducer named modifyCounterReducer is created below.
const modifyCounterReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'notificatoncount':
         console.log('');
         state = action.payload
         return state
      default:
         return state
   }
};

export default modifyCounterReducer

