import React from 'react';
import './Cart.css'
import {removeProductFromCart} from "../../store/Reducers/cartReducer";
import {useDispatch} from "react-redux";
import axios from "axios";

function CartItem(props) {
    const dispatch = useDispatch();

    const removeCartElement = () => {
        dispatch(removeProductFromCart(props));
        axios.delete(`http://localhost:8000/api/user/cart/item/${props.id}/`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
        }).then((response) => {
            console.log(response)
        })
    }

    return (
        <div className='cart-item'>
            <div className="cart-item__image">
                <img src={props.images[0].image} width={90} height={90} alt=""/>
            </div>
            <div className="cart-item__title">
                {props.title}
            </div>
            <div className="cart-item__price">
                {props.price} ₽
            </div>
            <div className="cart-item__remove">
                <button className='remove-item__btn' onClick={removeCartElement}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6" width={24} height={24}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Удалить
                </button>
            </div>
        </div>
    );
}

export default CartItem;