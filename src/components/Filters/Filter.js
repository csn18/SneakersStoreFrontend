import './Filters.css'
import React, {useRef} from 'react';
import {
    removeSelectedBrandFilters,
    saveSelectedBrandFilters,
    saveSelectedSizeFilters,
    removeSelectedSizeFilters
} from "../../store/Reducers/filtersReducer";
import {useDispatch} from "react-redux";

function Filter(props) {
    const dispatch = useDispatch();
    const inputRef = useRef();

    const changeFilter = () => {
        if (props.filterType === 'brand') {
            if (inputRef.current['checked']) {
                dispatch(saveSelectedBrandFilters(inputRef.current['value']));
            } else {
                dispatch(removeSelectedBrandFilters(inputRef.current['value']));
            }
        } else if (props.filterType === 'size') {
            if (inputRef.current['checked']) {
                dispatch(saveSelectedSizeFilters(inputRef.current['value']));
            } else {
                dispatch(removeSelectedSizeFilters(inputRef.current['value']));
            }
        }

    };

    return (
        <div className='filter-field__wrapper'>
            <label className='filter-field'>
                <input ref={inputRef}
                       onChange={changeFilter}
                       type="checkbox"
                       value={props.filter.id}
                />
                {props.filterText}
            </label>
        </div>
    );
}

export default Filter;