import React from 'react';
import { StoryDetails } from '../Stories/StoryDetails';
import { StoryBmarkDetails } from '../Bookmarks/StoryBmarkDetails';
import { CommentBmarkDetails } from '../Bookmarks/CommentBmarkDetails';

export function ItemDetails({ item, fromBookmark, bMarkedItemArr }) {

    if (item.type === 'comment') return <CommentBmarkDetails commentItem={item} bMarkedItemArr={bMarkedItemArr} />;

    return (
        fromBookmark 
            ? <StoryBmarkDetails storyItem={item} bMarkedItemArr={bMarkedItemArr} />
            : <StoryDetails storyItem={item} />  
    );
}