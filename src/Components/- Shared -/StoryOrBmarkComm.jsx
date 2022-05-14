import React from 'react';
import { StoryComment } from '../Stories/StoryComment';
import { StoryBmarkComment } from '../Bookmarks/StoryBmarkComment';

export function StoryOrBmarkComm({ fromBookmark, commentID, itemKey, storyId }) {

    return (
        fromBookmark ? <StoryBmarkComment commentID={commentID} itemKey={itemKey} />
            : <StoryComment commentID={commentID} storyId={storyId} />
    );
}