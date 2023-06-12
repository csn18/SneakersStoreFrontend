import React, {useState} from 'react';
import './Catalog.css'
import {useDispatch, useSelector} from "react-redux";
import {
    addProductToCart,
    addProductToFavorite, removeProductFromCart, removeProductFromFavorite
} from "../../store/Reducers/cartReducer";
import CartService from "../../API/CartService";
import FavoriteService from "../../API/FavoriteService";
import {isOpen, openModalNotAuth} from "../../store/Reducers/moladReducer";
import {ProductPriceLoader} from "../SkeletonLoader/ProductPriceLoader";

const CatalogItem = (props) => {
    const dispatch = useDispatch();
    const userEmail = useSelector((state) => state.user.userEmail);
    const updatePrice = useSelector((state) => state.products.updatePrice);
    const favoriteItems = useSelector((state) => state.cart.favoriteItems);
    const cartItems = useSelector((state) => state.cart.cartItems);

    const findAddedFavorite = (findId) => {
        return favoriteItems && favoriteItems.find((element) => element.id === findId);
    }

    const findAddedCart = (findId) => {
        return cartItems.find((element) => element.id === findId);
    }

    async function addToCart() {
        if (userEmail) {
            await CartService.addProductCart({itemId: props.id});
            dispatch(addProductToCart(props));
        } else {
            dispatch(openModalNotAuth(true));
            dispatch(isOpen(true));
        }
    }

    async function addToFavorites() {
        if (userEmail) {
            await FavoriteService.addToFavorite({itemId: props.id});
            dispatch(addProductToFavorite(props));
        } else {
            dispatch(openModalNotAuth(true));
            dispatch(isOpen(true));
        }
    }

    async function removeFavoriteElement() {
        await FavoriteService.deleteProductFavorite(props.id);
        dispatch(removeProductFromFavorite(props));
    }

    async function removeCartElement() {
        await CartService.deleteProductCart(props.id);
        dispatch(removeProductFromCart(props));
    }

    return (
        <div className='catalog-item'>
            <img src={props.images[0].image}
                 alt=""
                 width={160}
                 height={160}
            />
            <div className="catalog-item__price">
                {
                    updatePrice
                        ? <ProductPriceLoader/>
                        : `${props.price} ₽`
                }
            </div>
            <div className="catalog-item__title">
                {props.title}
            </div>
            <div className="catalog-item__buttons">
                <button className={findAddedCart(props.id) ? 'catalog-item__button added' : 'catalog-item__button'}
                        onClick={findAddedCart(props.id) ? removeCartElement : addToCart}>
                    {
                        findAddedCart(props.id)
                            ?
                            <div className='catalog-button__wrapper added'>
                                Добавлено
                            </div>
                            :
                            <div className='catalog-button__wrapper'>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor"
                                     className="w-6 h-6"
                                     width={20}
                                     height={20}
                                >
                                    <path strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M12 6v12m6-6H6"
                                    />
                                </svg>
                                Добавить
                            </div>
                    }

                </button>
                <button className={findAddedFavorite(props.id) ? 'catalog-item__button added' : 'catalog-item__button'}
                        onClick={findAddedFavorite(props.id) ? removeFavoriteElement : addToFavorites}
                >
                    {
                        findAddedFavorite(props.id)
                            ?
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 fill="#e5e1ff"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1}
                                 stroke="currentColor"
                                 className="w-6 h-6"
                                 width={20}
                                 height={20}>
                                <path strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1}
                                 stroke="currentColor"
                                 className="w-6 h-6"
                                 width={20}
                                 height={20}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>
                            </svg>
                    }

                </button>
            </div>
        </div>
    )
        ;
}

export default CatalogItem;