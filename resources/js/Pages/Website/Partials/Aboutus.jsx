import { Box, Text } from '@chakra-ui/react'
import React from 'react'

function Aboutus() {
  return (
    <Box>
        <Box className='text-2xl font-extrabold font-serif'>
            <h1 className='p-2 text-center'>About Us</h1>
        </Box>
        <Box>
            <Text className='p-2 mt-4'>
                We are a team of passionate individuals who are dedicated to creating innovative solutions that make a positive impact.
            </Text>
        </Box>
    </Box>
  )
}

export default Aboutus