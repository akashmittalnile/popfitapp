
// export const ADD_TO_NOTI = 'ADD_TO_NOTI';
// export const REMOVE_FROM_NOTI = 'REMOVE_FROM_NOTI';

// export function NotiCountReducer(payload) { //Action Creator
//     return {
//         type: ADD_TO_NOTI,
//         payload: payload
//     }
// }

// export function NotiRemoveReducer(payload) { //Action Creator
//     return {
//         type: REMOVE_FROM_NOTI,
//         payload: payload
//     }
// }
export function incrementCounter(payload) { //Action Creator
    return {
        type: "notificatoncount",
        payload: payload
    }

}


// export const decrementCounter = () => { //Action Creator
//     return {
//         type: "DECREASE_COUNTER"
//     }
// }
// export function setNotificationCount(count) {
//     return function (dispatch, getState) {
//           console.log('Action - setNotificationCount: '+count)
//           dispatch( {
//             type: 'SET_COUNT',
//             payload: count,
//           });
//     };
// };