import React from 'react';

export function StorysDomain({ domain, modern }) {

    const displayDomain = modern ? domain : `(${domain})`;

    return (
        <p className='domain'>
            {displayDomain}
        </p>
    );
}