import React from 'react';
import './NavMenu.css'
import {
    isOpen,
    openModalCart,
    openModalFavorite, openModalProfile,
    openModalSignIn,
    openModalSignUp
} from "../../store/Reducers/moladReducer";
import {useDispatch, useSelector} from "react-redux";
import {MenuNumberLoader} from "../SkeletonLoader/MenuCartLoader";
import CartService from "../../API/CartService";
import {appendProductsFromDataBase} from "../../store/Reducers/cartReducer";

function NavMenu(props) {
    const dispatch = useDispatch();
    const totalCostCart = useSelector((state) => state.cart.totalCostCart);
    const countFavoriteItems = useSelector((state) => state.cart.countFavoriteItems);
    const loadedCartItems = useSelector((state) => state.cart.loadedCartItems);
    const userEmail = useSelector((state) => state.user.userEmail);

    const openModalWindowCart = () => {
        dispatch(openModalCart(true));
        dispatch(isOpen(true));
        !loadedCartItems && fetchCartProducts();
    }

    async function fetchCartProducts() {
        const response = await CartService.getAllProductsCart();
        if (response) {
            dispatch(appendProductsFromDataBase(response.data['shop_items']));
        }
    }

    const openModalWindowFavorite = () => {
        dispatch(openModalFavorite(true));
        dispatch(isOpen(true));
    }

    const openModalWindowSignIn = () => {
        dispatch(openModalSignIn(true));
        dispatch(isOpen(true));
    }

    const openModalWindowSignUp = () => {
        dispatch(openModalSignUp(true));
        dispatch(isOpen(true));
    }

    const openModalWindowProfile = () => {
        dispatch(openModalProfile(true));
        dispatch(isOpen(true));
    }

    return (
        <div className='nav-menu'>
            <div className="container nav-container">
                <div className="nav-menu__logo">
                    <h1>Логотип</h1>
                </div>
                {
                    !userEmail
                        ? <div className="nav-menu-auth">
                            <button className='nav-link__svg' onClick={openModalWindowCart}>
                                {
                                    totalCostCart
                                        ? <svg xmlns="http://www.w3.org/2000/svg"
                                               fill="#e5e1ff" viewBox="0 0 24 24"
                                               strokeWidth={1.5}
                                               stroke="currentColor"
                                               className="w-6 h-6" width={28}
                                               height={28}>
                                            <path strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                                        </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg"
                                               fill="none" viewBox="0 0 24 24"
                                               strokeWidth={1.5}
                                               stroke="currentColor"
                                               className="w-6 h-6" width={28}
                                               height={28}>
                                            <path strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                                        </svg>
                                }
                            </button>
                            <button className="nav-link__svg" onClick={openModalWindowFavorite}>
                                {
                                    countFavoriteItems
                                        ? <svg xmlns="http://www.w3.org/2000/svg"
                                               fill="#e5e1ff" viewBox="0 0 24 24"
                                               strokeWidth={1.5}
                                               stroke="currentColor"
                                               className="w-6 h-6" width={24}
                                               height={24}>
                                            <path strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>
                                        </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg"
                                               fill="none" viewBox="0 0 24 24"
                                               strokeWidth={1.5}
                                               stroke="currentColor"
                                               className="w-6 h-6" width={24}
                                               height={24}>
                                            <path strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>
                                        </svg>
                                }
                            </button>
                            <button className='nav-link__btn' onClick={openModalWindowSignIn}>
                                Войти
                            </button>
                            <button className='nav-link__btn' onClick={openModalWindowSignUp}>
                                Регистрация
                            </button>
                        </div>
                        : <div className="nav-menu-auth">
                            <button className='nav-link__svg' onClick={openModalWindowCart}>
                                {
                                    totalCostCart
                                        ? <svg xmlns="http://www.w3.org/2000/svg"
                                               fill="#e5e1ff" viewBox="0 0 24 24"
                                               strokeWidth={1.5}
                                               stroke="currentColor"
                                               className="w-6 h-6" width={28}
                                               height={28}>
                                            <path strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                                        </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg"
                                               fill="none" viewBox="0 0 24 24"
                                               strokeWidth={1.5}
                                               stroke="currentColor"
                                               className="w-6 h-6" width={28}
                                               height={28}>
                                            <path strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                                        </svg>
                                }

                                {
                                    totalCostCart !== null
                                        ?
                                        <div>
                                            {
                                                totalCostCart > 0
                                                    ?
                                                    <div
                                                        className='nav-link__cart-const'>
                                                        {totalCostCart} ₽
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </div>
                                        :
                                        <MenuNumberLoader/>
                                }
                            </button>
                            <button className="nav-link__svg" onClick={openModalWindowFavorite}>
                                {
                                    countFavoriteItems
                                        ? <svg xmlns="http://www.w3.org/2000/svg"
                                               fill="#e5e1ff" viewBox="0 0 24 24"
                                               strokeWidth={1.5}
                                               stroke="currentColor"
                                               className="w-6 h-6" width={24}
                                               height={24}>
                                            <path strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>
                                        </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg"
                                               fill="none" viewBox="0 0 24 24"
                                               strokeWidth={1.5}
                                               stroke="currentColor"
                                               className="w-6 h-6" width={24}
                                               height={24}>
                                            <path strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>
                                        </svg>
                                }

                                {countFavoriteItems !== null
                                    ?
                                    <div>
                                        {
                                            countFavoriteItems > 0
                                                ?
                                                <div
                                                    className='nav-link__cart-count-favorite'>
                                                    {countFavoriteItems}
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                    :
                                    <MenuNumberLoader/>
                                }

                            </button>
                            <button className='nav-link__svg' onClick={openModalWindowProfile}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" strokeWidth={1.5}
                                     stroke="currentColor" className="w-6 h-6"
                                     width={28} height={28}>
                                    <path strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                                </svg>
                                <div className='link__title'>{userEmail}</div>
                            </button>
                        </div>
                }

            </div>
        </div>
    );
}

export default NavMenu;