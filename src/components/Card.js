import React from 'react';

export default function Card(props){

    let showNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className='cards'>
            <h2>I'm card:</h2>
            <div>{showNumber[props.cardNo - 1]}</div>
        </div>
    )
};