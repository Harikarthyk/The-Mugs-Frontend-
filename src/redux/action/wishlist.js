const SET_WISHLIST = "SET_WISHLIST";
const REMOVE_WISHLIST = "REMOVE_WISHLIST";

export const setWishlist = input => {
    return {
        type: SET_WISHLIST,
        payload: input,
    };
};

export const removeWishlist = input => {
    return {
        type: REMOVE_WISHLIST,
        payload: input
    };
};
