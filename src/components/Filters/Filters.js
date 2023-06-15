import './Filters.css'
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Filter from "./Filter";
import FilterService from "../../API/FilterService";
import {resetFilters, saveMinMaxPrice, setAllFilters, setMinMaxPriceFilter} from "../../store/Reducers/filtersReducer";
import {
    changeFilterRequestLoading,
    saveAllProductsAction
} from "../../store/Reducers/shopItemsReducer";

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {changeContentIsLoading} from "../../store/Reducers/globalReducer";

function Filters(props) {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.products.currentPage);
    const filtersBrand = useSelector((state) => state.filter.allBrands);
    const filtersSizes = useSelector((state) => state.filter.allSizes);

    const selectedBrandFilters = useSelector((state) => state.filter.selectedBrandFilters);
    const selectedSizesFilters = useSelector((state) => state.filter.selectedSizesFilters);

    const minPrice = useSelector((state) => state.filter.minPrice);
    const maxPrice = useSelector((state) => state.filter.maxPrice);
    const minPriceFilter = useSelector((state) => state.filter.minPriceFilter);
    const maxPriceFilter = useSelector((state) => state.filter.maxPriceFilter);

    const minPriceInput = useRef();
    const maxPriceInput = useRef();

    useEffect(() => {
        const Debounce = setTimeout(() => {
            getItemsFilter().then(response => null);
        }, 500);

        return () => clearTimeout(Debounce);
    }, [maxPriceFilter, minPriceFilter]);

    useEffect(() => {
        if (selectedBrandFilters.length || selectedSizesFilters.length) {
            getItemsFilter().then(response => null);
        }
    }, [selectedBrandFilters, selectedSizesFilters])

    useEffect(() => {
        getAllFilters().then(response => null);
    }, [dispatch])

    const resetAllFilters = () => {
        dispatch(resetFilters());
    };

    const changePriceSlider = (event, value) => {
        dispatch(setMinMaxPriceFilter({
            'min_price': value[0],
            'max_price': value[1],
        }));
    };

    const changeMaxPriceInput = (event) => {
        dispatch(setMinMaxPriceFilter({
            'min_price': minPriceFilter,
            'max_price': Number(event.target.value),
        }));
    };

    const changeMinPriceInput = (event) => {
        dispatch(setMinMaxPriceFilter({
            'min_price': Number(event.target.value),
            'max_price': maxPriceFilter,
        }));
    };

    async function getAllFilters() {
        const response = await FilterService.getAllFilters();
        if (response) {
            dispatch(setAllFilters(response.data));
            dispatch(saveMinMaxPrice(response.data));
        }
    }

    async function getItemsFilter() {
        let params = `?page=${currentPage}`;
        if (selectedBrandFilters.length > 0) {
            params += `&brand=${selectedBrandFilters}`;
        }

        if (selectedSizesFilters.length > 0) {
            params += `&sizes=${selectedSizesFilters}`;
        }

        if (maxPriceFilter !== 0 && minPriceFilter !== 0) {
            params += `&price_min=${minPriceFilter}&price_max=${maxPriceFilter}`;
        }

        const response = await FilterService.getItemsFilter(params);
        if (response) {
            dispatch(saveAllProductsAction(response.data));
            dispatch(changeFilterRequestLoading(false));
            dispatch(changeContentIsLoading(true));
        }
    }

    return (
        <div className='filter-wrapper'>
            <div className="filter-block price-block">
                <p>Цена</p>
                <Box>
                    {
                        minPrice && maxPrice
                            ?
                            <div>
                                <div className='filter-price__wrapper'>
                                    <Stack className='filter-price__input-wrapper' direction="row" spaceing={2} mb={2}>
                                        <TextField
                                            id="min-price"
                                            label="От"
                                            type="number"
                                            size="small"
                                            className="min-max__price-input"
                                            value={minPriceFilter}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            ref={minPriceInput}
                                            onChange={changeMinPriceInput}
                                        />
                                        <TextField
                                            id="min-price"
                                            label="До"
                                            type="number"
                                            value={maxPriceFilter}
                                            size="small"
                                            className="min-max__price-input"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            ref={maxPriceInput}
                                            onChange={changeMaxPriceInput}
                                        />
                                    </Stack>
                                </div>
                                <Slider orientation="horizontal"
                                        disableSwap={true}
                                        defaultValue={[Number(minPrice), Number(maxPrice)]}
                                        value={[Number(minPrice), Number(maxPrice)]}
                                        valueLabelDisplay="auto"
                                        min={Number(minPrice)}
                                        max={Number(maxPrice)}
                                        onChangeCommitted={changePriceSlider}
                                />
                            </div>
                            :
                            null
                    }
                </Box>
            </div>
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
            <div className='filter-reset'>
                <Button variant="contained" onClick={resetAllFilters}>Сбросить фильтры</Button>
            </div>
        </div>
    );
}

export default Filters;