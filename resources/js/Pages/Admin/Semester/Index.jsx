import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Box, Collapse, ScaleFade } from '@chakra-ui/react'
import React, { useState } from 'react'
import Create from './Create'
import Show from './Show'

function Index({auth,data,facultyData,semesterData}) {
    const [isVisible,setIsVisible]=useState(false)
  return (
    <Authenticated user={auth.user}>
        <Box display={isVisible?"block":'none'}>
        <Create setIsVisible={setIsVisible} data={facultyData}/>
        </Box>
        <Show isVisible={isVisible} setIsVisible={setIsVisible} data={semesterData}/>
    </Authenticated>
  )
}

export default Index