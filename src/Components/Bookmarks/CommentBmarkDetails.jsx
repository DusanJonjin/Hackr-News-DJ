import React from 'react';
import { User } from '../- Shared -/User';
import { TimeAgo } from '../- Shared -/TimeAgo';
import { useThemeAndClearCommentsOnUnmount } from '../../Hooks/UseThemeAndClearCommentsOnUnmount';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Bookmarks/CommentBmarkDetails.css';

export function CommentBmarkDetails({ commentItem, bMarkedItemArr }) {

    const {
        by,
        time
    } = commentItem;

    const storyTitle = bMarkedItemArr[0].title;

    const { dark, modern } = useThemeAndClearCommentsOnUnmount();
    
    return (
        <div className={themedClass('comment-bmark-details', dark, modern)}>
            <User user={by} />
            <TimeAgo time={time} />
            <p>on: <strong>{storyTitle}</strong></p>
        </div>
    );
}