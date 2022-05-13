import React from 'react';
import { TimeAgo, Text, User } from '../- Shared -/AllSharedComponents';
import { useReadAndRemoveBookmark } from '../../Hooks/UseReadAndRemoveBookmark';
import { themedClass } from '../../Utilities/helperFunctions';
import { Link } from 'react-router-dom';
import '../../Styles/Bookmarks/BookmarkedComment.css';

export function BookmarkedComment({ commentKey, readFromLocal, dark, modern }) {

    const { bookmark, removeBookmark } = useReadAndRemoveBookmark(commentKey, readFromLocal);

    if (!bookmark) return null;

    const story = bookmark[0];

    const comment = bookmark[1];

    return (
        <article className={themedClass('bookmarked-comment', dark, modern)}>
            <div className={themedClass('bm-comment-top-wrap', dark, modern)}>
                <User user={comment.by} />
                <TimeAgo time={comment.time} />
                <p>on: <strong>{story.title}</strong></p>
            </div>
            <div className={themedClass('bm-comment-bot-wrap', dark, modern)}>
                <Text text={comment.text} />
            </div>
            <div className={themedClass('view-remove-wrap', dark, modern)}>
                <Link to={`itemId=comment-${comment.id}`} className={themedClass('full-item-link', dark, modern)}>
                    <p>View full &gt;&gt;</p>
                </Link>
                <p onClick={() => removeBookmark()}>Remove</p>
            </div>
        </article>
    );
}