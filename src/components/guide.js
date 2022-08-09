import { UnorderedList, ListItem, Box, Stack, Heading } from "@chakra-ui/react"
import Link from "next/link"

function CustomListItem({ href, ...props }) {
  return (
    <ListItem ml={8}>
      <Link href={href} {...props} />
    </ListItem>
  )
}

function Guide() {
  return (
    <Box border="1px" borderColor="#ccc" p={3}>
      <Heading as="h2" mb={8} fontSize="lg">
        Guide
      </Heading>

      <Stack>
        <Heading as="h3" fontSize={"md"}>
          Module 1
        </Heading>
        <UnorderedList>
          <CustomListItem href={"/1"}>01 - Read data from the Solana network</CustomListItem>
          <CustomListItem href={"/2"}>02 - Write data to the Solana network</CustomListItem>
          <CustomListItem href={"/3"}>03 - Interact with Wallets</CustomListItem>
          <CustomListItem href={"/4"}>04 - Serialize Custom Instruction Data</CustomListItem>
        </UnorderedList>
      </Stack>
    </Box>
  )
}

export default Guide
