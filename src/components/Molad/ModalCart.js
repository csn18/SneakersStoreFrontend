import React from 'react';
import './Modal.css'
import {useSelector} from "react-redux";
import CartItem from "../Cart/CartItem";
import {ProductCartLoader} from "../SkeletonLoader/ProductCartLoader";

function ModalCart(props) {
    const cartList = useSelector((state) => state.cart.cartItems);
    const loadedCartItems = useSelector((state) => state.cart.loadedCartItems);

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
                                loadedCartItems
                                    ?
                                    cartList?.map(element => <CartItem key={element.id} {...element}/>)
                                    :
                                    <>
                                        <ProductCartLoader/>
                                        <ProductCartLoader/>
                                        <ProductCartLoader/>
                                    </>
                            }
                        </div>
                    </div>
                    : <h1 className='modal-header'>Корзина пуста</h1>
            }
        </div>

    );
}

export default ModalCart;