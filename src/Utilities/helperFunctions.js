export const getDomainFromUrl = url => {
    //if there is no url the story comes from hackernews website:
    if (!url) return 'news.ycombinator.com';
    //Match the values between http(s) and the first next slash(/)
    const longUrl = url.match(/https:\/\/(.*?)\/|http:\/\/(.*?)\//);
    //If match is null, url is short - we need to slice out 'http(s)://' from it:
    if (!longUrl) {
        if (url.includes('https://')) {
            return url.slice(url.includes('www.') ? 12 : 8);
        }
        else if (url.includes('http://')) {
            return url.slice(url.includes('www.') ? 11 : 7);
        }
        return url;
    }
    //Filter out returned boolean values from matched array:
    const filterUrl = longUrl.filter(Boolean);
    //Wanted value is the last value in array:
    const shortUrl = filterUrl[filterUrl.length - 1];
    //If the value contains 'www.' we slice it out:
    if (shortUrl.includes('www.')) {
        return shortUrl.slice(4);
    }
    return shortUrl;
};

export const calculateTimeAgo = storyTime => {
    const dateNowInSec = (new Date().getTime() / 1000).toFixed()
    const secondsAgo = dateNowInSec - storyTime;
    const minutesAgo = (secondsAgo / 60).toFixed();
    const hoursAgo = (secondsAgo / 3600).toFixed();
    const daysAgo = (secondsAgo / (3600 * 24)).toFixed();
    const singularOrNot = (timeAgo, timeUnit) => {
        const singular = timeAgo + ` ${timeUnit} ago`;
        const plural = timeAgo + ` ${timeUnit}s ago`;
        return timeAgo < 2 ? singular : plural;
    }
    if (secondsAgo < 60) return singularOrNot(secondsAgo, 'second');
    if (minutesAgo < 60) return singularOrNot(minutesAgo, 'minute');
    if (hoursAgo < 24) return singularOrNot(hoursAgo, 'hour');
    else return singularOrNot(daysAgo, 'day');
};

export const initializeMidBtns = (storiesCount, storiesPerPage, pageNum) => {
    const pagesCount = Math.ceil(storiesCount / storiesPerPage);
    if (pagesCount < 8) return Array.from({length: pagesCount}, (_, i) => i + 1);
    const midBtnsCount = 5;
    const initialBtns = Array.from({length: midBtnsCount}, (_, i) => {
        if (pageNum <= midBtnsCount) return (i + 2);
        if (pageNum >= pagesCount - (midBtnsCount - 1)) return (i + (pagesCount - midBtnsCount));
        return (i + (pageNum - 2));
    })
    return initialBtns;
}

export const getBookmarkedItems = (state, bookmark, commentID) => {
    if (state.comments.some(comment => comment.item.id === bookmark.id)) { 
        const getAllItems = (commentID, accum) => {
            const count = state.comments.reduce((acc, comment) => {
                const { item } = comment;
                if (!item || item.dead || item.deleted) return acc; 
                if (!acc.length && item.type === 'story') return [item, ...acc];
                if (acc.length < 2 && item.id === bookmark.id) return [...acc, item];
                if (item.parent === commentID) return getAllItems(item.id, [...acc, item])
                return acc
            }, accum);
            return count;
        }
        const allItems = getAllItems(commentID, []);
        return allItems;
    }
};

export const themedClass = (className, dark=false, modern=false) => {
    const darkTheme = dark ? `dark-${className}` : '';
    const modernTheme = modern ? `modern-${className}` : '';
    return `${className} ${darkTheme} ${modernTheme}`
};