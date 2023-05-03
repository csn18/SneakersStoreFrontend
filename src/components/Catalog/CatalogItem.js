import React from 'react';
import './Catalog.css'
import {useDispatch} from "react-redux";
import {addProductToCart, addProductToFavorite} from "../../store/Reducers/cartReducer";
import axios from "axios";

const CatalogItem = (props) => {
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(addProductToCart(props));
        const data = {
            itemId: props.id
        }
        axios.post('http://localhost:8000/api/user/cart/', data, {
            headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
        }).then((response) => {
            console.log(response)
        })
    }

    const addToFavorites = () => {
        dispatch(addProductToFavorite(props))
    }

    return (
        <div className='catalog-item'>
            <img src={props.images[0].image}
                 alt=""
                 width={160}
                 height={160}
            />
            <div className="catalog-item__price">
                {props.price} ₽
            </div>
            <div className="catalog-item__title">
                {props.title}
            </div>
            <div className="catalog-item__buttons">
                <button className='catalog-item__button' onClick={addToCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6" width={24} height={24}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"/>
                    </svg>
                    Добавить
                </button>
                <button className='catalog-item__button' onClick={addToFavorites}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" width={24} height={24}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default CatalogItem;