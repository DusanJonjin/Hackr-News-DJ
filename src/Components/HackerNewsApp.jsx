import React, { useLayoutEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { setThemeFromLocal } from '../Store/actions';
import '../Styles/HackerNewsApp.css';

export function HackerNewsApp() {

    const theme = useSelector(state => state.theme);

    const dispatch = useDispatch();

    useScrollToTop();

    useLayoutEffect(() => {
        const localThemeString = localStorage.getItem('theme');
        if (localThemeString) {
            const localThemeObj = JSON.parse(localThemeString);
            dispatch(setThemeFromLocal(localThemeObj));
        } else {
            const themeString = JSON.stringify(theme);
            localStorage.setItem('theme', themeString);
        }
    }, []);

    return (
        <div className={themedClass('app-wrapper', theme.dark)}>
            <Header theme={theme} />
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
            <footer className={themedClass('app-footer', theme.dark)}>
                © {new Date().getFullYear()}. Hackr News App by D.J.
            </footer>      
        </div>
    );
}