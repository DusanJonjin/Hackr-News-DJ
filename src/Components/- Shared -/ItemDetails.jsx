import React from 'react';
import { StoryDetails } from '../Stories/StoryDetails';
import { StoryBmarkDetails } from '../Bookmarks/StoryBmarkDetails';
import { CommentBmarkDetails } from '../Bookmarks/CommentBmarkDetails';

export function ItemDetails({ item, fromBookmark, bMarkedItemArr }) {

    return (
        fromBookmark 
            ? item.type === 'comment' 
                ? <CommentBmarkDetails commentItem={item} bMarkedItemArr={bMarkedItemArr} />
                : <StoryBmarkDetails storyItem={item} bMarkedItemArr={bMarkedItemArr} />
            : <StoryDetails storyItem={item} />  
    );
}