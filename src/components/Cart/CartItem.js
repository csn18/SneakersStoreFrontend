import React from 'react';
import './Cart.css'
import {removeProductFromCart} from "../../store/Reducers/cartReducer";
import {useDispatch} from "react-redux";
import CartService from '../../API/CartService'
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

function CartItem(props) {
    const dispatch = useDispatch();

    async function removeCartElement() {
        await CartService.deleteProductCart(props.id);
        dispatch(removeProductFromCart(props));
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
                <Button variant="outlined" onClick={removeCartElement} color='error' startIcon={<DeleteIcon/>}>
                    Удалить
                </Button>
            </div>
        </div>
    );
}

export default CartItem;