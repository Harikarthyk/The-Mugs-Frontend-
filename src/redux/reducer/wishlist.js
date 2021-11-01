const initialState = {
};

const wishlist = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_WISHLIST':{
            const { payload } = action;
            return {
                ...payload
            };
        }
        case 'ADD_PRODUCT': {
            const { payload } = action;
            const { product, quantity } = payload;
            const newProducts = state?.products;
            newProducts.push({
                quantity: quantity,
                product: product
            });
            const total = state?.total + (product?.sellingPrice * quantity);
            return {
                ...state,
                total: total,
                products: newProducts
            };
        }
        case 'REMOVE_PRODUCT': {
            const { payload } = action;
            const { productId, newQuantity } = payload;
            let total = 0;
            const newProducts = state?.products?.filter(item => {
                total += (item?.quantity * item?.product?.sellingPrice);
                return item?.product?._id !== productId;
            });
            return {
                ...state,
                products: newProducts,
                total: total
            };
        }
        default:
            return state
    }
}

export default wishlist;