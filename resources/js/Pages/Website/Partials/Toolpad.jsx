import { Box } from '@chakra-ui/react'
import { Inertia } from '@inertiajs/inertia'
import React from 'react'

function Toolpad({dataArray}) {
  return (
    <Box className='flex p-5 justify-between bg-gray-100'>
       <Box className='flex'>
       {
            dataArray?.map((item,index)=>{
                return(
                    <Box fontSize={['8px','xs','sm','md']} key={index} onClick={()=>{
                        if(item.link){
                            Inertia.visit(item.link)
                        }
                    }}
                    color={item.link?'#254ABE':'black'}
                    fontWeight={item.link?'bold':'normal'}
                    cursor={item.link?'pointer':''}
                    >
                        {item.name}
                        {item.link?'/':''}
                    </Box>
                )
            })
        }
       </Box>
      
    </Box>
  )
}

export default Toolpad