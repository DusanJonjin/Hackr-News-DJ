import React, {useState, useEffect}from 'react';
import { Title } from '../- Shared -/Title';
import { getItem } from '../../API/ApiCalls';
import { usePreventSetStateOnUnmount } from '../../Hooks/PreventSetStateOnUnmount';
import { useSelector } from 'react-redux';
import '../../Styles/Comments/RefferedStory.css'

export function ReferredStory({ parent }) {

    const { dark } = useSelector(state => state.theme); 

    const [story, setStory] = useState({status: 'isloading', item: {}});

    const { isMounted, abortController, abortSignal } = usePreventSetStateOnUnmount();

    useEffect(() => {
        getItem(parent, abortSignal).then(res => isMounted.current && setStory(res));
        return () => abortController.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { item } = story;

    if (!item) return null;

    if (item.parent) return <ReferredStory parent={item.parent} />

    return (   
            <Title storyUrl={item.url} title={item.title} dark={dark} />
    );
}