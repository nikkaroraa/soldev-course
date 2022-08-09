import { Text, Input, Button, Box, Heading } from "@chakra-ui/react"
import { useState } from "react"
import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

import Layout from "components/layout"
import Guide from "components/guide"

async function getSolBalance(address) {
  const connection = new Connection(clusterApiUrl("devnet"))
  const publicKey = new PublicKey(address)
  const balance = await connection.getBalance(publicKey)
  return balance
}

function Page() {
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState(0)

  const onAddressChange = (event) => setAddress(event.target.value)

  const getBalance = async () => {
    const balance = await getSolBalance(address)
    setBalance(balance)
  }

  return (
    <Layout>
      <Box my={10}>
        <Heading as="h2" my={5} fontSize="xl">
          01 - Read balance from the Solana network
        </Heading>

        <Input placeholder="input address" value={address} onChange={onAddressChange} />
        <Button onClick={getBalance}>Get balance</Button>

        <Text>balance: {balance / LAMPORTS_PER_SOL}</Text>
      </Box>

      <Guide />
    </Layout>
  )
}

export default Page
