const defaultState = {
    userPassword: '',
    userEmail: '',
    userFirstName: ''
}

const SET_PASSWORD = 'SET_PASSWORD';
const SET_EMAIL = 'SET_EMAIL';
const SET_FIRST_NAME = 'SET_FIRST_NAME';

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_PASSWORD:
            return {
                ...state,
                userPassword: action.payload
            }
        case SET_EMAIL:
            return {
                ...state,
                userEmail: action.payload
            }
        case SET_FIRST_NAME:
            return  {
                ...state,
                userFirstName: action.payload
            }
        default:
            return state
    }
}

export const setPassword = (payload) => ({type: 'SET_PASSWORD', payload});
export const setEmail = (payload) => ({type: 'SET_EMAIL', payload});
export const setFirstName = (payload) => ({type: 'SET_FIRST_NAME', payload});
