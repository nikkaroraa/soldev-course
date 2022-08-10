import { Box, Heading, Stack } from "@chakra-ui/react"

import Layout from "components/layout"
import Guide from "components/guide"
import MovieList from "components/movie-list"
import Form from "components/form"
import WalletProvider from "providers/wallet"

function Page() {
  return (
    <Layout>
      <Box my={10}>
        <Heading as="h2" fontSize="xl">
          Module 1: 04 - Serialize Custom Instruction Data
        </Heading>
      </Box>

      <Stack isInline mb={20}>
        <Box flex="1">
          <Heading as="h1" size="l" color="black" ml={4} mt={8}>
            Add a review
          </Heading>
          <Form />
        </Box>

        <Box flex="1">
          <Heading as="h1" size="l" color="black" ml={4} mt={8}>
            Existing Reviews
          </Heading>
          <MovieList />
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
