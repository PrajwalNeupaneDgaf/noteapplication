import React from 'react'
import { useContext } from 'react'
import NQSContextCreate from '../NQSContextCreate'
import { Box, Button } from '@chakra-ui/react'

function SubmitMe() {
 const {handleSubmit}= useContext(NQSContextCreate)
  return (
  <Box className='p-8 m-2 flex justify-center align-middle'>
      <Button onClick={handleSubmit}>
    Submit
  </Button>
  </Box>
  )
}

export default SubmitMe