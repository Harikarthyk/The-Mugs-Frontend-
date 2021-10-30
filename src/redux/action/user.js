const SET_USER = "SET_USER";
const REMOVE_USER = "REMOVE_USER";

export const setUser = input => {
    return {
        type: SET_USER,
        payload: input,
    };
};

export const removeUser = input => {
    return {
        type: REMOVE_USER,
        payload: input
    };
};
