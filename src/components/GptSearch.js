import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';

const GptSearch = () => {
  return (
    <div>
         <img
          className="fixed aspect-video -z-10 w-full"
          src="https://static.vecteezy.com/system/resources/previews/022/454/669/large_2x/3d-rendering-of-a-little-robot-reading-a-book-in-a-dark-room-generative-ai-free-photo.jpg"
          alt="logo"
        />
        <GptSearchBar/>
        <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch;