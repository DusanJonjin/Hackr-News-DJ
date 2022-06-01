import React from 'react';
import { BookmarksAll } from './BookmarksAll'; 
import { BookmarkStoryComments } from './BookmarkStoryComments';
import { NoUrl } from '../- Shared -/NoUrl';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Bookmarks/Bookmarks.css'

export function Bookmarks() {

    const { dark, modern } = useSelector(state => state.theme);

    return (
        <section className={themedClass('bookmarks', dark, modern)}>
            <Routes>
                <Route path='' element={<BookmarksAll dark={dark} modern={modern} />} />
                <Route path='itemId=:ItemId' element={<BookmarkStoryComments />} />
                <Route path='*' element={<NoUrl />} />
            </Routes>
        </section>
    )
}