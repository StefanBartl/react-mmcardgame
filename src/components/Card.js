import React from 'react';

export default function Card(props){

    let showNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // Get card number and set it as id
    const id = showNumber[props.cardNo - 1];

    return (
        <div className='cards' id={id} onClick={props.handleClick}>
            <h2>I'm card:</h2>
            <div>{id}</div>
        </div>
    )
};