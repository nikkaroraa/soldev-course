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
import * as web3 from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"

function Form({ programId }) {
  const [title, setTitle] = useState("")
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState("")

  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const handleSubmit = (event) => {
    event.preventDefault()
    const movie = new Movie(title, rating, message)
    handleTransactionSubmit(movie)
  }

  const handleTransactionSubmit = async (movie) => {
    if (!publicKey) {
      alert("Please connect your wallet")
      return
    }

    const buffer = movie.serialize()
    const transaction = new web3.Transaction()

    const instruction = new web3.TransactionInstruction({
      keys: [],
      data: buffer,
      programId,
    })

    transaction.add(instruction)

    try {
      let txSignature = await sendTransaction(transaction, connection)
      console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${txSignature}?cluster=devnet`
      )
    } catch (e) {
      alert(JSON.stringify(e))
    }
  }

  return (
    <Box p={4} maxWidth="32rem" borderWidth={1} margin={2} justifyContent="center">
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
