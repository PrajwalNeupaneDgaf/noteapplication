import { Box } from '@chakra-ui/react'
import React from 'react'
import Aboutus from './Aboutus'
import Contactus from './Contactus'

function Footer() {
  return (
    <Box  className='p-8 bg-gray-700 text-white gap-3 grid '
            gridTemplateColumns={['1fr','1fr','1fr 1fr','1fr 1fr']}
    >
        <Box>
            <Aboutus/>
        </Box>
        <Box className=''>
            <Box>
                <Contactus/>
            </Box>
        </Box>
    </Box>
  )
}

export default Footer