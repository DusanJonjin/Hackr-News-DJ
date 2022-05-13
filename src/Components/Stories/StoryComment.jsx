import React from 'react';
import { User, TimeAgo, Text }  from '../- Shared -/AllSharedComponents';
import { FakeComment } from '../- Placeholders -/FakeComment';
import { useGetAndDisplayComment } from '../../Hooks/UseGetAndDisplayComment';
import { useBookmarkTheItem } from '../../Hooks/UseBookmarkTheItem';
import { useDispatch } from 'react-redux';
import { getRepliesCount, collapseExpandComment } from '../../Store/actions';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Stories/StoryComment.css';

export function StoryComment({ commentID }) {

    const dispatch = useDispatch();

    const { 
        dark, 
        modern, 
        commentToDisplay,
        parentUser, 
        searchValue,
        commentIsExpanded, 
    } = useGetAndDisplayComment(dispatch, commentID);

    const getBookmarkedItems = (state, bookmark) => {
        if (state.comments.some(comment => comment.item.id === bookmark.id)) { 
            const getAllItems = (commentID, accum) => {
                const count = state.comments.reduce((acc, comment) => {
                    const { item } = comment;
                    if (!item || item.dead || item.deleted) return acc; 
                    if (!acc.length && item.type === 'story') return [item, ...acc];
                    if (acc.length < 2 && item.id === bookmark.id) return [...acc, item];
                    if (item.parent === commentID) return getAllItems(item.id, [...acc, item])
                    return acc
                }, accum);
                return count;
            }
            const allItems = getAllItems(commentID, []);
            return allItems;
        }
    };

    const { isBookmarked, toggleBookmark } = useBookmarkTheItem(commentID, 'comment', getBookmarkedItems);

    if (!commentToDisplay) return <FakeComment />;

    const { status, item, repliesCount } = commentToDisplay;

    if (!item || item.dead || item.deleted ) return null;

    const isSearched = item.by.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;

    return (
        status && status === 'isLoaded' 
        ?   <article className={themedClass('story-comment', dark, modern)}>
            {isSearched &&
                <>
                    <div className={themedClass('story-comment-top-wrap', dark, modern)}>
                        <p 
                            className='comment-bookmark' 
                            onClick={() => (
                                !repliesCount && dispatch(getRepliesCount(commentID)),
                                toggleBookmark(commentID)
                            )}
                        >
                            <span className={themedClass('comment-bookmark-star',dark, modern)}>
                                {isBookmarked ? '\u2605' : '\u2606'}
                            </span>
                        </p>
                        <User user={item.by} />&nbsp;
                        <TimeAgo time={item.time}/>&ensp;
                        <p 
                            className={themedClass('comment-exp-collapse', dark, modern)}
                            onClick={() => (
                                !repliesCount && dispatch(getRepliesCount(commentID)),
                                dispatch(collapseExpandComment(commentID))
                            )}
                        >
                            {commentIsExpanded ? `[ - ]` : `[ ${repliesCount} more ]`}
                        </p>
                    </div> 
                    {commentIsExpanded &&
                        <div className={themedClass('story-comment-bot-wrap', dark, modern)}>
                            <Text text={parentUser.concat(' ', item.text)} />
                        </div>
                    }
                </>
            }
            {commentIsExpanded ? 
                item.kids && item.kids.map(kidID => 
                    <StoryComment key={kidID} commentID={kidID} />) 
                : null
            }
            </article>
        :   <FakeComment />
    )
}