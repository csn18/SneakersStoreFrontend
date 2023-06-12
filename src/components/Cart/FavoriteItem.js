import React from 'react';
import {removeProductFromFavorite, addProductToCartFavorite} from "../../store/Reducers/cartReducer";
import {useDispatch} from "react-redux";
import CartService from "../../API/CartService";
import FavoriteService from "../../API/FavoriteService";

function FavoriteItem(props) {
    const dispatch = useDispatch();

    async function removeFavoriteElement() {
        await FavoriteService.deleteProductFavorite(props.id);
        dispatch(removeProductFromFavorite(props));
    }

    async function addProductToCartFromFavorite() {
        await CartService.addProductCart({itemId: props.id});
        dispatch(addProductToCartFavorite(props));
    }

    return (
        <div className='favorite-item'>
            <div className="cart-item__image">
                <img src={props.images && props.images[0].image} width={90} height={90} alt=""/>
            </div>
            <div className="cart-item__title">
                {props.title}
            </div>
            <div className="cart-item__price">
                {props.price} ₽
            </div>
            <div className="cart-item__remove">
                <button className='add-to__cart-favorite' onClick={addProductToCartFromFavorite}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6" width={24} height={24}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                    </svg>
                    В корзину
                </button>
                <button className='remove-item__btn' onClick={removeFavoriteElement}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6" width={24} height={24}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default FavoriteItem;