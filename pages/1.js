import { Text, Input, Button } from "@chakra-ui/react"
import { useState } from "react"
import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

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
    <>
      <Text>01 - Read balance from the Solana network</Text>

      <Input placeholder="input address" value={address} onChange={onAddressChange} />
      <Button onClick={getBalance}>Get balance</Button>

      <Text>balance: {balance / LAMPORTS_PER_SOL}</Text>
    </>
  )
}

export default Page
