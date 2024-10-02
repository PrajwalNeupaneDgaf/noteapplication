import { Head, router } from '@inertiajs/react'
import React from 'react'
import BodyLayout from '../Partials/BodyLayout'
import { Box, Button, Text } from '@chakra-ui/react'
import LayoutFrontend from '../LayoutFrontend'
import Toolpad from '../Partials/Toolpad'

function NotesQuestionPage({faculties ,faculty,semester,datas,short}) {
  return (
    <>
    <Head title='Notes'/>
    <LayoutFrontend faculties={faculties}>
      <Toolpad dataArray={[
        {
          name:'Home',
          link:'/'
        },
        {
          name:faculty,
          link:`/faculty=${short}`
        },
        {
          name:semester,
        }
      ]} />
        <BodyLayout>
           
            <Box className='flex justify-center items-center flex-col gap-4 p-4 bg-slate-200'>
              <Box className='w-full'>
                <Text bg={'#254ABE'} fontSize={['xs','sm','md','lg']} className='rounded-none font-semibold text-center mb-2 w-full text-white p-2' >{faculty} {semester} Notes</Text>
                <Box>
                  {
                    datas?.map((item,index)=>{
                      return(
                        <Box key={index} className='grid gap-3' gridTemplateColumns={'1fr 2fr'}>
                          <Box textAlign={'center'} fontSize={['xs','sm','sm','md']} className='font-semibold' >
                            {item.subject}
                          </Box>
                          <Box className='flex flex-col gap-3 w-full '>
                            { item.notes.length >0?
                              item?.notes?.map((itm,idx)=>
                              <Box key={idx} className='flex justify-center flex-col gap-4 items-center w-full'>
                                <Button w={'80%'} onClick={()=>{
                                  router.visit(`/faculty=${short}/semester=${semester}/subject=${item.subject}/${itm.id}`)
                                }} color={'white'} fontFamily={'monospace'} bg={'blue.600'} rounded={'none'} _hover={{bg:'blue.700'}} fontSize={['xs','sm','sm','sm']} >
                                  {
                                    itm.name
                                  }
                                </Button>
                              </Box>):''
                            }
                          </Box>
                          
                        </Box>
                      )
                    })
                  }
                </Box>
              </Box>
              <Box className='w-full'>
              <Text  bg={'#254ABE'} fontSize={['xs','sm','md','lg']} className='rounded-none font-semibold text-center mb-2 w-full text-white p-2' >{faculty} {semester} Questions</Text>
                <Box>
                  {
                    datas?.map((item,index)=>{
                      return(
                        <Box display={item.questions.length >0?'grid':'none'} key={index} className='grid gap-3' gridTemplateColumns={'1fr 2fr'}>
                          <Box textAlign={'center'} fontSize={['xs','sm','sm','md']} className='font-semibold' >
                            {item.subject}
                          </Box>
                          <Box>
                            { item.questions.length >0?
                              item?.questions?.map((itm,idx)=>
                              <Box key={idx} className='flex justify-center flex-col gap-4 items-center'>
                                <Button color={'white'} fontFamily={'monospace'} bg={'blue.600'} rounded={'none'} _hover={{bg:'blue.700'}} fontSize={['xs','sm','sm','md']} >
                                  {
                                    itm.year
                                  }
                                </Button>
                              </Box>):'No Question'
                            }
                          </Box>
                          
                        </Box>
                      )
                    })
                  }
                </Box>
              </Box>
            </Box>
        </BodyLayout>
    </LayoutFrontend>
    </>
  )
}

export default NotesQuestionPage