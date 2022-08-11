import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Image from "next/image"
import { Flex } from "@chakra-ui/react"

function AppBar() {
  return (
    <Flex
      height="90px"
      bgColor="black"
      flexDirection={"row"}
      align="center"
      justify={"space-between"}
      fontSize="50px"
      color="white"
      wrap={"wrap"}
      px="20px"
    >
      <Image alt="solana" src="/images/solana.png" height={30} width={200} />
      <span>Token Program</span>
      <WalletMultiButton />
    </Flex>
  )
}

export default AppBar
