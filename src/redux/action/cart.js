const SET_CART = "SET_CART";
const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const MODIFY_CART_QUANTITY = "MODIFY_CART_QUANTITY";

export const setCart = input => {
    return {
        type: SET_CART,
        payload: input,
    };
};

export const addProduct = input => {
    return {
        type: ADD_PRODUCT,
        payload: input,
    };
};

export const removeProduct = input => {
    return {
        type: REMOVE_PRODUCT,
        payload: input
    };
};

export const modifyCartQuantity = input => {
    return {
        type: MODIFY_CART_QUANTITY,
        payload: input
    };
}