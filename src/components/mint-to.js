import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Transaction, PublicKey } from "@solana/web3.js"
import { useState } from "react"
import { createMintToInstruction, getAssociatedTokenAddress, getMint } from "@solana/spl-token"
import { Link } from "@chakra-ui/react"

import styles from "styles/Home.module.css"

async function buildMintToTx(mint, recipient, authority, amount) {
  const associatedTokenAccount = await getAssociatedTokenAddress(mint, recipient, false)

  const ix = createMintToInstruction(mint, associatedTokenAccount, authority, amount)

  const tx = new Transaction()
  tx.add(ix)
  return { tx, associatedTokenAccount }
}

function MintToForm() {
  const [txSig, setTxSig] = useState("")
  const [tokenAccount, setTokenAccount] = useState("")

  const [mint, setMint] = useState("")
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")

  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const link = () => {
    return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ""
  }

  const onMintChange = (event) => setMint(event.target.value)
  const onRecipientChange = (event) => setRecipient(event.target.value)
  const onAmountChange = (event) => setAmount(event.target.value)

  const mintTo = async (event) => {
    event.preventDefault()
    if (!connection || !publicKey) {
      return
    }

    const mintAccount = await getMint(connection, new PublicKey(mint))
    const tokenDecimals = mintAccount.decimals

    const { tx, associatedTokenAccount } = await buildMintToTx(
      new PublicKey(mint),
      new PublicKey(recipient),
      publicKey,
      amount * 10 ** tokenDecimals
    )

    const txSignature = await sendTransaction(tx, connection)
    setTokenAccount(associatedTokenAccount.toBase58())
    setTxSig(txSignature)
  }

  return (
    <div>
      <br />
      {publicKey ? (
        <form onSubmit={mintTo} className={styles.form}>
          <label htmlFor="mint">Token Mint:</label>
          <input
            id="mint"
            type="text"
            className={styles.formField}
            placeholder="Enter Token Mint"
            required
            value={mint}
            onChange={onMintChange}
          />
          <label htmlFor="recipient">Recipient:</label>
          <input
            id="recipient"
            type="text"
            className={styles.formField}
            placeholder="Enter Recipient PublicKey"
            required
            value={recipient}
            onChange={onRecipientChange}
          />
          <label htmlFor="amount">Amount Tokens to Mint:</label>
          <input
            id="amount"
            type="text"
            className={styles.formField}
            placeholder="e.g. 100"
            required
            value={amount}
            onChange={onAmountChange}
          />
          <button type="submit" className={styles.formButton}>
            Mint Tokens
          </button>
        </form>
      ) : (
        <span></span>
      )}
      {txSig ? (
        <div>
          <p>Token Account: {tokenAccount} </p>
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

export default MintToForm
