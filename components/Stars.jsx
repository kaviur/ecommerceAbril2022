import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Stars = ({ rating }) => {
    const [stars, setStars] = useState([]);

    useEffect(()=>{
        let arrayStar = []
        for(let i = 1; i <= 5; i++ ){
            i <= rating 
            ? arrayStar.push(<FaStar key={i} fill='#F1C40F' size={20} />)
            : arrayStar.push(<FaStar key={i} size={20} color='#E5E7E9' />) 
        }
        setStars(arrayStar);
    },[rating]);

    return (
        <div>
            {stars}
        </div>
    )
};

export default Stars;