import React from 'react';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/- Placeholders -/FakeStory.css';

export function FakeStory({ dark, modern }) {

    return (
        <article className={themedClass('story', dark, modern)}>
            <p className={themedClass('fake-num', dark, modern)}></p>
            <div className={themedClass('fake-story-top', dark, modern)}></div>
            <div className={themedClass('fake-story-bottom', dark, modern)}></div>
        </article>
    );
}