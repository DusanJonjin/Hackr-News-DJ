import React from 'react';
import { themedClass } from "../../Utilities/helperFunctions";
import { useSelector } from "react-redux";

export function CommentsCount({ children, linkDisabled=false, clsName='' }) {

    const { dark, modern } = useSelector(state => state.theme);

    if (linkDisabled) return (
        <p className={themedClass('no-comments', dark, modern)}>
            0<img src={`/Images/comment${dark ? '-white' : ''}.png`} alt='comment' />
        </p>
    );

    return (
        <p className={clsName}>
            {children}
        </p>
    );
}