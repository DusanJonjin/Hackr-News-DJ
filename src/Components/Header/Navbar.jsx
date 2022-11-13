import React from 'react'
import { Link } from 'react-router-dom';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Header/Navbar.css';

export function Navbar(props) {

    const {
        navMenu,
        closeNavMenu,
        dark,
        pathname,
        pathsAndApis
    } = props

    return (
        <nav 
            className={`${themedClass('navbar', dark)} ${navMenu ? 'navbar-open' : ''}`}
        >
            <ul>
            {pathsAndApis.map(({ path }, i) => !path.includes('user') &&
                <li 
                    key={i}
                    className={`${themedClass('nav-li', dark)} ${pathname.includes(path) ? 'selected-nav-li' : ''}`} 
                    onClick={() => closeNavMenu()}
                >
                    <Link 
                        to={path}
                        className={themedClass('nav-link', dark)}
                    >
                        {path.slice(1, path.length)}
                    </Link>
                </li>
            )}
            </ul>
        </nav>
    );
}