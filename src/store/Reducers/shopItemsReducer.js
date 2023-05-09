const defaultState = {
    productList: [],
    updatePrice: false,
}

const SAVE_ALL_PRODUCTS = 'SAVE_ALL_PRODUCTS';
const UPDATE_PRODUCT_PRICE = 'UPDATE_PRODUCT_PRICE';
const UPDATE_PRODUCT_PRICE_STATUS = 'UPDATE_PRODUCT_PRICE_STATUS';

export const shopItemsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SAVE_ALL_PRODUCTS:
            return {
                ...state,
                productList: [...state.productList, ...action.payload]
            }
        case UPDATE_PRODUCT_PRICE_STATUS:
            return {
                ...state,
                updatePrice: action.payload
            }
        case UPDATE_PRODUCT_PRICE:
            console.log(action.payload)
            return {
                ...state,
                updatePrice: false,
                productList: state.productList.map(
                    product => product.id === action.payload['product']['id']
                        ?
                        {
                            ...product,
                            price: action.payload['product']['price']
                        }
                        : product
                ),
            }
        default:
            return state
    }
}

export const saveAllProductsAction = (payload) => ({type: 'SAVE_ALL_PRODUCTS', payload});
export const updatePriceProductsAction = (payload) => ({type: 'UPDATE_PRODUCT_PRICE', payload});
export const updatePriceProductsStatusAction = (payload) => ({type: 'UPDATE_PRODUCT_PRICE_STATUS', payload});
