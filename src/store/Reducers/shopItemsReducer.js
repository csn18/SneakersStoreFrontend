const defaultState = {
    productList: []
}

const SAVE_ALL_PRODUCTS = 'SAVE_ALL_PRODUCTS';

export const shopItemsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SAVE_ALL_PRODUCTS:
            return {
                ...state,
                productList: [...state.productList, action.payload]
            }
        default:
            return state
    }
}

export const saveAllProductsAction = (payload) => ({type: 'SAVE_ALL_PRODUCTS', payload});
