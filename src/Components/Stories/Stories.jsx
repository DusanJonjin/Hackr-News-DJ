import React, { useState, useEffect } from 'react';
import { StoriesList } from './StoriesList';
import { StoriesPaginate } from './StoriesPaginate';
import { StoriesStoryComments } from './StoriesStoryComments';
import { FakeStoriesList } from '../- Placeholders -/FakeStoriesList';
import { NoUrl } from '../- Shared -/NoUrl';
import { getStoriesIDs } from '../../API/ApiCalls';
import { initializeMidBtns } from '../../Utilities/helperFunctions';
import { usePreventSetStateOnUnmount } from '../../Hooks/PreventSetStateOnUnmount';
import { Routes, Route, useLocation } from 'react-router';
import '../../Styles/Stories/Stories.css';

const initialStoriesObj = {
    status: 'isLoading',
    ids: [],
    count: 0,
};

export function Stories({ storiesApiName }) {

    const { pathname } = useLocation();

    const pageNum = !pathname.includes('page') ? 1 : parseInt(pathname.slice(pathname.indexOf('_') + 1));

    const [storiesObj, setStoriesObj] = useState(initialStoriesObj);
    // eslint-disable-next-line no-unused-vars
    const [storiesPerPage, setStoriesPerPage] = useState(30);
    const [paginateMidBtns, setPaginateMidBtns] = useState([]);

    const handleMidBtns = array => {
        setPaginateMidBtns(array)
    };

    const { isMounted, abortController, abortSignal } = usePreventSetStateOnUnmount();

    useEffect(() => {
        setStoriesObj(initialStoriesObj);
        getStoriesIDs(storiesApiName, abortSignal, pageNum, storiesPerPage).then(res => 
            isMounted.current && (
                setStoriesObj(res),
                (pageNum === 1 || paginateMidBtns.length < 1) &&
                setPaginateMidBtns(initializeMidBtns(res.count, storiesPerPage, pageNum))
            )
        ); 
        window.scrollTo(0, 0);
        // If a user quickly clicks on a paginate button and then on some nav link:
        return () => abortController.abort();     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum, storiesApiName, storiesPerPage]);

    const { status, ids, count } = storiesObj;

    return (
        <section className='stories-with-comments'>
            {
                {  
                    'isLoading': 
                        <FakeStoriesList />, 
                    'error':
                        <p className='error'>
                            Network error. Refresh the browser, or try again later.
                        </p>,
                    'isLoaded':
                        <Routes>
                            <Route 
                                path={pageNum === 1 ? '' : `/page_:PageNum` } 
                                element={
                                    <>
                                        <StoriesList 
                                            storiesIDs={ids}
                                            pageNum={pageNum}
                                            storiesPerPage={storiesPerPage}
                                        />
                                        <StoriesPaginate
                                            pageNum={pageNum}
                                            storiesCount={count}
                                            midBtns={paginateMidBtns}
                                            handleMidBtns={handleMidBtns} 
                                            storiesPerPage={storiesPerPage}                  
                                        />
                                    </>
                                }
                            />                          
                            <Route 
                                path={pageNum === 1 ? `/itemId=:StoryId` : `/page_:PageNum/itemId=:StoryId`}
                                element={<StoriesStoryComments />}
                            />
                            <Route path='*' element={<NoUrl />} />
                        </Routes>
                }[status]
            }
        </section>
    );
}