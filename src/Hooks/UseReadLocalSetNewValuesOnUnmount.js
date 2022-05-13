import { useState, useEffect } from 'react';
import { useStore } from 'react-redux';


export function useReadLocalSetNewValuesOnUnmount(itemId) {

    const store = useStore();

    const [bMarkedItemArr, setBMarkedItemArr] = useState(JSON.parse(localStorage.getItem(itemId)));

    useEffect(() => {
        return () => {
            if (bMarkedItemArr) {
                const story = bMarkedItemArr[0];
                const comments = store.getState().comments;
                const currItemArr = comments.map(comm => comm.item);
                const allItemArr = itemId.includes('comment') ? [story, ...currItemArr] : currItemArr;
                if (allItemArr.length > bMarkedItemArr.length) {
                    const currStoryStr = JSON.stringify(allItemArr);
                    localStorage.setItem(itemId, currStoryStr);
                }
            }
        };
    },[])

    return bMarkedItemArr;
}