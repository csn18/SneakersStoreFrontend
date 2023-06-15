const defaultState = {
    isProductsLoading: false,
    productList: [],
    updatePrice: false,
    currentPage: 1,
    totalCountProducts: 0,
    countProductsPerPage: 0,
    totalCountPage: 0,
    filterRequestLoading: false
}

const SAVE_ALL_PRODUCTS = 'SAVE_ALL_PRODUCTS';
const UPDATE_PRODUCT_PRICE = 'UPDATE_PRODUCT_PRICE';
const UPDATE_PRODUCT_PRICE_STATUS = 'UPDATE_PRODUCT_PRICE_STATUS';
const CHANGE_FILTER_REQUEST_LOADING = 'CHANGE_FILTER_REQUEST_LOADING';
const INCREMENT_CURRENT_PAGE = 'INCREMENT_CURRENT_PAGE';
const CHANGE_PRODUCT_LOADED = 'CHANGE_PRODUCT_LOADED';
const SAVE_FILTERED_ITEMS = 'SAVE_FILTERED_ITEMS';

export const shopItemsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SAVE_ALL_PRODUCTS:
            if (state.productList.length > 0) {
                return {
                    ...state,
                    totalCountProducts: action.payload.count,
                    productList: [...action.payload.results],
                    isProductsLoading: false,
                    filterRequestLoading: false,
                    totalCountPage: Math.ceil(action.payload.count / action.payload.results.length),
                    countProductsPerPage: action.payload.results.length,
                }
            } else {
                return {
                    ...state,
                    totalCountProducts: action.payload.count,
                    productList: [...state.productList, ...action.payload.results],
                    isProductsLoading: false,
                    filterRequestLoading: false,
                }
            }
        case CHANGE_FILTER_REQUEST_LOADING:
            return {
                ...state,
                filterRequestLoading: action.payload
            }
        case SAVE_FILTERED_ITEMS:
            return {
                ...state,
                productList: [...action.payload['results']],
                isProductsLoading: false,
                filterRequestLoading: false
            }
        case UPDATE_PRODUCT_PRICE_STATUS:
            return {
                ...state,
                updatePrice: action.payload
            }
        case UPDATE_PRODUCT_PRICE:
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
        case INCREMENT_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case CHANGE_PRODUCT_LOADED:
            return {
                ...state,
                isProductsLoading: action.payload
            }
        default:
            return state
    }
}

export const saveAllProductsAction = (payload) => ({type: 'SAVE_ALL_PRODUCTS', payload});
export const updatePriceProductsAction = (payload) => ({type: 'UPDATE_PRODUCT_PRICE', payload});
export const updatePriceProductsStatusAction = (payload) => ({
    type: 'UPDATE_PRODUCT_PRICE_STATUS', payload
});
export const saveFilteredItems = (payload) => ({
    type: 'SAVE_FILTERED_ITEMS', payload
});
export const incrementCurrentPage = (payload) => ({
    type: 'INCREMENT_CURRENT_PAGE', payload
});
export const changeProductsLoading = (payload) => ({
    type: 'CHANGE_PRODUCT_LOADED', payload
});
export const changeFilterRequestLoading = (payload) => ({
    type: 'CHANGE_FILTER_REQUEST_LOADING', payload
});
