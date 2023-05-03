import axios from "axios";
import './Catalog.css'
import React, {useEffect} from 'react';
import CatalogItem from "./CatalogItem";
import {useDispatch, useSelector} from "react-redux";
import {saveAllProductsAction} from "../../store/Reducers/shopItemsReducer";
import {isOpen, openModalSignIn} from "../../store/Reducers/moladReducer";

function Catalog(props) {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.products.productList);
    const userEmail = useSelector((state) => state.user.userEmail);

    useEffect(() => {
        axios.get('http://localhost:8000/api/items/', {
            headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
        })
            .then((response) => {
                dispatch(saveAllProductsAction(response.data));
            })
    }, [dispatch])

    const openModalWindowSignIn = () => {
        dispatch(openModalSignIn(true));
        dispatch(isOpen(true));
    }

    return (
        <div className='catalog'>
            {
                !userEmail
                    ? <div className="container catalog-container catalog-hidden">
                        <h2>Войдите в свой личный кабинет</h2>
                        <button className='nav-link__btn' onClick={openModalWindowSignIn}>
                            Войти
                        </button>
                    </div>
                    : <div className="container catalog-container ">
                        <h2>Список товаров</h2>
                        <div className="catalog-list">
                            {
                                productList[0]?.map(element => <CatalogItem key={element.id} {...element}/>)
                            }
                        </div>
                    </div>
            }
        </div>
    );
}

export default Catalog;