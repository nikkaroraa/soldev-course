import { Box, Heading, Link, Button, Stack } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import * as Web3 from "@solana/web3.js"
import { useState } from "react"

import Layout from "components/layout"
import Guide from "components/guide"
import WalletProvider from "providers/wallet"

const PROGRAM_ID = new Web3.PublicKey("FUMtj7bWr2a8KWGnLguxmi8FaaWW7EANygGWugsxhodf")

function Page() {
  const { connection } = useConnection()
  const { sendTransaction } = useWallet()

  const [txSig, setTxSig] = useState("")

  const link = () => {
    return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ""
  }

  async function invokeProgram() {
    const tx = new Web3.Transaction()

    const ix = new Web3.TransactionInstruction({
      keys: [],
      programId: PROGRAM_ID,
    })
    tx.add(ix)

    const txSig = await sendTransaction(tx, connection)
    setTxSig(txSig)
  }

  return (
    <Layout>
      <Box my={10}>
        <Heading as="h2" my={5} fontSize="xl"></Heading>
        <Heading as="h2" my={5} fontSize="xl">
          {`Module 3: 01 - Interacting with "Hello World" program`}
        </Heading>

        <Stack spacing={4} mt={4} align="flex-start">
          <Button onClick={invokeProgram}>Invoke program</Button>
          {txSig ? (
            <div>
              <p>
                View your transaction on{" "}
                <Link href={link()} textDecoration="underline" isExternal>
                  Solana Explorer
                </Link>
              </p>
            </div>
          ) : null}
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
