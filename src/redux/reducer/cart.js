const initialState = {
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CART':{
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
        case 'MODIFY_CART_QUANTITY': {
            const { payload } = action;
            const { productId, newQuantity } = payload;
            let total = 0;
            const newProducts = state?.products?.map(item => {
                total = total + (item?.product?.sellingPrice * item?.quantity)
                if (item?.product._id === productId) {
                    item.quantity = newQuantity;
                }
                return item;
            });
            return {
                ...state,
                products: newProducts,
                total: total,
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

export default cart;