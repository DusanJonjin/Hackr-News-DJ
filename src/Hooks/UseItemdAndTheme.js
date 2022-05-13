import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export function useItemIdAndTheme () {

    const { pathname } = useLocation();

    const itemId = pathname?.slice(pathname.indexOf('=') + 1);

    const theme = useSelector(state => state.theme);

    return { itemId, theme }
}