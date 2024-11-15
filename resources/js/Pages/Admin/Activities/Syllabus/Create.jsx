import { Box, Input, InputGroup, InputRightElement, Select, Text, Toast, Tooltip, useToast } from '@chakra-ui/react'
import React from 'react'
import InputForm from '../../Components/InputForm'
import ResponsiveText from '@/Components/ResponsiveText'
import { LinkIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'


function Create({data ,setIsVisible}) {
  const [file ,setFile]= useState(null)
  const [name ,setName]= useState(file!=null?file.name:'')
  const [faculty_id ,setFaculty_id]= useState('')

  const toast = useToast()

 const onSubmit = (e)=>{
  e.preventDefault()
  if(name=="" || file==null || faculty_id==""){
    toast({
      title: 'Error',
      description: 'Please fill all fields',
      status: 'error',
      duration: 1000,
      isClosable: true,
    })
    return
  }
  const formData = new FormData
  formData.append('name', name)
  formData.append('file', file)
  formData.append('faculty_id', faculty_id)

  Inertia.post(route('syllabus.store'),formData,{
    headers:{
      'Content-Type': 'multipart/form-data',
    }
  })
 } 
  return (
    <>
      <Box className='w-full h-screen fixed inset-0 z-20 backdrop-blur-sm'>
        <Box className='flex justify-center  mt-12'>
          <InputForm setIsVisible={setIsVisible} buttonValue={'Add Syllabus'} className={'p-2'} HandleSubmit={onSubmit}>
           <Text className='text-center font-lg font-extrabold'>
           Add New Syllabus
           </Text>
            <Box>
              <Box className='grid grid-cols-2 mt-4'>
                <ResponsiveText className={'text-center'}>Select Faculty</ResponsiveText>
                <Select value={faculty_id} onChange={(e)=>{
                  setFaculty_id(e.target.value)
                }}>
                  <option value="">--Select Faculty--</option>
                  {
                    data.map((item ,index)=>{
                      return(
                        <option key={index} value={item.id}>{item.name}</option>
                      )
                    })
                  }
                </Select>
              </Box>
              <Box className='grid grid-cols-2 mt-4'>
                <ResponsiveText className={'text-center'}>Enter Syllabus</ResponsiveText>
                <InputGroup>
                  <Input onClick={(e)=>{
                    if(name!=''){
                      e.target.select()
                    }
                  }} type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
                  <Tooltip hasArrow label={file!=null?'Change File':'Add File'}>
                    <InputRightElement  as='label' htmlFor='inputFileNote' className='cursor-pointer' children={<LinkIcon color={file!=null?'green':''}/>}/>
                    </Tooltip>
                  <Input type='file'display={'none'} onChange={(e)=>{
                    setFile(e.target.files[0])
                    setName(e.target.files[0].name)
                  }} accept='.pdf ' id='inputFileNote'/>
                </InputGroup>
              </Box>
            </Box>
          </InputForm>
        </Box>
      </Box>
    </>
  )
}

export default Create