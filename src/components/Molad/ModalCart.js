import React from 'react';
import './Modal.css'
import {useSelector} from "react-redux";
import CartItem from "../Cart/CartItem";

function ModalCart(props) {
    const cartList = useSelector((state) => state.cart.cartItems);

    return (
        <div>
            {
                cartList.length > 0
                    ? <div>
                        <h1 className='modal-header'>Корзина товаров</h1>
                        <div className="cart-items__header">
                            <div></div>
                            <div>Название товара</div>
                            <div>Стоимость</div>
                            <div></div>
                        </div>
                        <hr/>
                        <div className="cart-items__list">
                            {
                                cartList?.map(element => <CartItem key={element.id} {...element}/>)
                            }
                        </div>
                    </div>
                    : <h1 className='modal-header'>Корзина пуста</h1>
            }
        </div>

    );
}

export default ModalCart;