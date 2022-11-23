import React from 'react';
import { collapseExpandComment, getScrolledCommentID, getRepliesCount } from '../../Store/actions';

export function StoryCommentOptions(props) {

    const {
        commentID,
        dark,
        modern,
        dispatch,
        themedClass,
        repliesCount,
        commentIsExpanded,
        goToComment
    } = props;

    const {
        nestLevel,
        root,
        rootsLength,
        parent,
        prev,
        next
    } = goToComment;

    return (
        <div className={themedClass('comment-exp-collapse', dark, modern)}>
            {nestLevel > 1 ? <p onClick={() => dispatch(getScrolledCommentID(root))}>root</p> : ''}
            {parent !== 0 ? <p onClick={() => dispatch(getScrolledCommentID(parent))}>parent</p> : ''}
            {prev !== 0 ? <p onClick={() => dispatch(getScrolledCommentID(prev))}>prev</p> : ''}
            {next !== 0 && rootsLength > 1 ? <p onClick={() => dispatch(getScrolledCommentID(next))}>next</p> : ''}
            <p 
                onClick={() => (
                    dispatch(getRepliesCount(commentID)),
                    dispatch(collapseExpandComment(commentID))
                )}
            >
                {commentIsExpanded ? `[ - ]` : `[ ${repliesCount} more ]`}
            </p>
            {nestLevel > 0 
            ?   <p 
                    onClick={() => (
                        dispatch(getRepliesCount(root)),
                        dispatch(collapseExpandComment(root)),
                        dispatch(getScrolledCommentID(root))
                    )}
                >
                    [ x ]
                </p> 
            :   ''
            }
            
        </div>
    );
}
