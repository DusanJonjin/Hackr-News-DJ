import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { ThemesBar } from './ThemesBar';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { themedClass } from '../../Utilities/helperFunctions';
import { pathsAndApis } from '../../Utilities/variousData';
import '../../Styles/Header/Header.css';

export function Header() {

    const { pathname } = useLocation();

    const { dark, modern } = useSelector(state => state.theme);

    const [navMenu, setNavMenu] = useState(false);

    const [hambMenu, setHambMenu] = useState(false);

    const toggleNavMenu = () => {
        setNavMenu(prevNavMenu => !prevNavMenu);
        setHambMenu(false);
    }

    const closeNavMenu = () => {
        setNavMenu(false);
    }

    const toggleHambMenu = () => {
        setHambMenu(prevHambMenu => !prevHambMenu);
        setNavMenu(false);
    }

    const closeHambMenu = () => {
        setHambMenu(false);
    }

    const currentPage = pathsAndApis.reduce((acc, { path }) => 
        pathname.includes(path) ? path.slice(1, path.length) : acc, ''
    );

    const isSubPage = pathname.includes('item');

    return (
        <header className={themedClass('app-header', dark)}>
            <div id='logo-wrapper'>
                <img src={'/Images/hn-logo.png'}
                     alt='hacker-news-custom-logo'
                />
                <h1>Hackr News App</h1>
            </div>
            <div className='current-page-wrapper'>
                <h2 
                    className={`${themedClass('current-page', dark)} ${navMenu ? 'curr-page-nav-open' : ''} ${isSubPage ? 'sub-page' : ''}`} 
                    onClick={() => toggleNavMenu()}
                >
                    <img src={`/Images/triangle-arrow${dark ? '-dark' : ''}.png`} alt='arrow-icon' /> {currentPage}
                </h2>
            </div>
            <Navbar 
                navMenu={navMenu}
                closeNavMenu={closeNavMenu}
                dark={dark}
                pathname={pathname}
                pathsAndApis={pathsAndApis}
            />
            <ThemesBar 
                hambMenu={hambMenu}
                closeHambMenu={closeHambMenu}
                dark={dark} 
                modern={modern}
            />
            <div className='hamburger-wrap' onClick={() => toggleHambMenu()}>
                <div className={`${themedClass('hamburger', dark)} ${hambMenu ? 'hamb-open' : ''}`}></div>
            </div>
        </header>
    )
}