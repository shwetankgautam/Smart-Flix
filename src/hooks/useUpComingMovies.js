import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { addUpComingMovies } from "../utils/moviesSlice";

const useUpComingMovies = () =>{
    const upcomingMovies = useSelector((store)=>store.movies.upcomingMovies);
    const dispatch = useDispatch();
    const getUpComingMovies = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/upcoming?page=1",API_OPTIONS);
        const json = await data.json();
        // console.log(json);

        dispatch(addUpComingMovies(json.results));

    }

    useEffect(()=>{
        !upcomingMovies &&
        getUpComingMovies();
    },[])

}

export default useUpComingMovies;