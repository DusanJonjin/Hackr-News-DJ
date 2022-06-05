import React from 'react';
import { Title, StorysDomain, Score, User, TimeAgo } from './AllSharedComponents';
import { getDomainFromUrl, themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/- Shared -/StoryArticle.css';

export function StoryArticle({ children, storyItem, dark, modern }) {

    const {
        id,
        url,
        title,
        score,
        by,
        time
    } = storyItem;

    const domain = getDomainFromUrl(url);

    const storyUrl = url ? url : `https://news.ycombinator.com/item?id=${id}`

    return (
        <article className={themedClass('story-comm-details', dark, modern)}>
            <div className={themedClass('story-comm-details-top-wrap', dark, modern)}>
                <Title 
                    storyUrl={storyUrl}
                    title={title}
                    dark={dark}
                />
                <StorysDomain
                    domain={domain}
                    modern={modern}
                />
            </div>
            <div className={themedClass('story-comm-details-bot-wrap', dark, modern)}>
                <Score score={score} />
                <User 
                    user={by}
                    byWord='by:'
                />
                <TimeAgo time={time}/>
                {children}
            </div>
        </article>
    );
}