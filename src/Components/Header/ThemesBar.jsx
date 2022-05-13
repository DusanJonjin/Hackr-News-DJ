import React from 'react';
import { useDispatch } from 'react-redux';
import { selectModernTheme, selectClassicTheme, toggleDarkTheme } from '../../Store/actions';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Header/ThemesBar.css';

export function ThemesBar({ hambMenu, closeHambMenu, dark, modern }) {

    const dispatch = useDispatch();

    return (
        <div className={`${themedClass('theme-selection-wrap', dark)} ${hambMenu ? 'theme-sel-open' : ''}`}>
            <button 
                className={`btn ${!modern && 'btn-selected'}`}
                onClick={() => (dispatch(selectClassicTheme(), closeHambMenu()))}
            >
                Classic
            </button>
            <button 
                className={`btn ${modern && 'btn-selected'}`}
                onClick={() => (dispatch(selectModernTheme()), closeHambMenu())}
            >
                Modern
            </button>
            <div 
                className={themedClass('theme-dark-bar', dark)}
                onClick={() => (dispatch(toggleDarkTheme()), closeHambMenu())}
            >               
            </div>
        </div>
    )
}