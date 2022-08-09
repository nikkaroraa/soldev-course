import { Text, Box, Heading, Stack, Input, Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { LAMPORTS_PER_SOL, Transaction, SystemProgram, PublicKey } from "@solana/web3.js"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"

import Layout from "components/layout"
import Guide from "components/guide"
import WalletProvider from "providers/wallet"

function AccountBalance() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if (!connection || !publicKey) {
      return
    }

    connection.getAccountInfo(publicKey).then((info) => setBalance(info.lamports))
  }, [connection, publicKey])

  if (!connection || !publicKey) {
    return null
  }

  return (
    <Stack>
      <Heading as="h3" fontSize="md">
        Fetch Balance
      </Heading>
      <Text>Balance: {balance / LAMPORTS_PER_SOL} SOL</Text>
    </Stack>
  )
}

function TransferSol() {
  const [solAmount, setSolAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [error, setError] = useState("")

  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  function onAmountChange(event) {
    setSolAmount(event.target.value)
  }
  function onAddressChange(event) {
    setRecipient(event.target.value)
  }

  async function transferSol() {
    setError("")

    if (solAmount <= 0 || !recipient) {
      setError("SOL amount or Recipient address not found")
      return
    }

    const tx = new Transaction()

    const recipientPubkey = new PublicKey(recipient)
    const sendSolIx = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubkey,
      lamports: LAMPORTS_PER_SOL * solAmount,
    })
    tx.add(sendSolIx)

    try {
      const signature = await sendTransaction(tx, connection)
      console.log("tx signature:", signature)
      return signature
    } catch (e) {
      console.error(e)
      setError(e.message)
    }
  }

  return (
    <Stack>
      <Heading as="h3" fontSize="md">
        Transfer SOL
      </Heading>
      <Stack align={"flex-start"}>
        <Input
          type="number"
          placeholder="SOL amount to send"
          value={solAmount}
          onChange={onAmountChange}
        />
        <Input
          type="text"
          placeholder="Recipient address"
          value={recipient}
          onChange={onAddressChange}
        />
        <Button onClick={transferSol}>Transfer SOL</Button>
        {error && <Text>{error}</Text>}
      </Stack>
    </Stack>
  )
}

function Page() {
  return (
    <Layout>
      <Box my={10}>
        <Heading as="h2" my={5} fontSize="xl">
          03 - Interact with Wallet
        </Heading>

        <Stack spacing={6}>
          <WalletMultiButton />
          <AccountBalance />
          <TransferSol />
        </Stack>
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
