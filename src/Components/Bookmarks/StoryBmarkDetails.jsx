import React from 'react';
import { StoryArticle } from '../- Shared -/StoryArticle';
import { useThemeAndClearCommentsOnUnmount } from '../../Hooks/UseThemeAndClearCommentsOnUnmount';

export function StoryBmarkDetails({ storyItem, bMarkedItemArr }) {

    const { id, descendants, type } = storyItem;

    const bMarkedStory = bMarkedItemArr.find(story => story.id === id);

    const newCommCount = descendants - bMarkedStory.descendants;

    const { dark, modern } = useThemeAndClearCommentsOnUnmount();

    return (
        <StoryArticle storyItem={storyItem} dark={dark} modern={modern} >
            {type === 'story' && 
                <p className={`new-comm-count ${newCommCount > 0 ? 'new-comm-exist' : ''}`} >
                    {newCommCount >= 0 ? newCommCount : 0} new
                </p>
            }           
        </StoryArticle>
    );
}