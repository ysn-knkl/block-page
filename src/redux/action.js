import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./actionTypes";

export const addItem = (payload) => {
    return{
        type: ADD_ITEM,
        payload
    }
}
export const updateItem = () => {
    return{
        type: UPDATE_ITEM,
    }
}
export const deleteItem = () => {
    return{
        type: DELETE_ITEM,
    }
}