const defaultState = {
    favoriteItems: [],
    cartItems: [],
    totalCostCart: 0,
    countFavoriteItems: 0
}

const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const ADD_PRODUCT_TO_FAVORITE = 'ADD_PRODUCT_TO_FAVORITE'
const ADD_PRODUCT_TO_TO_CART_FAVORITE = 'ADD_PRODUCT_TO_TO_CART_FAVORITE'
const REMOVE_PRODUCT_FROM_FAVORITE = 'REMOVE_PRODUCT_FROM_FAVORITE'
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
const APPEND_PRODUCTS_DB = 'APPEND_PRODUCTS_DB'

export const cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case APPEND_PRODUCTS_DB:
            let totalPrice = 0;
            [...action.payload].forEach((item) => totalPrice += Number(item.price))
            return {
                ...state,
                totalCostCart: state.totalCostCart + Number(totalPrice),
                cartItems: [...state.cartItems, ...action.payload]
            }
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                totalCostCart: state.totalCostCart + Number(action.payload.price),
                cartItems: [...state.cartItems, action.payload]
            }
        case ADD_PRODUCT_TO_FAVORITE:
            return {
                ...state,
                countFavoriteItems: state.countFavoriteItems + 1,
                favoriteItems: [...state.favoriteItems, action.payload]
            }
        case REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                totalCostCart: state.totalCostCart - Number(action.payload.price),
                cartItems: state.cartItems.filter((item) => {
                    return item.id !== action.payload.id;
                })
            }
        case REMOVE_PRODUCT_FROM_FAVORITE:
            return {
                ...state,
                countFavoriteItems: state.countFavoriteItems - 1,
                favoriteItems: state.favoriteItems.filter((item) => {
                    return item.id !== action.payload.id;
                })
            }
        case ADD_PRODUCT_TO_TO_CART_FAVORITE:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
                totalCostCart: state.totalCostCart + Number(action.payload.price)
            }
        default:
            return state
    }
}

export const addProductToCart = (payload) => ({type: 'ADD_PRODUCT_TO_CART', payload});
export const addProductToFavorite = (payload) => ({type: 'ADD_PRODUCT_TO_FAVORITE', payload});
export const removeProductFromCart = (payload) => ({type: 'REMOVE_PRODUCT_FROM_CART', payload});
export const removeProductFromFavorite = (payload) => ({type: 'REMOVE_PRODUCT_FROM_FAVORITE', payload});
export const addProductToCartFavorite = (payload) => ({type: 'ADD_PRODUCT_TO_TO_CART_FAVORITE', payload});
export const appendProductsFromDataBase = (payload) => ({type: 'APPEND_PRODUCTS_DB', payload});
