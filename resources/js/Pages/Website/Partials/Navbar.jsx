import { Box } from '@chakra-ui/react'
import { Inertia } from '@inertiajs/inertia'
import React from 'react'

function Navbar({faculties}) {
  return (
   <Box as='nav' className='flex gap-4 ' flexDir={['column','column','row','row']}>
        {
            faculties?.map((item,index)=>{
                return(
                    <Box 
                    _hover={{
                        borderBottom:"2px solid gray"
                    }}
                    key={index} 
                    onClick={()=>{
                        Inertia.get(`/faculty=${item.short}`)
                    }}
                    className='p-3 font-semibold text-sm cursor-pointer'
                    > 
                        {item.name}
                    </Box>
                )
            })
        }
                <Box 
                    _hover={{
                        borderBottom:"2px solid gray"
                    }}
                    onClick={()=>{
                        Inertia.get(`/check-result`)
                    }}
                    className='p-3 font-semibold text-sm cursor-pointer'
                    > 
                        Check Result
                    </Box>
   </Box>
  )
}

export default Navbar