import { Box, Heading, Link } from "@chakra-ui/react"

import Layout from "components/layout"
import Guide from "components/guide"

function Page() {
  return (
    <Layout>
      <Box my={10}>
        <Heading as="h2" my={5} fontSize="xl"></Heading>
        <Heading as="h2" my={5} fontSize="xl">
          Module 2: 02 - Swap Tokens with the Token Swap Program
        </Heading>

        <Link
          href="https://token-swap-ui.vercel.app/"
          isExternal={true}
          textDecoration="underline"
          fontSize="lg"
        >
          Link to the Solana Dapp
        </Link>
      </Box>

      <Guide />
    </Layout>
  )
}

export default Page
