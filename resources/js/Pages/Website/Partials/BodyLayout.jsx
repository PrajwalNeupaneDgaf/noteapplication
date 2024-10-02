import { Box } from '@chakra-ui/react'
import React from 'react'

function BodyLayout({children}) {
  return (
    <Box pl={[0,0,14,14]} pr={[0,0,14,14]} className='pt-8 pb-8'>
        {children}
    </Box>
  )
}

export default BodyLayout