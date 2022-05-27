import React from 'react';

export default function Card(props){

    let showNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // Get card number and set it as id
    const id = showNumber[props.cardNo - 1];

    return (
        <div className='cards'  >
            <img src={props.url} className="cards-images" id={id} onClick={props.handleClick} />
        </div>
    )
};