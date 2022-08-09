import { UnorderedList, ListItem, Box, Text } from "@chakra-ui/react"
import Link from "next/link"

function CustomListItem({ href, ...props }) {
  return (
    <ListItem>
      <Link href={href} {...props} />
    </ListItem>
  )
}

function Guide() {
  return (
    <Box border="1px" borderColor="#ccc" p={3}>
      <Text mb={4} fontSize="lg">
        Guide
      </Text>
      <UnorderedList>
        <CustomListItem href={"/1"}>01 - Read data from the Solana network</CustomListItem>
        <CustomListItem href={"/2"}>02 - Write data to the Solana network</CustomListItem>
        <CustomListItem href={"/3"}>03 - Interact with Wallets</CustomListItem>
      </UnorderedList>
    </Box>
  )
}

export default Guide
