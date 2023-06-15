const defaultState = {
    allBrands: [],
    allSizes: [],
    selectedBrandFilters: [],
    selectedSizesFilters: [],
};

const LOAD_FILTERS = 'LOAD_FILTERS';
const SAVE_SELECTED_BRAND_FILTER = 'SAVE_SELECTED_BRAND_FILTER';
const SAVE_SELECTED_SIZE_FILTER = 'SAVE_SELECTED_SIZE_FILTER';
const REMOVE_SELECTED_BRAND_FILTER = 'REMOVE_SELECTED_BRAND_FILTER';
const REMOVE_SELECTED_SIZE_FILTER = 'REMOVE_SELECTED_SIZE_FILTER';

export const filtersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_FILTERS:
            return {
                ...state,
                allBrands: [...action.payload['brands']],
                allSizes: [...action.payload['sizes']]
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
        default:
            return state
    }
}

export const setAllFilters = (payload) => ({type: 'LOAD_FILTERS', payload});
export const saveSelectedBrandFilters = (payload) => ({type: 'SAVE_SELECTED_BRAND_FILTER', payload});
export const saveSelectedSizeFilters = (payload) => ({type: 'SAVE_SELECTED_SIZE_FILTER', payload});
export const removeSelectedBrandFilters = (payload) => ({type: 'REMOVE_SELECTED_BRAND_FILTER', payload});
export const removeSelectedSizeFilters = (payload) => ({type: 'REMOVE_SELECTED_SIZE_FILTER', payload});