import React from 'react';
import { StoryComments } from '../- Shared -/StoryComments';
import { useItemIdAndTheme } from '../../Hooks/UseItemdAndTheme';
import { themedClass } from '../../Utilities/helperFunctions';
import { useReadLocalSetNewValuesOnUnmount } from '../../Hooks/UseReadLocalSetNewValuesOnUnmount';

export function BookmarkStoryComments() {

    const { itemId, theme } = useItemIdAndTheme();

    const { dark, modern } = theme;

    const bMarkedItemArr = useReadLocalSetNewValuesOnUnmount(itemId);

    if (!bMarkedItemArr) return <h2 className={themedClass('invalid-url', dark)}>Bookmark doesn't exist!</h2>

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
