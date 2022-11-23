import React, { useState, useLayoutEffect } from 'react';
import { BookmarkedStories } from './BookmarkedStories';
import { BookmarkedComments } from './BookmarkedComments';
import { BookmarksEmpty } from './BookmarksEmpty';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Bookmarks/BookmarksAll.css'

export function BookmarksAll({ dark, modern }) {

    const [allKeys, setAllKeys] = useState([]);

    const [toggleReadLocal, setToggleReadLocal] = useState(true);

    const [clearLocal, setClearLocal] = useState(false);

    const readFromLocal = () => setToggleReadLocal(prevTogg => !prevTogg);

    const handleClearLocal = () => {
        readFromLocal();
        setClearLocal(true);
    };

    useLayoutEffect(()=> {
        if (clearLocal) {
            localStorage.clear();
            const localTheme = JSON.stringify({ dark, modern });
            localStorage.setItem('theme', localTheme);
        }
    }, [clearLocal]);

    useLayoutEffect(() => {
        setAllKeys(Object.keys(localStorage));
    }, [toggleReadLocal, clearLocal]);

    // theme key will always be present since we are setting it on App mount
    if (allKeys.length < 2) return <BookmarksEmpty />;

    const keys = allKeys.reduce((acc, v) => {
        if (v.includes('story')) return {...acc, stories: [...acc.stories, v]};
        if (v.includes('comment')) return {...acc, comments: [...acc.comments, v]};
        return acc;
    }, {stories: [], comments: []});

    const {stories, comments} = keys;

    return (
        <>
            <div className={themedClass('bookmarks-all', dark, modern)}>
                <BookmarkedStories storiesKeys={stories} readFromLocal={readFromLocal} />
                <BookmarkedComments commentsKeys={comments} readFromLocal={readFromLocal} />
            </div>
            <p 
                className={themedClass('remove-all-bm', dark, modern)}
                onClick={() => handleClearLocal()}
            >
                Remove all 
            </p>
        </>

    );
}