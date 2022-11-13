import React from 'react';

export function User({ user, byWord='' }) {

    return (
        <p className='user'>
           {byWord} <span>{user}</span>
        </p>
    );
}