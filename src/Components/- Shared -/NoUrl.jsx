import React from 'react';
import { themedClass } from '../../Utilities/helperFunctions';
import { useSelector } from 'react-redux';
import '../../Styles/- Shared -/NoUrl.css';

export function NoUrl() {

    const { dark } = useSelector(state => state.theme);

    return (
        <h2 className={themedClass('invalid-url', dark)}>Invalid URL!</h2>
    )
}
