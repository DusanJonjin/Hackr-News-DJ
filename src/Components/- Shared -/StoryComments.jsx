import React, { useState, useEffect } from 'react';
import { CommentsCount } from './CommentsCount';
import { SearchComments } from './SearchComments';
import { Text } from './Text';
import { ItemDetails } from './ItemDetails';
import { StoryCommentsList } from './StoryCommentsList';
import { FakeStoryDetails } from '../- Placeholders -/FakeStoryDetails';
import { FakeCommentsList } from '../- Placeholders -/FakeCommentsList';
import { getItem } from '../../API/ApiCalls';
import { usePreventSetStateOnUnmount } from '../../Hooks/PreventSetStateOnUnmount';
import { themedClass } from '../../Utilities/helperFunctions';
import { useDispatch } from 'react-redux';
import { getComment } from '../../Store/actions';
import '../../Styles/Stories/StoryComments.css';

export function StoryComments({ fromBookmark=false, bMarkedItemArr=[], itemId, dark, modern }) {

    const dispatch = useDispatch();

    const [itemObj, setItemObj] = useState({status: 'isLoading', item: {}});

    const { isMounted, abortController, abortSignal } = usePreventSetStateOnUnmount();

    useEffect(() => {
        getItem(itemId, abortSignal).then(res =>
            isMounted.current && (setItemObj(res), dispatch(getComment(res)))
        );
        return () => abortController.abort();   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemId]);

    const { status, item } = itemObj;

    if(!item) return <p>Story doesn't exist</p>;

    const isComment = item.type === 'comment';
    
    const itemKey = isComment ? `comment-${item.id}` : `story-${item.id}`;

    return (
        <section className={themedClass('story-comments-wrap', dark, modern)}>
            {
                {
                    'isLoading': 
                        <>
                            <FakeStoryDetails dark={dark} modern={modern} />
                            <div className={themedClass('fake-comments-count', dark, modern)}></div>
                            <FakeCommentsList dark={dark} modern={modern} />
                        </>,
                    'error': 
                        <p className='error'>
                            Network error. Refresh the browser, or try again later.
                        </p>,
                    'isLoaded':
                        <div className={themedClass('details-comments-wrap', dark, modern)}>
                            <ItemDetails item={item} fromBookmark={fromBookmark} bMarkedItemArr={bMarkedItemArr}/>
                            {item.text &&
                                <div 
                                    className={`${themedClass('details-comments-text', dark, modern)} ${isComment ? 'dct-bmark' : ''}`}
                                >
                                    <Text text={item.text} />
                                </div>
                            }
                            {item.type !== 'comment' &&
                                <div className={themedClass('count-search-wrap', dark, modern)} >
                                    <CommentsCount clsName='details-comm-count'>
                                        {!item.descendants ? '0' : item.descendants}&nbsp;
                                        {`comment${item.descendants !== 1 ? 's': ''}`}
                                    </CommentsCount>
                                    <SearchComments />
                                </div>
                            }
                            {item.kids && 
                                <StoryCommentsList 
                                    commentsIDs={item.kids}
                                    itemKey={itemKey}
                                    storyId={item.id}
                                    dark={dark}
                                    modern={modern}
                                    fromBookmark={fromBookmark}
                                />            
                            }
                        </div>
                }[status]
            }
        </section>
    );
}