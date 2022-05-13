import React from 'react';
import { StoryOrBmarkComm } from './StoryOrBmarkComm';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Stories/StoryCommentsList.css';

export function StoryCommentsList({ commentsIDs, itemKey, dark, modern, fromBookmark }) {

    return (
        <ul className={themedClass('story-comments-ul', dark, modern)}>
            {commentsIDs.map(commentID => 
                <li key={commentID} className={'story-comments-li'}>
                    <StoryOrBmarkComm 
                        fromBookmark={fromBookmark} 
                        commentID={commentID} 
                        itemKey={itemKey}
                    />
                </li>
            )}
        </ul>
    );
}