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

function Catalog(props) {
    const lastElementRef = useRef();
    const observerRef = useRef();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.products.productList);
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
                    <h2>Главная страница</h2>
                    {
                        isProductsLoading && !productList.length > 0
                            ?
                            <div className='catalog-list__loader'>
                                <CardLoader/>
                                <CardLoader/>
                                <CardLoader/>
                                <CardLoader/>
                                <CardLoader/>
                            </div>
                            :
                            <div className="catalog-list">
                                {
                                    productList?.map(element => <CatalogItem key={element.id} {...element} />)
                                }
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
    );
}

export default Catalog;