import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectModernTheme, selectClassicTheme, toggleDarkTheme } from '../../Store/actions';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Header/ThemesBar.css';

export function ThemesBar({ hambMenu, closeHambMenu, dark, modern }) {

    const dispatch = useDispatch();

    const [firstMount, setFirstMount] = useState(true);

    const [toggleTheme, setToggleTheme] = useState(true);

    const closeMenuAndToggleTheme = () => {
        closeHambMenu();
        setToggleTheme(prevTheme => !prevTheme);
    };

    useEffect(() => {
        if (firstMount) {
            setFirstMount(false);
        } else {
            const newLocalTheme = JSON.stringify({ dark, modern });
            localStorage.setItem('theme', newLocalTheme);
        }
    }, [toggleTheme]);

    return (
        <div className={`${themedClass('theme-selection-wrap', dark)} ${hambMenu ? 'theme-sel-open' : ''}`}>
            <button 
                className={`btn ${!modern ? 'btn-selected' : ""}`}
                onClick={() => {
                    dispatch(selectClassicTheme());
                    closeMenuAndToggleTheme();
                }}
            >
                Classic
            </button>
            <button 
                className={`btn ${modern ? 'btn-selected' : ""}`}
                onClick={() => {
                    dispatch(selectModernTheme());
                    closeMenuAndToggleTheme();
                }}
            >
                Modern
            </button>
            <div 
                className={themedClass('theme-dark-bar', dark)}
                onClick={() => {
                    dispatch(toggleDarkTheme());
                    closeMenuAndToggleTheme();
                }}
            >               
            </div>
        </div>
    )
}