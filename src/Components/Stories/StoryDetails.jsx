import React from 'react';
import { StoryArticle } from '../- Shared -/StoryArticle';
import { useBookmarkTheItem } from '../../Hooks/UseBookmarkTheItem';
import { useThemeAndClearCommentsOnUnmount } from '../../Hooks/UseThemeAndClearCommentsOnUnmount';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Stories/StoryDetails.css';

export function StoryDetails({ storyItem }) {

    const { id } = storyItem;

    const getBookmarkedItems = (state, bookmark) => {
        if (bookmark.id) {
            const items = state.comments.map(comment => comment.item);
            return items;
        }
    }

    const { isBookmarked, toggleBookmark } = useBookmarkTheItem(id, 'story', getBookmarkedItems);

    const { dark, modern } = useThemeAndClearCommentsOnUnmount();

    return (
        <StoryArticle storyItem={storyItem} dark={dark} modern={modern}>
                <p 
                    onClick={() => toggleBookmark(id)}
                    className={themedClass('story-bm-star-wrap', dark, modern)}
                >
                    <span className={themedClass('story-bookmark-star', dark, modern)}>
                        {isBookmarked ? '\u2605' : '\u2606'}
                    </span>
                </p>
        </StoryArticle>
    );
}