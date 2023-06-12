const defaultState = {
    loadedCartItems: false,
    loadedFavoriteItems: false,
    favoriteItems: [],
    cartItems: [],
    totalCostCart: null,
    countFavoriteItems: null
}

const FIRST_LOAD = 'FIRST_LOAD'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const ADD_PRODUCT_TO_FAVORITE = 'ADD_PRODUCT_TO_FAVORITE'
const ADD_PRODUCT_TO_TO_CART_FAVORITE = 'ADD_PRODUCT_TO_TO_CART_FAVORITE'
const REMOVE_PRODUCT_FROM_FAVORITE = 'REMOVE_PRODUCT_FROM_FAVORITE'
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
const APPEND_PRODUCTS_DB = 'APPEND_PRODUCTS_DB'
const APPEND_FAVORITES_DB = 'APPEND_FAVORITES_DB'
const UPDATE_CART = 'UPDATE_CART'
const LOADED_CART = 'LOADED_CART'

export const cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FIRST_LOAD:
            return {
                ...state,
                totalCostCart: Number(action.payload['totalCostCart']),
                countFavoriteItems: action.payload['countFavoriteItems'],
                cartItems: [...action.payload['cartItemsId']],
                favoriteItems: [...action.payload['favoriteItemsId']],
            }
        case APPEND_PRODUCTS_DB:
            let totalPrice = 0;
            [...action.payload].forEach((item) => totalPrice += Number(item.price))
            return {
                ...state,
                totalCostCart: Number(totalPrice),
                cartItems: [...action.payload],
                loadedCartItems: true
            }
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                totalCostCart: Number(state.totalCostCart) + Number(action.payload.price),
                cartItems: [...state.cartItems, action.payload]
            }
        case APPEND_FAVORITES_DB:
            return {
                ...state,
                countFavoriteItems: action.payload.length,
                favoriteItems: [...action.payload]
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
                totalCostCart: Number(state.totalCostCart) - Number(action.payload.price),
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
        case UPDATE_CART:
            let totalCostCart = 0;
            [...action.payload.cart['shop_items']].forEach((item) => totalCostCart += Number(item.price))
            return {
                ...state,
                cartItems: [...action.payload.cart['shop_items']],
                totalCostCart: Number(totalCostCart),
                loadedCartItems: true
            }
        case LOADED_CART:
            return {
                ...state,
                loadedCartItems: action.payload
            }
        default:
            return state
    }
}

export const saveDataFirstLoad = (payload) => ({type: 'FIRST_LOAD', payload});
export const addProductToCart = (payload) => ({type: 'ADD_PRODUCT_TO_CART', payload});
export const addProductToFavorite = (payload) => ({type: 'ADD_PRODUCT_TO_FAVORITE', payload});
export const removeProductFromCart = (payload) => ({type: 'REMOVE_PRODUCT_FROM_CART', payload});
export const removeProductFromFavorite = (payload) => ({type: 'REMOVE_PRODUCT_FROM_FAVORITE', payload});
export const addProductToCartFavorite = (payload) => ({type: 'ADD_PRODUCT_TO_TO_CART_FAVORITE', payload});
export const appendProductsFromDataBase = (payload) => ({type: 'APPEND_PRODUCTS_DB', payload});
export const updateCartProducts = (payload) => ({type: 'UPDATE_CART', payload});
export const updateStatusLoadedCartItems = (payload) => ({type: 'LOADED_CART', payload});
export const appendFavoritesFromDataBase = (payload) => ({type: 'APPEND_FAVORITES_DB', payload});
