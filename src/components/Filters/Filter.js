import './Filters.css'
import React, {useRef} from 'react';
import {removeSelectedFilters, saveSelectedFilters} from "../../store/Reducers/filtersReducer";
import {useDispatch} from "react-redux";

function Filter(props) {
    const dispatch = useDispatch();
    const inputRef = useRef();

    const changeFilter = () => {
        if (inputRef.current['checked']) {
            dispatch(saveSelectedFilters(inputRef.current['value']));
        } else {
            dispatch(removeSelectedFilters(inputRef.current['value']));
        }
    };

    return (
        <div className='filter-field__wrapper'>
            <label className='filter-field' htmlFor={props.filter.id}>
                <input ref={inputRef}
                       onChange={changeFilter}
                       type="checkbox"
                       id={props.filter.id}
                       value={props.filter.id}
                />
                {props.filter.brand_name}
            </label>
        </div>
    );
}

export default Filter;