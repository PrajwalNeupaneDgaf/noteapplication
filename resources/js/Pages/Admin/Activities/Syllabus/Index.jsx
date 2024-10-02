import React from 'react'
import Create from './Create'
import { Box } from '@chakra-ui/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import Show from './Show'
import { useState } from 'react'


function Index({auth , faculties ,syllabus}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Authenticated user={auth.user}>
         {
          isVisible?<Create setIsVisible={setIsVisible} data={faculties}/>:""
         }
         <Show setIsVisible={setIsVisible} data={syllabus}/>
    </Authenticated>
)
}

export default Index