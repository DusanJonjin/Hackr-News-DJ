import React from 'react';
import { FakeStory } from './FakeStory';
import { useSelector } from 'react-redux';
import { themedClass } from '../../Utilities/helperFunctions';

export function FakeStoriesList() {

    const { dark, modern } = useSelector(state => state.theme)

    //Create an arbitary array of thirty values 
    const fakeStoriesArr = Array.from({length: 30}, (v, i) => i);

    return (
        <ul className={themedClass('fake-stories-ul', dark, modern)}>
            {fakeStoriesArr.map(num => 
                <li key={num}>
                    <FakeStory
                        dark={dark}
                        modern={modern}
                    />
                </li>
            )}
        </ul>
    );
}