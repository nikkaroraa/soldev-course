import { useEffect, useState } from "react"
import { useConnection } from "@solana/wallet-adapter-react"
import { Center, HStack, Button, Spacer, Input } from "@chakra-ui/react"

import MovieCoordinator from "coordinators/movie-coordinator"
import Card from "./card"

const PAGE_SIZE = 5

function MovieList() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const { connection } = useConnection()

  useEffect(() => {
    MovieCoordinator.fetchPage(connection, page, PAGE_SIZE, search, search !== "").then((movies) =>
      setMovies(movies)
    )
  }, [connection, page, search])

  return (
    <div>
      <Center>
        <Input
          id="search"
          color="black.400"
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search"
          w="97%"
          mt={2}
          mb={2}
        />
      </Center>
      {movies.map((movie, i) => (
        <Card key={i} movie={movie} />
      ))}

      <Center>
        <HStack w="full" mt={2} mb={8} ml={4} mr={4}>
          <Button isDisabled={page <= 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <Spacer />
          <Button
            isDisabled={MovieCoordinator.accounts.length <= page * 2}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </HStack>
      </Center>
    </div>
  )
}

export default MovieList
