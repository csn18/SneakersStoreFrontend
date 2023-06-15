import axios from "axios";
import './Catalog.css'
import React, {useEffect, useRef} from 'react';
import CatalogItem from "./CatalogItem";
import {useDispatch, useSelector} from "react-redux";
import {
    changeProductsLoading,
    incrementCurrentPage,
    saveAllProductsAction
} from "../../store/Reducers/shopItemsReducer";
import {CardLoader} from "../SkeletonLoader/CardListLoader";
import Filters from "../Filters/Filters";
import {FiltersLoader} from "../SkeletonLoader/FiltersLoader";

function Catalog(props) {
    const lastElementRef = useRef();
    const observerRef = useRef();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.products.productList);
    const filterRequestLoading = useSelector((state) => state.products.filterRequestLoading);
    const isProductsLoading = useSelector((state) => state.products.isProductsLoading);
    let currentPage = useSelector((state) => state.products.currentPage);
    let totalCountPage = useSelector((state) => state.products.totalCountPage);

    useEffect(() => {
        dispatch(changeProductsLoading(true));
        setTimeout(() => {
            axios.get(`http://localhost:8000/api/items/?page=${currentPage}`)
                .then((response) => {
                    dispatch(saveAllProductsAction(response.data));
                })
        }, 1500)
    }, [currentPage, dispatch])

    useEffect(() => {
        if (isProductsLoading) return;
        if (observerRef.current) observerRef.current.disconnect();

        let callback = (entries, observer) => {
            if (entries[0].isIntersecting && currentPage < totalCountPage) {
                let nextPage = currentPage += 1;
                dispatch(incrementCurrentPage(nextPage));
            }
        }

        observerRef.current = new IntersectionObserver(callback);
        observerRef.current.observe(lastElementRef.current);
    }, [isProductsLoading])

    return (
        <div className='catalog'>
            {
                <div className="container catalog-container">
                    {
                        (isProductsLoading && !productList.length > 0) || filterRequestLoading
                            ?
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
                            :
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
                    }
                    {
                        isProductsLoading && productList.length > 0
                            ?
                            <div className='catalog-list__loader'>
                                <CardLoader/>
                                <CardLoader/>
                                <CardLoader/>
                            </div>
                            :
                            null
                    }
                    <div ref={lastElementRef}></div>
                </div>
            }
        </div>
    )
        ;
}

export default Catalog;