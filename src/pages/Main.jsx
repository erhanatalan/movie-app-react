import { useContext } from "react";
import MovieCard from "../context/MovieCard";
import { MovieContext } from "../context/MovieContext";


const Main = () => {
  const {movies} = useContext(MovieContext)
  return <div>
    <div  className="flex justify-center flex-wrap">
      {movies.map((movie)=> <MovieCard key={movie.id} {...movie}/>)}

    </div>
    
  </div>;
};

export default Main;
