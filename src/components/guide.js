import { UnorderedList, ListItem, Box, Stack, Heading } from "@chakra-ui/react"
import Link from "next/link"

function CustomListItem({ href, ...props }) {
  return (
    <ListItem ml={6}>
      <Link href={href} {...props} />
    </ListItem>
  )
}

function Guide() {
  return (
    <Box border="1px" borderColor="#ccc" p={5}>
      <Heading as="h2" mb={8} fontSize="2xl">
        Guide
      </Heading>

      <Stack spacing={10}>
        <Stack>
          <Heading as="h3" fontSize={"md"}>
            Module 1: Client Interaction with the Solana Network
          </Heading>
          <UnorderedList ml={2}>
            <CustomListItem href={"/1/1"}>01 - Read data from the Solana network</CustomListItem>
            <CustomListItem href={"/1/2"}>02 - Write data to the Solana network</CustomListItem>
            <CustomListItem href={"/1/3"}>03 - Interact with Wallets</CustomListItem>
            <CustomListItem href={"/1/4"}>04 - Serialize Custom Instruction Data</CustomListItem>
            <CustomListItem href={"/1/5"}>05 - Deserialize Custom Account Data</CustomListItem>
            <CustomListItem href={"/1/6"}>
              06 - Page, Order and Filter Custom Account Data
            </CustomListItem>
          </UnorderedList>
        </Stack>
        <Stack>
          <Heading as="h3" fontSize={"md"}>
            Module 2: Client Interaction with common Solana Programs
          </Heading>
          <UnorderedList ml={2}>
            <CustomListItem href={"/2/1"}>
              01 - Create tokens with the Token program
            </CustomListItem>
            <CustomListItem href={"/2/2"}>
              02 - Swap Tokens with the Token Swap Program
            </CustomListItem>
            <CustomListItem href={"/2/3"}>03 - Create Solana NFTs with Metaplex</CustomListItem>
          </UnorderedList>
        </Stack>
        <Stack>
          <Heading as="h3" fontSize={"md"}>
            Module 3: Basic Solana Program Development
          </Heading>
          <UnorderedList ml={2}>
            <CustomListItem href={"/3/1"}>01 - Hello World</CustomListItem>
          </UnorderedList>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Guide
