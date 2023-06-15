import './Filters.css'
import React, {useRef} from 'react';
import {
    removeSelectedBrandFilters,
    saveSelectedBrandFilters,
    saveSelectedSizeFilters,
    removeSelectedSizeFilters
} from "../../store/Reducers/filtersReducer";
import {useDispatch} from "react-redux";
import {Checkbox, FormControlLabel} from "@mui/material";

function Filter(props) {
    const dispatch = useDispatch();
    const inputRef = useRef();

    const changeFilter = (event) => {
        if (props.filterType === 'brand') {
            if (event.target['checked']) {
                dispatch(saveSelectedBrandFilters(event.target.value));
            } else {
                dispatch(removeSelectedBrandFilters(event.target.value));
            }
        } else if (props.filterType === 'size') {
            if (event.target['checked']) {
                dispatch(saveSelectedSizeFilters(event.target.value));
            } else {
                dispatch(removeSelectedSizeFilters(event.target.value));
            }
        }

    };

    return (
        <div>
            <FormControlLabel control={
                <Checkbox value={props.filter.id}
                          onChange={changeFilter}
                          ref={inputRef}
                          size="small"
                />
            } label={props.filterText}/>
        </div>
    );
}

export default Filter;