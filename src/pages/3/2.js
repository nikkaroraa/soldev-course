import { Box, Heading } from "@chakra-ui/react"
import Layout from "components/layout"
import Guide from "components/guide"
import WalletProvider from "providers/wallet"
import MovieReviewForm from "components/movie-review-form"

function Page() {
  return (
    <Layout>
      <Box my={10}>
        <Heading as="h2" my={5} fontSize="xl"></Heading>
        <Heading as="h2" my={5} fontSize="xl">
          {`Module 3: 02 - Handle Instruction Data`}
        </Heading>

        <Box flex="1">
          <Heading as="h1" size="l" color="black" ml={4} mt={8}>
            Add a review
          </Heading>
          <MovieReviewForm />
        </Box>
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
