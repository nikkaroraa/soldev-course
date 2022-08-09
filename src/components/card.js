import { Box, HStack, Spacer, Stack, Text } from "@chakra-ui/react"

function Card({ movie }) {
  return (
    <Box p={4} display={{ md: "flex" }} maxWidth="32rem" borderWidth={1} margin={2}>
      <Stack
        w="full"
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
        mr={{ md: 6 }}
      >
        <HStack>
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="lg"
            letterSpacing="wide"
            color="black.200"
          >
            {movie.title}
          </Text>
          <Spacer />
          <Text color="black.200">{movie.rating}/5</Text>
        </HStack>
        <Text my={2} color="black.400">
          {movie.description}
        </Text>
      </Stack>
    </Box>
  )
}

export default Card
