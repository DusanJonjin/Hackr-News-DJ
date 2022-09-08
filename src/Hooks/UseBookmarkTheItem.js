import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export function useBookmarkTheItem(id, type, getBookmarkedItems) {

    const initialBookmark = {id: 0, toggle: false};

    const [bookmark, setBookmark] = useState(initialBookmark);

    const key = `${type}-${id}`;

    const [isBookmarked, setIsBookmarked] = useState(localStorage.getItem(key) ? true : false);

    const bookmarkedItems = useSelector(state => getBookmarkedItems(state, bookmark, id));

    const toggleBookmark = id => {
        setBookmark(prevBookmark => ({id: id, toggle: !prevBookmark.toggle}));
    };

    useEffect(() => {
        if (!bookmark.id && !bookmark.toggle) return;
        const bookmarkActive = localStorage.getItem(key);
        if (bookmark.id) {
            if (!bookmarkActive) {
                const bookmarkStr = JSON.stringify(bookmarkedItems);
                localStorage.setItem(key, bookmarkStr);
                setIsBookmarked(true);
                setBookmark(initialBookmark);
            }
            if (bookmarkActive) {
                localStorage.removeItem(key);
                setIsBookmarked(false);
                setBookmark(initialBookmark);
            }
        }
    }, [bookmark.toggle])

    return {
        isBookmarked, 
        toggleBookmark
    };
}
