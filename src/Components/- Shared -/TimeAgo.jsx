import React from 'react';
import { calculateTimeAgo } from '../../Utilities/helperFunctions';

export function TimeAgo({ time }) {

    const timeAgo = calculateTimeAgo(time);

    return (
        <p>
            {timeAgo}
        </p>
    );
}