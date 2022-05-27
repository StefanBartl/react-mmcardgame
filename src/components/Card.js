import React, { useEffect } from 'react';

export default function Card(props){

    let showNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // Get card number and set it as id
    const id = showNumber[props.cardNo - 1];


//#region unsplash.com API to get random images
 const [ allImages, setAllImagess ] = React.useState([]); 

async function fetchData() {
  const res = await fetch("https://api.unsplash.com/photos/?client_id=yFMXUTNpe9ZjDVqNOSQJxC4WiW_hJFdNEviXNlu_Vso")
  const data = await res.json()
  setAllImagess(data);
};

React.useEffect(() => {
  fetchData();
}, []); 

let url = "";  allImages.length !== 0  ? url = allImages[id - 1].urls.regular : url = "";

//#endregion

    
    return (
        <div className='cards'  >
            <img 
            src={url} className="cards-images" id={id} onClick={props.handleClick} alt='Random image, which player have to remember to play the game.'
            />
        </div>
    )
};