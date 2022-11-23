import React from 'react';
import { Story } from './Story';
import { useSelector } from 'react-redux';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Stories/StoriesList.css';

export function StoriesList({ storiesIDs, pageNum, storiesPerPage }) {

    const { dark, modern } = useSelector(state => state.theme);

    const calcStoryNum = index => (pageNum - 1) * storiesPerPage + (index + 1);

    return (
        <ol className={themedClass('stories-ol', dark, modern)}>
            {storiesIDs.map((storyID, index) => 
                <li key={storyID} className='stories-li'>
                    <Story 
                        storyID={storyID}
                        storyNum={calcStoryNum(index)}
                        dark={dark}
                        modern={modern}        
                    />
                </li>
            )}
        </ol>
    );
}