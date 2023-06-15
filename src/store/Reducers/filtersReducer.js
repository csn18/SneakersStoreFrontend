const defaultState = {
    minPrice: 0,
    maxPrice: 0,
    allBrands: [],
    allSizes: [],

    minPriceFilter: 0,
    maxPriceFilter: 0,
    selectedBrandFilters: [],
    selectedSizesFilters: [],
};

const LOAD_FILTERS = 'LOAD_FILTERS';
const SAVE_SELECTED_BRAND_FILTER = 'SAVE_SELECTED_BRAND_FILTER';
const SAVE_SELECTED_SIZE_FILTER = 'SAVE_SELECTED_SIZE_FILTER';
const REMOVE_SELECTED_BRAND_FILTER = 'REMOVE_SELECTED_BRAND_FILTER';
const REMOVE_SELECTED_SIZE_FILTER = 'REMOVE_SELECTED_SIZE_FILTER';
const SAVE_MIN_MAX_PRICE = 'SAVE_MIN_MAX_PRICE';
const SET_MIN_MAX_PRICE_FILTER = 'SET_MIN_MAX_PRICE_FILTER';
const RESET_FILTERS = 'RESET_FILTERS';

export const filtersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_FILTERS:
            return {
                ...state,
                allBrands: [...action.payload['brands']],
                allSizes: [...action.payload['sizes']]
            }
        case SAVE_MIN_MAX_PRICE:
            return {
                ...state,
                minPrice: action.payload['min_price'],
                maxPrice: action.payload['max_price'],
                minPriceFilter: action.payload['min_price'],
                maxPriceFilter: action.payload['max_price'],
            }
        case SET_MIN_MAX_PRICE_FILTER:
            return {
                ...state,
                minPriceFilter: action.payload['min_price'],
                maxPriceFilter: action.payload['max_price'],
            }
        case SAVE_SELECTED_BRAND_FILTER:
            return {
                ...state,
                selectedBrandFilters: [...state.selectedBrandFilters, Number(...action.payload)]
            }
        case SAVE_SELECTED_SIZE_FILTER:
            return {
                ...state,
                selectedSizesFilters: [...state.selectedSizesFilters, Number(...action.payload)]
            }
        case REMOVE_SELECTED_BRAND_FILTER:
            return {
                ...state,
                selectedBrandFilters: state.selectedBrandFilters.filter((item) => {
                    return item !== Number(action.payload);
                })
            }
        case REMOVE_SELECTED_SIZE_FILTER:
            return {
                ...state,
                selectedSizesFilters: state.selectedSizesFilters.filter((item) => {
                    return item !== Number(action.payload);
                })
            }
        case RESET_FILTERS:
            return {
                ...state,
                maxPriceFilter: state.maxPrice,
                minPriceFilter: state.minPrice,
                selectedBrandFilters: [],
                selectedSizesFilters: [],
            }
        default:
            return state
    }
}

export const setAllFilters = (payload) => ({type: 'LOAD_FILTERS', payload});
export const saveSelectedBrandFilters = (payload) => ({type: 'SAVE_SELECTED_BRAND_FILTER', payload});
export const saveSelectedSizeFilters = (payload) => ({type: 'SAVE_SELECTED_SIZE_FILTER', payload});
export const removeSelectedBrandFilters = (payload) => ({type: 'REMOVE_SELECTED_BRAND_FILTER', payload});
export const removeSelectedSizeFilters = (payload) => ({type: 'REMOVE_SELECTED_SIZE_FILTER', payload});
export const saveMinMaxPrice = (payload) => ({type: 'SAVE_MIN_MAX_PRICE', payload});
export const setMinMaxPriceFilter = (payload) => ({type: 'SET_MIN_MAX_PRICE_FILTER', payload});
export const resetFilters = (payload) => ({type: 'RESET_FILTERS', payload});