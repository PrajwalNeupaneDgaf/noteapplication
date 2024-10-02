import { Box, Button } from '@chakra-ui/react'
import React from 'react'

function SemiNav({ setisVisible}) {
  return (
    <Box className='p-4 bg-gray-50'>
        <Button colorScheme='green'
        onClick={()=>{
            setisVisible(true)
        }}>
            Add New
        </Button>
    </Box>
  )
}

export default SemiNav