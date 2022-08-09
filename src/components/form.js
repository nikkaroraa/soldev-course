import Movie from "models/movie"
import { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react"

// const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN"

function Form() {
  const [title, setTitle] = useState("")
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    const movie = new Movie(title, rating, message)
    handleTransactionSubmit(movie)
  }

  const handleTransactionSubmit = async (movie) => {
    console.log(JSON.stringify(movie))
  }

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
      justifyContent="center"
    >
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel color="black.200">Movie Title</FormLabel>
          <Input
            id="title"
            color="black.400"
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="black.200">Add your review</FormLabel>
          <Textarea
            id="review"
            color="black.400"
            onChange={(event) => setMessage(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="black.200">Rating</FormLabel>
          <NumberInput
            max={5}
            min={1}
            onChange={(valueString) => setRating(parseInt(valueString))}
          >
            <NumberInputField id="amount" color="black.400" />
            <NumberInputStepper color="black.400">
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Button width="full" mt={4} type="submit">
          Submit Review
        </Button>
      </form>
    </Box>
  )
}

export default Form
