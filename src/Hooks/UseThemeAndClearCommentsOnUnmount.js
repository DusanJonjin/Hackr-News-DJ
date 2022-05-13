import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearComments, clearCollapsedComments, clearSearchValue } from "../Store/actions";

export function useThemeAndClearCommentsOnUnmount () {

    const dispatch = useDispatch();

    const { dark, modern } = useSelector(state => state.theme);

    useEffect(() => {
        return () => {
            dispatch(clearComments());
            dispatch(clearCollapsedComments());
            dispatch(clearSearchValue());
        }
    }, [])

    return (
        {dark, modern}
    );
} 