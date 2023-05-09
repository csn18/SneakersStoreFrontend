import axios from "axios";
import './Catalog.css'
import React, {useEffect} from 'react';
import CatalogItem from "./CatalogItem";
import {useDispatch, useSelector} from "react-redux";
import {saveAllProductsAction} from "../../store/Reducers/shopItemsReducer";
import {CardLoader} from "../SkeletonLoader/CardListLoader";

function Catalog(props) {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.products.productList);

    useEffect(() => {
        setTimeout(() => {
            axios.get('http://localhost:8000/api/items/')
                .then((response) => {
                    dispatch(saveAllProductsAction(response.data));
                })
        }, 1500)
    }, [dispatch])

    return (
        <div className='catalog'>
            {
                <div className="container catalog-container">
                    <h2>Главная страница</h2>
                    {
                        productList.length > 0
                            ?
                            <div className="catalog-list">
                                {productList?.map(element => <CatalogItem key={element.id} {...element}/>)}
                            </div>
                            :
                            <div className='catalog-list__loader'>
                                <CardLoader/>
                                <CardLoader/>
                                <CardLoader/>
                                <CardLoader/>
                                <CardLoader/>
                            </div>
                    }
                </div>
            }
        </div>
    );
}

export default Catalog;