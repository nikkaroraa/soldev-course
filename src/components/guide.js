import { UnorderedList, ListItem } from "@chakra-ui/react"
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
    <UnorderedList>
      <CustomListItem href={"/1"}>01 - Read data from the Solana network</CustomListItem>
      <CustomListItem href={"/2"}>02 - Write data to the Solana network</CustomListItem>
    </UnorderedList>
  )
}

export default Guide
