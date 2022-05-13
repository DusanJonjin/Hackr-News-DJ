import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Comments/CommentsPaginate.css';

export function CommentsPaginate({ pageNum }) {

    return (
        <section className='comments-paginate'>
            {pageNum > 1 &&
                <Link to={pageNum === 2 ? `/comments` : `/comments/page_${pageNum - 1}`}>
                    <p>Previous</p>
                </Link>
            }
            <Link to={`/comments/page_${pageNum + 1}`}>
                <p>More</p>
            </Link>
        </section>
    );
}