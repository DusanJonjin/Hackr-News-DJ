import React, { useState } from 'react';
import { User, TimeAgo, Text }  from '../- Shared -/AllSharedComponents';
import { FakeComment } from '../- Placeholders -/FakeComment';
import { useGetAndDisplayComment } from '../../Hooks/UseGetAndDisplayComment';
import { useDispatch } from 'react-redux';
import { getRepliesCount, collapseExpandComment } from '../../Store/actions';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Stories/StoryComment.css';

export function StoryBmarkComment({ commentID, itemKey }) {

    const dispatch = useDispatch();

    const { 
        dark, 
        modern, 
        commentToDisplay, 
        parentUser,
        searchValue,
        commentIsExpanded, 
    } = useGetAndDisplayComment(dispatch, commentID);

    const [bMarkedStoryArr, setBMarkedStoryArr] = useState(JSON.parse(localStorage.getItem(itemKey)));

    const checkIfIsNew = () => {
        if(bMarkedStoryArr) {
            const check = bMarkedStoryArr.find(item => item.id === commentID) ? false : true;
            return check;
        }
        return true;
    };

    const isNew = checkIfIsNew();

    if (!commentToDisplay) return <FakeComment />;

    const { status, item, repliesCount } = commentToDisplay;

    if (!item || item.dead || item.deleted ) return null;

    const isSearched = item.by.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;

    const storyId = bMarkedStoryArr[0].id;

    return (
        status && status === 'isLoaded' 
        ?   <article className={themedClass('story-comment', dark, modern)}>
            {isSearched &&
                <>
                    <div className={themedClass('story-comment-top-wrap', dark, modern)}>
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
                        {isNew && <p className='new-comm'>NEW</p>}
                    </div> 
                    {commentIsExpanded &&
                        <div className={themedClass('story-comment-bot-wrap', dark, modern)}>
                            <Text text={parentUser.concat(' ', item.text)} />
                            <a 
                                href={`https://news.ycombinator.com/reply?id=${item.id}&goto=item%3Fid%3D${storyId}%23${item.id}`}
                                target='_blank'
                                className='reply-link'
                            >
                                reply
                            </a>
                        </div>
                    }
                </>
            }
            {commentIsExpanded ? 
                item.kids && item.kids.map(kidID => 
                    <StoryBmarkComment key={kidID} commentID={kidID} itemKey={itemKey} />) 
                : null
            }
            </article>
        :   <FakeComment />
    );
}