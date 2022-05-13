import React from 'react';
import { bookmarkInstructions } from '../../Utilities/variousData';
import { themedClass } from '../../Utilities/helperFunctions';
import { useSelector } from 'react-redux';
import '../../Styles/Bookmarks/BookmarksEmpty.css';

export function BookmarksEmpty() {
        
  const { dark, modern } = useSelector(state => state.theme);

    return (
        <div className={themedClass('bm-empty', dark, modern)}>
            <h1>You have no bookmarks!</h1>
            <div className={themedClass('empty-inner-wrap', dark, modern)}>
                <h2>How to bookmark a story or comment?</h2>
                {bookmarkInstructions.map((instruction, i, arr) => 
                    <p key={i}>- {instruction}{i < arr.length - 1 ? ';' : '.'}</p>
                )}
                <p className={themedClass('toggle', dark, modern)}>You can toggle bookmark on every item.</p>
            </div>
        </div>
    );
}