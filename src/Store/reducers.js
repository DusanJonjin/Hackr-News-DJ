import { combineReducers } from 'redux';

const themeReducer = (state={dark: false, modern: false}, action) => {
    switch (action.type) {
        case 'TOGGLE_DARK_THEME': 
            const changedDarkTheme = {...state, dark: !state.dark};
            return changedDarkTheme;
        case 'SELECT_MODERN_THEME': 
            const modernThemeSelected = {...state, modern: true};
            return modernThemeSelected;
        case 'SELECT_CLASSIC_THEME':
            const classicThemeSelected = {...state, modern: false};
            return classicThemeSelected;
        default: return state;
    }
}

const scrolledCommentIDReducer = (state=0, action) => {
    switch (action.type) {
        case 'GET_SCROLLED_COMMENT_ID': 
            const id = action.payload;
            return id;
        default: return state;
    }
}

const commentsReducer = (state=[], action) => {
    switch (action.type) {
        case 'GET_COMMENT':
            const comment = action.payload;
            const insertComment = comment.item ? [...state, comment] : state;
            return insertComment;
        case 'CLEAR_COMMENTS': 
            const clearAllComments = [];
            return clearAllComments;
        case 'GET_REPLIES_COUNT':
            const commentID = action.payload;
            const calcRepliesCount = (commentID, accum) => {
                const count = state.reduce((acc, comment) => 
                    comment.item.parent === commentID ? calcRepliesCount(comment.item.id, acc + 1) : acc
                , accum);
                return count;
            }
            const repliesCount = calcRepliesCount(commentID, 1);
            const addRepliesCount = state.map(comment =>
                comment.item.id === commentID ? {...comment, repliesCount} : comment
            );
            return addRepliesCount;
        default: return state;
    }
}

const collapsedCommentsReducer = (state=[], action) => {
    switch (action.type) {
        case 'COLLAPSE_EXPAND_COMMENT': 
            const commentID = action.payload;
            const addRemoveCollapsed = commentID => {
                if (!state.includes(commentID)) {
                    const addCollapsed = [...state, commentID];
                    return addCollapsed; 
                }
                else {
                    const removeCollapsed = state.filter(id => id !== commentID);
                    return removeCollapsed;            
                }
            }
            return addRemoveCollapsed(commentID);
        case 'CLEAR_COLLAPSED_COMMENTS':
            const clearAllCollapsed = [];
            return clearAllCollapsed;
        default: return state;
    }
}

const searchValueReducer = (state='', action) => {
    switch (action.type) {
        case 'SET_SEARCH_VALUE':
            const newState = action.payload;
            return newState;
        case 'CLEAR_SEARCH_VALUE':
            const clearState = '';
            return clearState;
        default: return state;
    }
}

export const reducers = combineReducers(
    {
        theme: themeReducer,
        scrolledCommentID: scrolledCommentIDReducer,
        comments: commentsReducer,
        collapsedComments: collapsedCommentsReducer,
        searchValue: searchValueReducer
    }
);