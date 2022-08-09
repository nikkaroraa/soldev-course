import Head from "next/head"
import { UnorderedList, ListItem } from "@chakra-ui/react"
import Link from "next/link"

import Guide from "components/guide"
import Layout from "components/layout"

export default function Home() {
  return (
    <Layout>
      <Guide />
    </Layout>
  )
}
