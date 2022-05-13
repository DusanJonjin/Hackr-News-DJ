const mainURL = 'https://hacker-news.firebaseio.com/v0';

// Async function to get all stories (top, new, show, ask...) id's in array:
export const getStoriesIDs = async (storiesApiName, abortSignal, pageNum, storiesPerPage) =>  {
    try {
        const fetchStoriesIDs = await fetch(
            `${mainURL}/${storiesApiName}.json?print=pretty`, {signal: abortSignal}
        );
        const responseIds = await fetchStoriesIDs.json();
        const cleanIds = responseIds.filter(id => id);
        const count = cleanIds.length;
        const storiesToNum = pageNum * storiesPerPage;
        const storiesFromNum = storiesToNum - storiesPerPage;
        const ids = cleanIds.slice(storiesFromNum, storiesToNum);
        return {status: 'isLoaded', ids, count};
    }

    catch (err) {
        if (err.name === 'AbortError') return {status: 'isLoading'};
        return {status: 'error'}
    }
};

/* Async function to get an item (every comment or story has an unique ID which
we insert in this function, and then get it back from server as json object) */
export const getItem = async (itemID, abortSignal) => {
    try {
        const fetchItem = await fetch(
            `${mainURL}/item/${itemID}.json?print=pretty`,
            {signal: abortSignal}
        );
        const item = await fetchItem.json();
        return {status: 'isLoaded', item}
    }

    catch (err) {
        if (err.name === 'AbortError') return {status: 'isLoading'};
        return {status: 'error'}
    }
};

// Async function to get the current largest item (either story or comment) ID:
export const getMaxItem = async (abortSignal) => {
    try {
        const fetchMaxItemID = await fetch(
            `${mainURL}/maxitem.json?print=pretty`,
            {signal: abortSignal}
        );
        const maxItemID = await fetchMaxItemID.json();
        //be carefull on the next line
        return {status: 'isLoaded', maxItemID}
    }

    catch (err) {
        if (err.name === 'AbortError') return {status: 'isLoading'};
        return {status: 'error'}
    }
};