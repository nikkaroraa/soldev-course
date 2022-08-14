import { Box, Heading, Text } from "@chakra-ui/react"

import Layout from "components/layout"
import Guide from "components/guide"

function Page() {
  return (
    <Layout>
      <Box my={10}>
        <Heading as="h2" my={5} fontSize="xl"></Heading>
        <Heading as="h2" my={5} fontSize="xl">
          Module 2: 03 - Create Solana NFTs with Metaplex
        </Heading>

        <Text>
          {
            "Didn't implement this as I've already been working with NFTs on Solana for the past 1 year. So this was nothing new."
          }
        </Text>
      </Box>

      <Guide />
    </Layout>
  )
}

export default Page
