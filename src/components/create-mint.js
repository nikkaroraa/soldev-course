import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import * as web3 from "@solana/web3.js"
import { useState } from "react"
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  createInitializeMintInstruction,
} from "@solana/spl-token"
import { Link } from "@chakra-ui/react"

import styles from "styles/Home.module.css"

async function buildCreateMintTx(connection, payer, decimals) {
  const lamports = await getMinimumBalanceForRentExemptMint(connection)
  const accountKeypair = web3.Keypair.generate()
  const programId = TOKEN_PROGRAM_ID

  const createAccountIx = web3.SystemProgram.createAccount({
    fromPubkey: payer,
    newAccountPubkey: accountKeypair.publicKey,
    space: MINT_SIZE,
    lamports,
    programId,
  })
  const initializeMintAccountIx = createInitializeMintInstruction(
    accountKeypair.publicKey,
    decimals,
    payer,
    payer,
    programId
  )

  const tx = new web3.Transaction()
  tx.add(createAccountIx, initializeMintAccountIx)
  return { accountKeypair, tx }
}

function CreateMint() {
  const [txSig, setTxSig] = useState("")
  const [mint, setMint] = useState("")

  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const link = () => {
    return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ""
  }

  const createMint = async (event) => {
    event.preventDefault()
    if (!connection || !publicKey) {
      return
    }

    const { accountKeypair, tx } = await buildCreateMintTx(connection, publicKey, 6)

    const mintTxSignature = await sendTransaction(tx, connection, {
      signers: [accountKeypair],
    })
    setTxSig(mintTxSignature)
    setMint(accountKeypair.publicKey.toBase58())
  }

  return (
    <div>
      {publicKey ? (
        <form onSubmit={createMint} className={styles.form}>
          <button type="submit" className={styles.formButton}>
            Create Mint
          </button>
        </form>
      ) : (
        <span>Connect Your Wallet</span>
      )}
      {txSig ? (
        <div>
          <p>Token Mint Address: {mint}</p>
          <p>
            View your transaction on{" "}
            <Link href={link()} textDecoration="underline" isExternal>
              Solana Explorer
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default CreateMint
