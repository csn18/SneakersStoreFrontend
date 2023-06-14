const defaultState = {
    allBrands: [],
    selectedFilters: []
};

const LOAD_FILTERS = 'LOAD_FILTERS';
const SAVE_SELECTED_FILTER = 'SAVE_SELECTED_FILTER';
const REMOVE_SELECTED_FILTER = 'REMOVE_SELECTED_FILTER';

export const filtersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_FILTERS:
            return {
                ...state,
                allBrands: [...action.payload]
            }
        case SAVE_SELECTED_FILTER:
            return {
                ...state,
                selectedFilters: [...state.selectedFilters, Number(...action.payload)]
            }
        case REMOVE_SELECTED_FILTER:
            return {
                ...state,
                selectedFilters: state.selectedFilters.filter((item) => {
                    return item !== Number(action.payload);
                })
            }
        default:
            return state
    }
}

export const setAllFilters = (payload) => ({type: 'LOAD_FILTERS', payload});
export const saveSelectedFilters = (payload) => ({type: 'SAVE_SELECTED_FILTER', payload});
export const removeSelectedFilters = (payload) => ({type: 'REMOVE_SELECTED_FILTER', payload});