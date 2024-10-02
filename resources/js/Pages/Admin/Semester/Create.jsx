import React, { useEffect, useState } from 'react'
import InputForm from '../Components/InputForm'
import { Box, Text,Select, Alert, useToast } from '@chakra-ui/react'
import { Inertia } from '@inertiajs/inertia'
import MultipleInput from '../Components/MultipleInput'
import ResponsiveText from '@/Components/ResponsiveText'

function Create({data ,setIsVisible}) {   
    const [semester,setSemester]=useState('')
    const [faculty ,setFaculty] = useState('')
    const [Names, setName] = useState([]);

    const toast = useToast()

    const HandleSubmit = (e)=>{
        e.preventDefault();
       if(faculty!=''&& Names.length>0){
        const data = {
            name:Names,
            faculty_id:faculty
        }
        console.log(data)
       Inertia.post(route('semester.store'),data)
       .catch((err)=>{
        toast({
            title: 'Error',
            description: 'Something went wrong',
            status: 'error',
            duration: 900,
        })
       })
        setFaculty('')
        setName([])
       }
       else{
        toast({
            title: 'Completely Filled? Recheck!!',
            status: 'error',
          duration: 900,
          isClosable: true,

        })
       }
    }
    const SetValue = (e)=>{
        setFaculty(e.target.value);
    }
  return (
    <Box className='fixed inset-0 w-full bottom-0 top-0 z-10 backdrop-blur-sm'>
        <Box className='flex justify-center mt-12'>
        <InputForm setIsVisible={setIsVisible} HandleSubmit={HandleSubmit} buttonValue={'Add Semester'}>
        <Box>
            <Text className='p-4' align={'center'} fontSize='xl' fontWeight='bold'>Add New Semester</Text>
            <Box className='flex flex-col gap-3'>
            <Box className='grid grid-cols-2 ' fontSize={['.7rem','.9rem','1.1rem','1.2rem']}>
        <ResponsiveText className='text-center'>Select Faculty</ResponsiveText>
        <Select value={faculty} onChange={SetValue}
        required
        >
            <option>--Select Faculty--</option>
            {
                data.map((item,index)=>{
                    return (
                        <option key={index} value={item.id}>{item.name}</option>
                    )
                })
            }
        </Select>
    </Box>
                <MultipleInput Name={'Semester'} Names={Names} setName={setName}/>
                {/* <InputField  Name={'Semester'} Value={semester} setValue={SemesterSetter}/> */}
            </Box>
        </Box>
    </InputForm>
        </Box>
    </Box>
  )
}

export default Create