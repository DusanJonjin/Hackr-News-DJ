import React from 'react';
import '../../Styles/- Placeholders -/FakeComment.css';
import { themedClass } from '../../Utilities/helperFunctions';
import { useSelector } from 'react-redux';

export function FakeComment() {

    const { dark, modern } = useSelector(state => state.theme);

    return (
        <div className={themedClass('fake-comment', dark, modern)}> </div>
    )
}