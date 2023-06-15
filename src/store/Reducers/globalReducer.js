const defaultState = {
    contentIsLoading: false
};

const CHANGE_CONTENT_LOADING = 'CHANGE_CONTENT_LOADING';

export const globalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_CONTENT_LOADING:
            return {
                ...state,
                contentIsLoading: action.payload
            }
        default:
            return state
    }
}

export const changeContentIsLoading = (payload) => ({type: 'CHANGE_CONTENT_LOADING', payload});
