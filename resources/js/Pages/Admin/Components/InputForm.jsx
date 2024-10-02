import { Box, Button, Text } from '@chakra-ui/react'
import { Inertia } from '@inertiajs/inertia'
import React from 'react'

function InputForm({children,HandleSubmit,buttonValue ,setIsVisible ,className}) {
  return (
    <Box as='form' bg={'#f5fafb'} onSubmit={HandleSubmit} className={'flex justify-center align-middle mt-4 w-fit '+ className}>
      
      <Box boxShadow={'0 0 3px gray'} className='rounded flex flex-col gap-3'>
      <Box>
      <Box className='flex justify-end'>
        <Button
        borderRadius={'none'} bg={'transparent'} _hover={{
          bg:'red.400',
          color:'white',
        }} className='font-thin'
        onClick={()=>{
          setIsVisible?
          setIsVisible(false):
          window.history.back();
        }}
        >X</Button>
      </Box>
       <Box className='p-4 pr-16'>
       {children}
       </Box>
       </Box>

        <Box className='flex justify-center align'>
            <Button type='submit' bg={'#bddbd5'} className='mb-2' >
                {buttonValue}
                </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default InputForm