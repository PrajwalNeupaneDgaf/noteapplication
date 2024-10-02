import React, { useState } from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Box, Collapse } from '@chakra-ui/react'
import Create from './Create'
import Show from './Show'

function Index({auth,subjectData}) {
  const [isVisible,setIsVisible]= useState(false);
  return (
    <Authenticated user={auth.user}>
        <Box display={isVisible?'block':'none'} >
            <Create setIsVisible={setIsVisible} data={subjectData.faculty} semester={subjectData.semester}/>
        </Box>
        <Box>
          <Show data={subjectData.data} isVisible={isVisible} setIsVisible={setIsVisible}/>
        </Box>
    </Authenticated>
  )
}

export default Index