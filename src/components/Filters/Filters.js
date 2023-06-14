import './Filters.css'
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Filter from "./Filter";
import FilterService from "../../API/FilterService";
import {setAllFilters} from "../../store/Reducers/filtersReducer";
import {saveAllProductsAction} from "../../store/Reducers/shopItemsReducer";

function Filters(props) {
    const dispatch = useDispatch();
    const filtersBrand = useSelector((state) => state.filter.allBrands);
    const currentPage = useSelector((state) => state.products.currentPage);
    const selectedFilters = useSelector((state) => state.filter.selectedFilters);

    useEffect(() => {
        setTimeout(() => {
            getItemsFilter().then(response => null);
        }, 1500);
    }, [currentPage, dispatch, selectedFilters])

    useEffect(() => {
        setTimeout(() => {
            getAllFilters().then(response => null);
        }, 1500);
    }, []);

    async function getAllFilters() {
        const response = await FilterService.getAllFilters();
        if (response) {
            dispatch(setAllFilters(response.data['brands']));
        }
    }

    async function getItemsFilter() {
        let params = `?page=${currentPage}`;
        if (selectedFilters.length > 0) {
            params += `&brand=${selectedFilters}`;
        }

        const response = await FilterService.getItemsFilter(params);
        if (response) {
            dispatch(saveAllProductsAction(response.data));
        }
    }

    return (
        <div className='filter-block'>
            {
                filtersBrand?.map(filter => <Filter key={filter.id} filter={filter}/>)
            }
        </div>
    );
}

export default Filters;