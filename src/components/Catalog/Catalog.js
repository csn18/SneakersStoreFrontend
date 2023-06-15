import React, {useEffect} from 'react';
import axios from "axios";
import './Catalog.css'

import CatalogItem from "./CatalogItem";
import Filters from "../Filters/Filters";

import {FiltersLoader} from "../SkeletonLoader/FiltersLoader";
import {useDispatch, useSelector} from "react-redux";
import {saveAllProductsAction} from "../../store/Reducers/shopItemsReducer";
import {CardLoader} from "../SkeletonLoader/CardListLoader";
import {changeContentIsLoading} from "../../store/Reducers/globalReducer";

function Catalog() {
    const dispatch = useDispatch();

    const currentPage = useSelector((state) => state.products.currentPage);
    const productList = useSelector((state) => state.products.productList);
    const contentIsLoading = useSelector((state) => state.global.contentIsLoading);

    useEffect(() => {
        setTimeout(() => {
            axios.get(`http://localhost:8000/api/items/?page=${currentPage}`)
                .then((response) => {
                    dispatch(saveAllProductsAction(response.data));
                    dispatch(changeContentIsLoading(true));
                })
        }, 1500)
    }, [currentPage, dispatch])

    return (
        <div className='catalog'>
            {
                <div className="container catalog-container">
                    {
                        contentIsLoading
                            ?
                            <div className='catalog-wrapper'>
                                <div className='catalog-filters'>
                                    <h2>Фильтры</h2>
                                    <div>
                                        <Filters/>
                                    </div>
                                </div>
                                <div>
                                    <h2>Список товаров</h2>
                                    <div className='catalog-list'>
                                        {
                                            productList?.map(element => <CatalogItem key={element.id} {...element} />)
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='catalog-loader'>
                                <div>
                                    <div>
                                        <h2>Фильтры</h2>
                                    </div>
                                    <div className='catalog-filter__loader'>
                                        <FiltersLoader/>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h2>Список товаров</h2>
                                    </div>
                                    <div className='catalog-list__loader'>
                                        <CardLoader/>
                                        <CardLoader/>
                                        <CardLoader/>
                                        <CardLoader/>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            }
        </div>
    )
}

export default Catalog;