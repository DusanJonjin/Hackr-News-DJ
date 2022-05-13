import React from 'react';
import { Comment } from './Comment';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Comments/CommentsList.css';

export function CommentsList({ itemsIDs, dark, modern }) {

    return (
        <ol className={themedClass('comments-ol', dark, modern)}>
            {itemsIDs.map(itemID => 
                <li key={itemID} className={themedClass('comments-li', dark, modern)}>
                    <Comment itemID={itemID} />
                </li>
            )}
        </ol>
    );
}