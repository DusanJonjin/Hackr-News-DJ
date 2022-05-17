import React, {useState, useEffect} from 'react';
import { User, TimeAgo, Text } from '../- Shared -/AllSharedComponents';
import { ReferredStory } from './ReferredStory';
import { FakeComment } from '../- Placeholders -/FakeComment';
import { getItem } from '../../API/ApiCalls';
import { themedClass } from '../../Utilities/helperFunctions';
import { usePreventSetStateOnUnmount } from '../../Hooks/PreventSetStateOnUnmount';
import { useSelector } from 'react-redux';

export function Comment({ itemID }) {

    const { dark, modern } = useSelector(state => state.theme);

    const [comment, setComment] = useState({status: 'isLoading', item:{}});

    const { isMounted, abortController, abortSignal } = usePreventSetStateOnUnmount();

    useEffect(() => {
        getItem(itemID, abortSignal).then(res => isMounted.current && setComment(res));
        return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { status, item } = comment;

    if (!item || item.type === 'story'|| item.dead || item.deleted) return null;

    return (
        status === 'isLoading' ? <FakeComment /> :
            <article className={themedClass('story-comment', dark, modern)}>
                <div className={themedClass('story-comment-top-wrap', dark, modern)}>
                    <User user={item.by}/>&nbsp;
                    <TimeAgo time={item.time}/>&nbsp;on:&nbsp;
                    <ReferredStory parent={item.parent} />
                </div>
                <div className={`${themedClass('story-comment-bot-wrap', dark, modern)} fresh`}>
                    <Text text={item.text} />
                </div>
            </article>
    )
}
