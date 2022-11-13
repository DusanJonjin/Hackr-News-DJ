import React from 'react';
import { Header } from './Header/Header';
import { Stories } from './Stories/Stories';
import { Comments } from './Comments/Comments';
import { Bookmarks } from './Bookmarks/Bookmarks';
import { User } from './User/User';
import { NoUrl } from './- Shared -/NoUrl';
import { pathsAndApis } from '../Utilities/variousData';
import { Routes, Route, Navigate } from 'react-router-dom';
import { themedClass } from '../Utilities/helperFunctions';
import { useScrollToTop } from '../Hooks/ScrollToTop';
import { useSelector } from 'react-redux';
import '../Styles/HackerNewsApp.css';

export function HackerNewsApp() {

    const { dark } = useSelector(state => state.theme);

    useScrollToTop();

    return (
        <div className={themedClass('app-wrapper', dark)}>
            <Header />
            <main>
                <Routes>
                   <Route path='/' element={<Navigate replace to='/top' />} />
                    {pathsAndApis.reduce((acc, { path, api }, i) => api.includes('stories') 
                        ? [...acc,
                            <Route key={i} path={`${path}/*`} 
                                element={<Stories key={api} storiesApiName={api} />} 
                            />
                        ]
                        : acc
                    , [])}
                    <Route path='/comments/*' element={<Comments />} />
                    <Route path='/bookmarks/*' element={<Bookmarks />} />
                    <Route path='/user/*' element={<User />} />
                    <Route path='*' element={<NoUrl />} />
                </Routes>
            </main>
            <footer className={themedClass('app-footer', dark)}>
                © {new Date().getFullYear()}. Hackr News App by D.J.
            </footer>      
        </div>
    )
}