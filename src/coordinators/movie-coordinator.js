import * as web3 from "@solana/web3.js"
import bs58 from "bs58"

import Movie from "models/movie"
import { MOVIE_REVIEW_PROGRAM_ID } from "constants/programs"

class MovieCoordinator {
  static accounts = []

  static async prefetchAccounts(connection, search) {
    const accounts = await connection.getProgramAccounts(
      new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID),
      {
        dataSlice: { offset: 2, length: 18 }, // title, taking 18 as the length of the string
        filters:
          search === ""
            ? []
            : [{ memcmp: { offset: 6, bytes: bs58.encode(Buffer.from(search)) } }],
      }
    )

    accounts.sort((accountA, accountB) => {
      const titleLengthA = accountA.account.data.readUint32LE(0)
      const titleLengthB = accountB.account.data.readUint32LE(0)

      const titleA = accountA.account.data.slice(4, 4 + titleLengthA) // first 4 bytes is length of the string
      const titleB = accountB.account.data.slice(4, 4 + titleLengthB)
      return titleA.compare(titleB)
    })

    this.accounts = accounts.map((account) => account.pubkey)
  }

  static async fetchPage(connection, page, perPage, search, reload = false) {
    if (this.accounts.length === 0 || reload) {
      await this.prefetchAccounts(connection, search)
    }

    const paginatedPublicKeys = this.accounts.slice((page - 1) * perPage, page * perPage)
    if (paginatedPublicKeys.length === 0) {
      return []
    }

    const accounts = await connection.getMultipleAccountsInfo(paginatedPublicKeys)
    const movies = accounts.reduce((accumulator, account) => {
      const movie = Movie.deserialize(account.data)
      if (!movie) {
        return accumulator
      }

      return [...accumulator, movie]
    }, [])

    return movies
  }
}

export default MovieCoordinator
