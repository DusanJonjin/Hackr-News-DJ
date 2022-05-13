import React from 'react';
import { StoryComments } from '../- Shared -/StoryComments';
import { useItemIdAndTheme } from '../../Hooks/UseItemdAndTheme';

export function StoriesStoryComments() {

    const { itemId, theme } = useItemIdAndTheme();

    const { dark, modern } = theme;

    return (
        <>
            <StoryComments 
                itemId={itemId} 
                dark={dark} 
                modern={modern} 
            />
        </>
    )
}
