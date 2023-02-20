import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { ThemesBar } from './ThemesBar';
import { useLocation } from 'react-router-dom';
import { themedClass } from '../../Utilities/helperFunctions';
import { pathsAndApis } from '../../Utilities/variousData';
import { Link } from 'react-router-dom';
import '../../Styles/Header/Header.css';

export function Header({ theme }) {

    const { pathname } = useLocation();

    const { dark, modern } = theme;

    const [hambMenu, setHambMenu] = useState(false);

    const toggleHambMenu = () => {
        setHambMenu(prevHambMenu => !prevHambMenu);
    };

    const closeHambMenu = () => {
        setHambMenu(false);
    };

    const currentPage = pathsAndApis.reduce((acc, { path }) => 
        pathname.includes(path) ? path.slice(1, path.length) : acc, ''
    );

    const isSubPage = pathname.includes('item');

    return (
        <header className={themedClass('app-header', dark)}>  
            <Link to='/top' className='home-link'>     
                <div id='logo-wrapper'>
                        <img src={'/Images/hn-logo.png'} alt='hacker-news-custom-logo' />
                        <h1>Hackr News App</h1>
                </div>
            </Link> 
            <Navbar 
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
    );
}