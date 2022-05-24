import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Stories/StoriesPaginate.css';

export function StoriesPaginate(props) {

    const {
        pageNum, 
        storiesCount=500, 
        handleMidBtns, 
        midBtns,
        storiesPerPage
    } = props;

    const firstPage = 1;

    const lastPage = Math.ceil(storiesCount / storiesPerPage);

    const firstMidBtn = midBtns[0];

    const lastMidBtn = midBtns[midBtns.length - 1]

    const midBtnsCount = midBtns.length;

    const handleLastPageSelect = () => {
        handleMidBtns(
            Array.from(
                {length: midBtnsCount}, (_, i) => i + (lastPage - midBtnsCount)
            )
        );
    };

    const numToChangeMidBtnsArr = midBtnsCount % 2 === 0 ? midBtnsCount / 2 : (midBtnsCount - 1) / 2;

    const increaseMidBtnsValues = () => {
        if (lastMidBtn === lastPage - 1) return;
        const increasedArrValues = midBtns.map(num => 
            num + numToChangeMidBtnsArr
        );
        handleMidBtns(increasedArrValues);
    };

    const decreaseMidBtnsValues = () => {
        if (firstMidBtn === firstPage + 1) return;
        const decreasedArrValues = midBtns.map(num => 
            num - numToChangeMidBtnsArr
        );
        handleMidBtns(decreasedArrValues);
    };

    const handlePaginateBtnClick = (num, i, arr) => {
        if (num === pageNum) return;
        if (firstMidBtn !== 1) {
            if (i === 0) decreaseMidBtnsValues();
            if (i === arr.length - 1) increaseMidBtnsValues();
        }
    };

    const displayThreeDots = {
        onStart: firstMidBtn !== firstPage + 1,
        onEnd: lastMidBtn !== lastPage - 1
    }

    const showFirstLastPageBtn = firstMidBtn > 1

    return (
        <div className={`pagination`}>
            {showFirstLastPageBtn &&
                <>
                    <Link 
                        to='..'
                        className={`pagin-numbers ${pageNum === firstPage ? 'pagin-num-selected' : ''}`}
                    >
                        {firstPage}
                    </Link>
                    {
                        displayThreeDots.onStart && 
                            <p className='three-dots'>...</p>
                    }
                </>
            }
            <ol className='pagination-ol'>
                {midBtns.map((num, i, arr) =>
                    <Link 
                        to={num === 1 ? '..' : `../page_${num}`}
                        key={num}
                        className={`pagin-numbers ${num === pageNum ? 'pagin-num-selected' : ''}`}
                        onClick={() => handlePaginateBtnClick(num, i, arr)}
                    >
                        {num}
                    </Link>
                )}
            </ol>
            {showFirstLastPageBtn &&
                <>
                    {
                        displayThreeDots.onEnd && 
                            <p className='three-dots'>...</p>
                    }
                    <Link 
                        to={`../page_${lastPage}`}
                        onClick={handleLastPageSelect}
                        className={`pagin-numbers ${pageNum === lastPage ? 'pagin-num-selected' : ''}`}
                    >
                        {lastPage}
                    </Link>
                </>
            }
        </div>
    );
}