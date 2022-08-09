import { Text, Button, Box, Heading } from "@chakra-ui/react"
import Link from "next/link"
import { useState } from "react"
import * as web3 from "@solana/web3.js"

import Layout from "components/layout"
import Guide from "components/guide"

async function initializeKeypair() {
  const keypair = await web3.Keypair.generate()
  console.log("generated keypair with address:", keypair.publicKey.toBase58())
  return keypair
}

async function fundAccount(connection, payer) {
  console.log("funding payer...")
  const signature = await connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL * 1)
  await connection.confirmTransaction(signature)

  console.log("payer funded")
}

const PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
const PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"

async function pingProgram(connection, payer) {
  const transaction = new web3.Transaction()

  const programId = new web3.PublicKey(PROGRAM_ADDRESS)
  const programDataPubkey = new web3.PublicKey(PROGRAM_DATA_ADDRESS)

  const instruction = new web3.TransactionInstruction({
    keys: [{ pubkey: programDataPubkey, isSigner: false, isWritable: true }],
    programId,
  })

  transaction.add(instruction)

  const signature = await web3.sendAndConfirmTransaction(connection, transaction, [payer])
  console.log("tx signature:", signature)
  return signature
}

function Page() {
  const [txSignature, setTxSignature] = useState("")
  const [error, setError] = useState("")

  async function createAndSendTransaction() {
    try {
      const payer = await initializeKeypair()
      const connection = new web3.Connection(web3.clusterApiUrl("devnet"))

      await fundAccount(connection, payer)
      const signature = await pingProgram(connection, payer)
      setTxSignature(signature)
    } catch (e) {
      console.error(e)
      setError(e.message)
    }
  }

  return (
    <Layout>
      <Box my={10}>
        <Heading as="h2" my={5} fontSize="xl">
          02 - Create and send transaction to the network
        </Heading>
        <Button onClick={createAndSendTransaction}>send transaction</Button>
        {txSignature && <Text>txSignature: {txSignature}</Text>}
        {error && <Text>error: {error}</Text>}
      </Box>

      <Guide />
    </Layout>
  )
}

export default Page
