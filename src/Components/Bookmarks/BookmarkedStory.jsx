import React from 'react';
import { Title, StorysDomain, User, TimeAgo } from '../- Shared -/AllSharedComponents';
import { getDomainFromUrl, themedClass } from '../../Utilities/helperFunctions';
import { useReadAndRemoveBookmark } from '../../Hooks/UseReadAndRemoveBookmark';
import { Link } from 'react-router-dom';
import '../../Styles/Bookmarks/BookmarkedStory.css'

export function BookmarkedStory({ storyKey, readFromLocal, dark, modern }) {

    const { bookmark, removeBookmark } = useReadAndRemoveBookmark(storyKey, readFromLocal);

    if (!bookmark) return null;

    const story = bookmark[0];

    const domain = getDomainFromUrl(story.url);

    return (
        <article className={themedClass('bookmarked-story', dark, modern)}>
            <div className={themedClass('bm-story-top-wrap', dark, modern)}>
                <Title 
                    storyUrl={story.url}
                    title={story.title}   
                    dark={dark}           
                />
                <StorysDomain modern={modern} domain={domain} />
            </div>
            <div className={themedClass('bm-story-bot-wrap', dark, modern)}>
                <User user={story.by} byWord='by:' />
                <TimeAgo time={story.time} />
            </div>
            <div className={themedClass('view-remove-wrap', dark, modern)}>
                <Link to={`itemId=story-${story.id}`} className={themedClass('full-item-link', dark, modern)}>
                    <p>View full &gt;&gt;</p>
                </Link>
                <p onClick={() => removeBookmark()}>Remove</p>
            </div>
        </article>
    );
}