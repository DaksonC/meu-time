import { Box, Input, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={'column'}
      bg={'gray.900'}
    >
      <Text color={'white'} fontSize={'4xl'} fontWeight={'bold'}>
        Meu Time
      </Text>
      <Input
        htmlSize={4}
        width={'30rem'}
        placeholder="País"
        _placeholder={{ color: 'gray.700' }}
        color={'gray.100'}
        mt={6}
      />
      <Input
        htmlSize={4}
        width={'30rem'}
        placeholder="Temporada"
        _placeholder={{ color: 'gray.700' }}
        color={'gray.100'}
        mt={4}
      />
      <Input
        htmlSize={4}
        width={'30rem'}
        placeholder="Liga"
        _placeholder={{ color: 'gray.700' }}
        color={'gray.100'}
        mt={4}
      />
      <Input
        htmlSize={4}
        width={'30rem'}
        placeholder="Time"
        _placeholder={{ color: 'gray.700' }}
        color={'gray.100'}
        mt={4}
      />
    </Box>
  )
}
