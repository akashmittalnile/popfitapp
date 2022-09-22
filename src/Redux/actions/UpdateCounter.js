// export const INCREASE_COUNTER = "INCREASE_COUNTER"; //Action
// export const DECREASE_COUNTER = "DECREASE_COUNTER"; //Action
export const incrementCounter = () => { //Action Creator
    return {
        type: "INCREASE_COUNTER"
    }
}
export const decrementCounter = () => { //Action Creator
    return {
        type: "DECREASE_COUNTER"
    }
}