import { Box, Heading, Stack } from "@chakra-ui/react"
import { PublicKey } from "@solana/web3.js"

import Layout from "components/layout"
import Guide from "components/guide"
import WalletProvider from "providers/wallet"
import Form from "components/form"
import MovieList from "components/movie-list"
import { CUSTOM_MOVIE_REVIEW_PROGRAM_ID } from "constants/programs"

const programId = new PublicKey(CUSTOM_MOVIE_REVIEW_PROGRAM_ID)

function Page() {
  return (
    <Layout>
      <Box my={10}>
        <Heading as="h2" my={5} fontSize="xl"></Heading>
        <Heading as="h2" my={5} fontSize="xl">
          {`Module 3: 03 - State Management`}
        </Heading>

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
      </Box>

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
