import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json.results);

    return json.results;
  };

  const handleGptSearchClick = async () => {
    // console.log(searchText.current.value)

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query:" +
      searchText.current.value +
      ".pleasae give names of 5-15 movies,comma seperated like the example result given,Example Result:Sholay,Robot,Golmaal,Spiderman and so on.";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      console.log("Please try different Prompt");
    }

    // console.log(gptResults.choices?.[0]?.message?.content );

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    // console.log(gptMovies);

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    //will reteurn array of promises [promise,promise,promise....for each movies]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[12%] flex justify-center">
      <form
        className="bg-gradient-to-l from-red-600 w-1/2 p-8 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" border border-solid  col-span-9 rounded-md px-2 py-4 "
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className=" col-span-3 mx-2 hover:scale-95 bg-green-200 text-black font-bold rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].Search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
