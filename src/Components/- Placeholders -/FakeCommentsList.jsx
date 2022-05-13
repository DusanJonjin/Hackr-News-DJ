import React from 'react';
import { FakeComment } from './FakeComment';
import { themedClass } from '../../Utilities/helperFunctions';

export function FakeCommentsList({ commentsCount=20, dark, modern }) {

    //Create an arbitary array of thirty values 
    const fakeCommentsArr = Array.from({length: commentsCount}, (v, i) => i);

    return (
        <ul className={themedClass('story-comments-ul', dark, modern)}>
            {fakeCommentsArr.map(num => 
                <li key={num} className={'story-comments-li'}>
                    <FakeComment />
                </li>
            )}
        </ul>
    );
}