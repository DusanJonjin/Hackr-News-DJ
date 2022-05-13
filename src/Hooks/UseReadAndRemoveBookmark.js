import { useState, useEffect } from 'react';

export function useReadAndRemoveBookmark(key, readFromLocal) {

    const [bookmark, setBookmark] = useState(JSON.parse(localStorage.getItem(key)));

    const [isRemoved, setIsRemoved] = useState(false);

    const removeBookmark = () => setIsRemoved(true);

    useEffect(() =>{
        isRemoved && (localStorage.removeItem(key), readFromLocal())
    }, [isRemoved]);

    return {
      bookmark,
      removeBookmark
    };
}