import React from 'react';
import { StoryOrBmarkComment } from './StoryOrBmarkComm';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Stories/StoryCommentsList.css';

export function StoryCommentsList({ commentsIDs, itemKey, storyId, dark, modern, fromBookmark }) {

    return (
        <ul className={themedClass('story-comments-ul', dark, modern)}>
            {commentsIDs.map((commentID, i, arr) => 
                <li key={commentID} className={'story-comments-li'}>
                    <StoryOrBmarkComment
                        fromBookmark={fromBookmark} 
                        commentID={commentID} 
                        itemKey={itemKey}
                        storyId={storyId}
                        rootPreviousCommentID={arr[ i - 1] ? arr[ i - 1] : 0}
                        rootNextCommentID={arr[i + 1] ? arr[i + 1] : 0}
                        goToComment={{
                            nestLevel: 0,
                            root: commentID, 
                            parent: 0, 
                            prev: arr[i - 1] ? arr[i - 1] : 0,
                            next: arr[i + 1] ? arr[i + 1] : 0
                        }}
                    />
                </li>
            )}
        </ul>
    );
}