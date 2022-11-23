import React, { useEffect, useRef } from 'react';
import { User, TimeAgo, Text }  from '../- Shared -/AllSharedComponents';
import { FakeComment } from '../- Placeholders -/FakeComment';
import { StoryCommentOptions } from '../- Shared -/StoryCommentOptions';
import { useGetAndDisplayComment } from '../../Hooks/UseGetAndDisplayComment';
import { useBookmarkTheItem } from '../../Hooks/UseBookmarkTheItem';
import { useDispatch } from 'react-redux';
import { getScrolledCommentID } from '../../Store/actions';
import { getBookmarkedItems, themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Stories/StoryComment.css';

export function StoryComment({ storyId, commentID, goToComment }) {

    const dispatch = useDispatch();

    const commentRef = useRef(null);

    const { 
        dark, 
        modern, 
        commentToDisplay,
        isScrolledComment,
        parentUser, 
        searchValue,
        commentIsExpanded, 
    } = useGetAndDisplayComment(dispatch, commentID);

    const { isBookmarked, toggleBookmark } = useBookmarkTheItem(commentID, 'comment', getBookmarkedItems);

    useEffect(() => {
        if (isScrolledComment) {
            commentRef.current && commentRef.current.scrollIntoView({
                behavior: "smooth"
            });
            setTimeout(() => dispatch(getScrolledCommentID(0)), 750)
        } 
    }, [isScrolledComment])

    if (!commentToDisplay) return <FakeComment />;

    const { status, item, repliesCount } = commentToDisplay;

    if (!item || item.dead || item.deleted ) return null;

    const isSearched = item.by.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;

    const { nestLevel, next } = goToComment;

    return (
        status && status === 'isLoaded' 
        ?   <article className={themedClass('story-comment', dark, modern)} ref={commentRef}>
            {isSearched &&
                <>
                    <div className={`${themedClass('story-comment-top-wrap', dark, modern)} ${isScrolledComment ? 'is-scrolled' : ''}`}>
                        <p 
                            className='comment-bookmark' 
                            onClick={() => toggleBookmark(commentID)}
                        >
                            <span className={themedClass('comment-bookmark-star',dark, modern)}>
                                {isBookmarked ? '\u2605' : '\u2606'}
                            </span>
                        </p>
                        <User user={item.by} />&nbsp;
                        <TimeAgo time={item.time}/>&ensp;
                        <StoryCommentOptions 
                            commentID={commentID}
                            dark={dark}
                            modern={modern}
                            dispatch={dispatch}
                            themedClass={themedClass}
                            repliesCount={repliesCount}
                            commentIsExpanded={commentIsExpanded}
                            goToComment={goToComment}
                        />
                    </div> 
                    {commentIsExpanded &&
                        <div className={themedClass('story-comment-bot-wrap', dark, modern)}>
                            <Text text={parentUser.concat(' ', item.text)} />
                            <a 
                                href={`https://news.ycombinator.com/reply?id=${item.id}&goto=item%3Fid%3D${storyId}%23${item.id}`}
                                target='_blank'
                                className='reply-link'
                                style={{textDecoration: 'underline'}}
                            >
                                reply
                            </a>
                        </div>
                    }
                </>
            }
            {commentIsExpanded ? 
                item.kids && item.kids.map((kidID, i, arr) => 
                    <StoryComment 
                        key={kidID} 
                        commentID={kidID} 
                        storyId={storyId} 
                        goToComment={{
                            ...goToComment,
                            nestLevel: nestLevel + 1,
                            parent: commentID,
                            prev: arr[i - 1] ? arr[i - 1] : 0,
                            next: arr[i + 1] ? arr[i + 1] : next
                        }}
                    />
                ) 
                : null
            }
            </article>
        :   <FakeComment />
    );
}