import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";
import React from "react";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();
  useTrendingMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
          <Footer/>
        </>
      )}
    </div>
  );
};

export default Browse;
