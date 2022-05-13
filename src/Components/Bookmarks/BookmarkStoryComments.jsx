import React from 'react';
import { StoryComments } from '../- Shared -/StoryComments';
import { useItemIdAndTheme } from '../../Hooks/UseItemdAndTheme';
import { useReadLocalSetNewValuesOnUnmount } from '../../Hooks/UseReadLocalSetNewValuesOnUnmount';

export function BookmarkStoryComments() {

    const { itemId, theme } = useItemIdAndTheme();

    const { dark, modern } = theme;

    const bMarkedItemArr = useReadLocalSetNewValuesOnUnmount(itemId);

    if (!bMarkedItemArr) return <p className='url-no-match'>Bookmark doesn't exist!</p>

    const id = itemId.slice(itemId.indexOf('-') + 1);

    return (
        <>
            <StoryComments 
                fromBookmark={true} 
                bMarkedItemArr={bMarkedItemArr}
                itemId={id} 
                dark={dark} 
                modern={modern}
            />
        </>
    )
}
