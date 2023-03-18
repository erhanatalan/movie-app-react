import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MovieCard from "../context/MovieCard";
import { MovieContext } from "../context/MovieContext";
import { toastWarnNotify } from "../helpers/TosatifyNotify";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const Main = () => {
  const {movies, loading, getMovies} = useContext(MovieContext)
  const {currentUser} = useContext(AuthContext)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(currentUser && search){
      getMovies(SEARCH_API + search)
    }else if(!currentUser){
      toastWarnNotify("Please log in to search a movie")
      navigate('/login')
    }else{
      toastWarnNotify('Please enter a text')
    }

  }
  return (
  <>
    <form className="flex justify-center p-2" onSubmit={handleSubmit}> 
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2"
          placeholder="Search a movie..."
          onChange={(e)=> setSearch(e.target.value)}

        />
        <button className="btn-danger-bordered" type="submit">
          Search
        </button>
    </form>
    {loading ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ):
    <div  className="flex justify-center flex-wrap">
      {movies.map((movie)=> <MovieCard key={movie.id} {...movie}/>)}

    </div>}
    
  </>)
};

export default Main;
