import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey, Transaction } from "@solana/web3.js"
import { useState } from "react"
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token"
import { Link } from "@chakra-ui/react"

import styles from "styles/Home.module.css"

async function buildCreateAssociatedTokenAccountTx(payer, owner, mint) {
  const associatedTokenAccount = await getAssociatedTokenAddress(mint, owner, false)

  const ix = createAssociatedTokenAccountInstruction(payer, associatedTokenAccount, owner, mint)
  const tx = new Transaction()
  tx.add(ix)
  return { associatedTokenAccount, tx }
}

function CreateTokenAccountForm() {
  const [txSig, setTxSig] = useState("")
  const [tokenAccount, setTokenAccount] = useState("")
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const [mint, setMint] = useState("")
  const [owner, setOwner] = useState("")
  const link = () => {
    return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ""
  }

  const createTokenAccount = async (event) => {
    event.preventDefault()
    if (!connection || !publicKey) {
      return
    }

    const { tx, associatedTokenAccount } = await buildCreateAssociatedTokenAccountTx(
      publicKey,
      new PublicKey(owner),
      new PublicKey(mint)
    )
    const txSignature = await sendTransaction(tx, connection)

    setTxSig(txSignature)
    setTokenAccount(associatedTokenAccount.toBase58())
  }

  const onMintChange = (event) => {
    setMint(event.target.value)
  }
  const onOwnerChange = (event) => {
    setOwner(event.target.value)
  }

  return (
    <div>
      <br />
      {publicKey ? (
        <form onSubmit={createTokenAccount} className={styles.form}>
          <label htmlFor="owner">Token Mint:</label>
          <input
            id="mint"
            type="text"
            className={styles.formField}
            placeholder="Enter Token Mint"
            required
            value={mint}
            onChange={onMintChange}
          />

          <label htmlFor="owner">Token Account Owner:</label>
          <input
            id="owner"
            type="text"
            className={styles.formField}
            placeholder="Enter Token Account Owner Address"
            required
            value={owner}
            onChange={onOwnerChange}
          />

          <button type="submit" className={styles.formButton}>
            Create Token Account
          </button>
        </form>
      ) : (
        <span></span>
      )}
      {txSig ? (
        <div>
          <p>Token Account Address: {tokenAccount}</p>
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

export default CreateTokenAccountForm
