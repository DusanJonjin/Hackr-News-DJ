import React from 'react';
import { BookmarkedStory } from './BookmarkedStory';
import { useSelector } from 'react-redux';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Bookmarks/BookmarkedStories.css';

export function BookmarkedStories({ storiesKeys, readFromLocal }) {

    const { dark, modern } = useSelector(state => state.theme);

    if (!storiesKeys.length) return null;

    return (
        <section className={themedClass('bookmarked-items', dark, modern)}>
            <h1>
                Stories
            </h1>
            <ul className={themedClass('bookmarked-ul', dark, modern)}>
                {storiesKeys.map(storyKey =>
                    <li key={storyKey}>
                        <BookmarkedStory 
                            storyKey={storyKey}                         
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