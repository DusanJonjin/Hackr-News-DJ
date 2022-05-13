import React from 'react';
import { themedClass } from "../../Utilities/helperFunctions";
import '../../Styles/- Placeholders -/FakeStoryDetails.css'

export function FakeStoryDetails({ dark, modern }) {

    return (
        <article className={themedClass('fake-story-details', dark, modern)}>
            <div className={themedClass('fake-story-details-div', dark, modern)}></div>
        </article>
    );
}