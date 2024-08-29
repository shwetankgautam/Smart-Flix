import React from 'react'
import {IMG_CDN_URL} from "../utils/constants";

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='w-48 pr-6 hover:scale-110'>
      <img className=' rounded-xl' src={IMG_CDN_URL + posterPath} alt="movieIMG" />
    </div>
  )
}

export default MovieCard;