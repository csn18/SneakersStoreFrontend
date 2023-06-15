import './Filters.css'
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Filter from "./Filter";
import FilterService from "../../API/FilterService";
import {setAllFilters} from "../../store/Reducers/filtersReducer";
import {
    changeFilterRequestLoading,
    saveAllProductsAction
} from "../../store/Reducers/shopItemsReducer";

function Filters(props) {
    const dispatch = useDispatch();
    const filtersBrand = useSelector((state) => state.filter.allBrands);
    const filtersSizes = useSelector((state) => state.filter.allSizes);
    const currentPage = useSelector((state) => state.products.currentPage);
    const selectedBrandFilters = useSelector((state) => state.filter.selectedBrandFilters);
    const selectedSizesFilters = useSelector((state) => state.filter.selectedSizesFilters);

    useEffect(() => {
        setTimeout(() => {
            getItemsFilter();
        }, 1500)
    }, [dispatch, currentPage, selectedBrandFilters, selectedSizesFilters])

    useEffect(() => {
        setTimeout(() => {
            getAllFilters();
        }, 1500);
    }, [dispatch]);

    async function getAllFilters(): void {
        const response = await FilterService.getAllFilters();
        if (response) {
            dispatch(setAllFilters(response.data));
        }
    }

    async function getItemsFilter(): void {
        let params = `?page=${currentPage}`;
        if (selectedBrandFilters.length > 0) {
            params += `&brand=${selectedBrandFilters}`;
        }

        if (selectedSizesFilters.length > 0) {
            params += `&sizes=${selectedSizesFilters}`;
        }

        const response = await FilterService.getItemsFilter(params);
        if (response) {
            dispatch(saveAllProductsAction(response.data));
            dispatch(changeFilterRequestLoading(false));
        }
    }

    return (
        <div>
            <div className='filter-block'>
                <p>Бренды</p>
                {
                    filtersBrand?.map(filter => <Filter key={filter.id}
                                                        filter={filter}
                                                        filterText={filter.brand_name}
                                                        filterType='brand'
                    />)
                }
            </div>
            <div className='filter-block'>
                <p>Размер</p>
                {
                    filtersSizes?.map(filter => <Filter key={filter.id}
                                                        filter={filter}
                                                        filterText={filter.size}
                                                        filterType='size'
                    />)
                }
            </div>
        </div>
    );
}

export default Filters;