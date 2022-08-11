import { Box, Heading, Divider } from "@chakra-ui/react"

import BalanceDisplay from "components/balance-display"
import CreateMint from "components/create-mint"
import CreateTokenAccountForm from "components/create-token-account"
import MintToForm from "components/mint-to"
import Layout from "components/layout"
import Guide from "components/guide"
import WalletProvider from "providers/wallet"
import AppBar from "components/app-bar"
import styles from "styles/Home.module.css"

function Page() {
  return (
    <Layout>
      <Box my={10}>
        <Heading as="h2" my={5} fontSize="xl"></Heading>
        <Heading as="h2" my={5} fontSize="xl">
          Module 2: 01 - Create Tokens with the Token Program
        </Heading>

        <AppBar />
        <div className={styles.AppBody}>
          <BalanceDisplay />
          <Divider borderBottomColor={"white"} my={7} />
          <CreateMint />
          <Divider borderBottomColor={"white"} my={7} />
          <CreateTokenAccountForm />
          <Divider borderBottomColor={"white"} my={7} />
          <MintToForm />
        </div>
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
