import { Box, Heading, Stack } from "@chakra-ui/react"
import { PublicKey } from "@solana/web3.js"

import Layout from "components/layout"
import Guide from "components/guide"
import MovieList from "components/movie-list"
import Form from "components/form"
import WalletProvider from "providers/wallet"
import { MOVIE_REVIEW_PROGRAM_ID } from "constants/programs"

const programId = new PublicKey(MOVIE_REVIEW_PROGRAM_ID)

function Page() {
  return (
    <Layout>
      <Box my={10}>
        <Heading as="h2" fontSize="xl">
          Module 1: 05 - Deserialize Custom Account Data
        </Heading>
      </Box>

      <Stack isInline mb={20}>
        <Box flex="1">
          <Heading as="h1" size="l" color="black" ml={4} mt={8}>
            Add a review
          </Heading>
          <Form programId={programId} />
        </Box>

        <Box flex="1">
          <Heading as="h1" size="l" color="black" ml={4} mt={8}>
            Existing Reviews
          </Heading>
          <MovieList programId={programId} />
        </Box>
      </Stack>

      <Guide />
    </Layout>
  )
}

function PageWithProvider() {
  return (
    <WalletProvider>
      <Page />
    </WalletProvider>
  )
}

export default PageWithProvider
