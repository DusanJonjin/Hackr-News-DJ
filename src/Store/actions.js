// THEMES
export const toggleDarkTheme = () => {
    return {
        type: 'TOGGLE_DARK_THEME'
    }
}

export const selectModernTheme = () => {
    return {
        type: 'SELECT_MODERN_THEME'
    }
}

export const selectClassicTheme = () => {
    return {
        type: 'SELECT_CLASSIC_THEME'
    }
}

// COMMENTS
export const getComment = comment => {
    return {
        type: 'GET_COMMENT',
        payload: comment
    }
}

export const clearComments = () => {
    return {
        type: 'CLEAR_COMMENTS'
    }
}

export const getRepliesCount = commentID => {
    return {
        type: 'GET_REPLIES_COUNT',
        payload: commentID
    }
}

// COLLAPSED COMMENTS
export const collapseExpandComment = commentID => {
    return {
        type: 'COLLAPSE_EXPAND_COMMENT',
        payload: commentID
    }
}

export const clearCollapsedComments = () => {
    return {
        type: 'CLEAR_COLLAPSED_COMMENTS'
    }
}

// SEARCH VALUE
export const setSearchValue = searchSymbol => {
    return {
        type: 'SET_SEARCH_VALUE',
        payload: searchSymbol
    }
}

export const clearSearchValue = searchSymbol => {
    return {
        type: 'CLEAR_SEARCH_VALUE',
        payload: searchSymbol
    }
}