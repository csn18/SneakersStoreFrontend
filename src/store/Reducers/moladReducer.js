const defaultState = {
    isOpen: false,
    openModalCart: false,
    openModalFavorite: false,
    openModalSignIn: false,
    openModalSignUp: false,
    openModalProfile: false,
}

const IS_OPEN = 'IS_OPEN';
const OPEN_MODAL_CART = 'OPEN_MODAL_CART';
const OPEN_MODAL_FAVORITE = 'OPEN_MODAL_FAVORITE';
const OPEN_MODAL_SIGNIN = 'OPEN_MODAL_SIGNIN';
const OPEN_MODAL_SIGNUP = 'OPEN_MODAL_SIGNUP';
const OPEN_MODAL_PROFILE = 'OPEN_MODAL_PROFILE';
const CLOSE_MODAL = 'CLOSE_MODAL';

export const moladReducer = (state = defaultState, action) => {
    switch (action.type) {
        case IS_OPEN:
            return {...state, isOpen: true}
        case OPEN_MODAL_CART:
            return {...state, openModalCart: true}
        case OPEN_MODAL_FAVORITE:
            return {...state, openModalFavorite: true}
        case OPEN_MODAL_SIGNIN:
            return {...state, openModalSignIn: true}
        case OPEN_MODAL_SIGNUP:
            return {...state, openModalSignUp: true}
        case OPEN_MODAL_PROFILE:
            return {...state, openModalProfile: true}
        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false,
                openModalCart: false,
                openModalFavorite: false,
                openModalSignIn: false,
                openModalSignUp: false,
                openModalProfile: false,
            }
        default:
            return state
    }
}

export const isOpen = (payload) => ({type: IS_OPEN, payload})
export const openModalCart = (payload) => ({type: OPEN_MODAL_CART, payload})
export const openModalFavorite = (payload) => ({type: OPEN_MODAL_FAVORITE, payload})
export const openModalSignIn = (payload) => ({type: OPEN_MODAL_SIGNIN, payload})
export const openModalSignUp = (payload) => ({type: OPEN_MODAL_SIGNUP, payload})
export const openModalProfile = (payload) => ({type: OPEN_MODAL_PROFILE, payload})
export const closeModal = (payload) => ({type: CLOSE_MODAL, payload})