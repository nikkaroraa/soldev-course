import Card from "./card"
import { useEffect, useState } from "react"
import { useConnection } from "@solana/wallet-adapter-react"
import * as web3 from "@solana/web3.js"

import Movie from "models/movie"

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN"

function MovieList() {
  const [movies, setMovies] = useState([])
  const { connection } = useConnection()

  useEffect(() => {
    connection
      .getProgramAccounts(new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID))
      .then(async (accounts) => {
        const movies = accounts.reduce((accum, { account }) => {
          const movie = Movie.deserialize(account.data)
          if (!movie) {
            return accum
          }

          return [...accum, movie]
        }, [])
        setMovies(movies)
      })
  }, [connection])

  return (
    <div>
      {movies.map((movie, i) => (
        <Card key={i} movie={movie} />
      ))}
    </div>
  )
}

export default MovieList
