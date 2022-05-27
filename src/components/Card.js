import React from 'react';
import { createApi } from 'unsplash-js';

export default function Card(props){

    let showNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // Get card number and set it as id
    const id = showNumber[props.cardNo - 1];


//#region unsplash.com API to get random images
// MAN: https://github.com/unsplash/unsplash-js#usage

const unsplash = createApi({
  accessKey: 'yFMXUTNpe9ZjDVqNOSQJxC4WiW_hJFdNEviXNlu_Vso',
  //...other fetch options
//   headers: { 'X-Custom-Header': 'foo' },
});

unsplash.photos.getRandom({
    collectionIds: ['abc123'],
    topicIds: ['def456'],
    featured: true,
    username: 'naoufal',
    query: 'dog',
    count: 1,
  });

//#endregion

    
    return (
        <div className='cards'  >
            <img src={props.url} className="cards-images" id={id} onClick={props.handleClick} />
        </div>
    )
};