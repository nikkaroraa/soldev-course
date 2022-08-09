import Card from "./card"
import { useEffect, useState } from "react"
import Movie from "models/movie"

function MovieList() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    setMovies(Movie.mocks)
  }, [])

  return (
    <div>
      {movies.map((movie, i) => {
        return <Card key={i} movie={movie} />
      })}
    </div>
  )
}

export default MovieList
