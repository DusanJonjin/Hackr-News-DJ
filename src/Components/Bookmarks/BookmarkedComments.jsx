import React from 'react';
import { BookmarkedComment } from './BookmarkedComment';
import { useSelector } from 'react-redux';
import { themedClass } from '../../Utilities/helperFunctions';

export function BookmarkedComments({ commentsKeys, readFromLocal }) {

    const { dark, modern } = useSelector(state => state.theme);

    if (!commentsKeys.length) return null;

    return (
        <section className={themedClass('bookmarked-items', dark, modern)}>
            <h1>
                Comments
            </h1>
            <ul className={themedClass('bookmarked-ul', dark, modern)}>
                {commentsKeys.map(commentKey =>
                    <li key={commentKey}>
                        <BookmarkedComment 
                            commentKey={commentKey} 
                            readFromLocal={readFromLocal}
                            dark={dark}
                            modern={modern}
                        />     
                    </li>           
                )}
            </ul>
        </section>
    );
}