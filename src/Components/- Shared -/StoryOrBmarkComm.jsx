import React from 'react';
import { StoryComment } from '../Stories/StoryComment';
import { StoryBmarkComment } from '../Bookmarks/StoryBmarkComment';

export function StoryOrBmarkComment(props) {

    const { 
        fromBookmark,
        commentID,
        itemKey,
        storyId,
        goToComment
    } = props;

    return (
        fromBookmark 
        ? <StoryBmarkComment 
                commentID={commentID} 
                itemKey={itemKey} 
                goToComment={goToComment}
        />
        : <StoryComment 
                storyId={storyId} 
                commentID={commentID} 
                goToComment={goToComment}
        />
    );
}