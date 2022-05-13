import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../../Store/actions';

export function SearchComments() {

    const dispatch = useDispatch();

    const searchValue = useSelector(state => state.searchValue);

    return (
        <input 
            type='search' 
            value={searchValue} 
            onChange={e => dispatch(setSearchValue(e.target.value))} 
            placeholder='Search comments'
        />
    );
}
