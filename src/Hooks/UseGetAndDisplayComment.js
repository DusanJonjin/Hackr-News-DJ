import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getItem } from '../API/ApiCalls';
import { getComment } from '../Store/actions';

export function useGetAndDisplayComment(dispatch, commentID) {

    const { dark, modern } = useSelector(state => state.theme);

    const commentToDisplay = useSelector(state => state.comments.find(comment => comment.item.id === commentID));

    const parentId = commentToDisplay?.item.parent;

    const isScrolledComment = useSelector(state => state.scrolledCommentID === commentID);

    const parent = useSelector(state => state.comments.find(comment => comment.item.id === parentId));

    const parentUser = parent?.item.type === 'story' ? '': `<span class='reply-to'><@${parent?.item.by}></span>`;

    const searchValue = useSelector(state => state.searchValue);

    const commentIsExpanded = useSelector(state => !state.collapsedComments.includes(commentID));

    const abortController = new AbortController();

    const abortSignal = abortController.signal;

    useEffect(() => {
        !commentToDisplay && getItem(commentID, abortSignal).then(res => dispatch(getComment(res)));
        return () => abortController.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentID]);

  return { 
      dark, 
      modern, 
      commentToDisplay,
      isScrolledComment,
      parentUser,
      searchValue,
      commentIsExpanded, 
    }
}
